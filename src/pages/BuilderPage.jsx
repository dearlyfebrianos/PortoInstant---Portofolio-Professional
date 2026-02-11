import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import {
  Plus,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Camera,
  X as XIcon,
} from "lucide-react";
import LivePreview from "../components/preview/LivePreview";
import DraftManager from "../components/ui/DraftManager";
import { templates } from "./TemplatesPage";

const SectionHeader = ({ icon: Icon, title, isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center justify-between p-4 glass-card rounded-xl mb-2 hover:border-gold-400/20 transition-all"
  >
    <div className="flex items-center gap-3">
      <Icon size={16} className="text-gold-400" />
      <span className="font-semibold text-white/80 text-sm">{title}</span>
    </div>
    {isOpen ? (
      <ChevronUp size={16} className="text-white/30" />
    ) : (
      <ChevronDown size={16} className="text-white/30" />
    )}
  </button>
);

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const PhotoUpload = ({ photo, name, onPhotoChange, onPhotoRemove }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => onPhotoChange(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div>
      <label className="label-field flex items-center gap-2">
        <Camera size={13} className="text-gold-400" />
        Foto Profil
        <span className="text-white/25 font-normal">(opsional)</span>
      </label>
      <div className="flex items-center gap-4 mt-2">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 bg-white/5 flex items-center justify-center">
            {photo ? (
              <img
                src={photo}
                alt="Foto profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-white/40 select-none">
                {getInitials(name)}
              </span>
            )}
          </div>
          {photo && (
            <button
              onClick={onPhotoRemove}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center transition-colors shadow-lg z-10"
              title="Hapus foto"
            >
              <XIcon size={11} className="text-white" />
            </button>
          )}
        </div>
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-ghost w-full text-xs py-2.5 flex items-center justify-center gap-2 border-dashed"
          >
            <Camera size={13} />
            {photo ? "Ganti Foto" : "Upload Foto"}
          </button>
          <p className="text-[10px] text-white/20 mt-1.5 text-center">
            JPG, PNG, WebP · Maks 5MB
          </p>
          {!photo && (
            <p className="text-[10px] text-white/15 text-center mt-0.5">
              Jika kosong, akan pakai inisial nama
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const BuilderPage = () => {
  const { data, updateField, addArrayItem, removeArrayItem, updateArrayField } =
    usePortfolio();
  const [openSections, setOpenSections] = useState({
    profile: true,
    skills: false,
    projects: false,
    experience: false,
    education: false,
  });
  const [newSkill, setNewSkill] = useState("");
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  const addSkill = () => {
    if (newSkill.trim()) {
      addArrayItem("skills", newSkill.trim());
      setNewSkill("");
    }
  };

  const currentTemplate = templates.find((t) => t.id === data.selectedTemplate);
  const templateSupportsPhoto = currentTemplate?.hasPhoto ?? false;

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold gold-text mb-1">
              Builder
            </h1>
            <p className="text-white/40 text-sm">
              Isi form di kiri, lihat hasilnya di kanan secara real-time
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <DraftManager />
            <button
              className="lg:hidden btn-ghost text-sm py-2 px-4 flex items-center gap-2"
              onClick={() => setShowPreviewMobile(!showPreviewMobile)}
            >
              <Eye size={15} />
              {showPreviewMobile ? "Form" : "Preview"}
            </button>
            <Link to="/preview">
              <button className="btn-primary text-sm py-2 px-5 flex items-center gap-2">
                <Eye size={15} />
                Full Preview
              </button>
            </Link>
          </div>
        </div>

        {currentTemplate && (
          <div className="mb-4 flex items-center gap-3">
            <div className="flex items-center gap-2 tag-chip text-xs py-1.5 px-3">
              <span className="text-gold-400">●</span>
              Template aktif:{" "}
              <strong className="text-white/80">{currentTemplate.name}</strong>
            </div>
            {templateSupportsPhoto && (
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                📷 Support Foto
              </span>
            )}
            <Link
              to="/templates"
              className="text-xs text-white/30 hover:text-gold-400 transition-colors underline underline-offset-2"
            >
              Ganti template
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-260px)]">
          <div
            className={`overflow-y-auto space-y-2 pr-1 ${showPreviewMobile ? "hidden lg:block" : "block"}`}
          >
            <SectionHeader
              icon={User}
              title="Profil & Kontak"
              isOpen={openSections.profile}
              onToggle={() => toggleSection("profile")}
            />
            {openSections.profile && (
              <div className="glass rounded-xl p-5 space-y-4 mb-4">
                {templateSupportsPhoto && (
                  <PhotoUpload
                    photo={data.photo || ""}
                    name={data.name || ""}
                    onPhotoChange={(b64) => updateField("photo", b64)}
                    onPhotoRemove={() => updateField("photo", "")}
                  />
                )}
                {[
                  {
                    key: "name",
                    label: "Nama Lengkap",
                    placeholder: "Contoh: Dearly Febriano Irwansyah",
                  },
                  {
                    key: "title",
                    label: "Jabatan / Role",
                    placeholder: "Contoh: FullStack Developer",
                  },
                  {
                    key: "location",
                    label: "Lokasi",
                    placeholder: "Contoh: Jakarta, Indonesia",
                  },
                  {
                    key: "email",
                    label: "Email",
                    placeholder: "contoh@gmail.com",
                  },
                  {
                    key: "phone",
                    label: "Nomor HP",
                    placeholder: "+62 812 xxxx xxxx",
                  },
                  {
                    key: "website",
                    label: "Website / Portfolio URL",
                    placeholder: "https://dearly.com",
                  },
                  {
                    key: "linkedin",
                    label: "LinkedIn",
                    placeholder: "linkedin.com/in/dearly",
                  },
                  {
                    key: "github",
                    label: "GitHub",
                    placeholder: "github.com/dearlyfebrianos",
                  },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="label-field">{label}</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder={placeholder}
                      value={data[key] || ""}
                      onChange={(e) => updateField(key, e.target.value)}
                    />
                  </div>
                ))}
                <div>
                  <label className="label-field">Bio / Tentang Saya</label>
                  <textarea
                    className="input-field resize-none"
                    rows={4}
                    placeholder="Ceritakan sedikit tentang dirimu..."
                    value={data.bio || ""}
                    onChange={(e) => updateField("bio", e.target.value)}
                  />
                </div>
              </div>
            )}

            <SectionHeader
              icon={Code}
              title="Skills & Keahlian"
              isOpen={openSections.skills}
              onToggle={() => toggleSection("skills")}
            />
            {openSections.skills && (
              <div className="glass rounded-xl p-5 mb-4">
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Tambah skill (contoh: React, Figma, Python)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="btn-primary py-2 px-4 flex-shrink-0"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <div key={i} className="tag-chip flex items-center gap-2">
                      {skill}
                      <button
                        onClick={() => removeArrayItem("skills", i)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  ))}
                  {data.skills.length === 0 && (
                    <p className="text-white/25 text-sm">
                      Belum ada skill. Tambahkan di atas.
                    </p>
                  )}
                </div>
              </div>
            )}

            <SectionHeader
              icon={FolderOpen}
              title="Proyek / Portofolio"
              isOpen={openSections.projects}
              onToggle={() => toggleSection("projects")}
            />
            {openSections.projects && (
              <div className="glass rounded-xl p-5 mb-4 space-y-4">
                {data.projects.map((project, i) => (
                  <div key={i} className="glass-card rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-gold-400/70 font-mono">
                        Proyek #{i + 1}
                      </span>
                      <button
                        onClick={() => removeArrayItem("projects", i)}
                        className="text-white/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {[
                      {
                        key: "name",
                        label: "Nama Proyek",
                        placeholder: "Contoh: E-commerce App",
                      },
                      {
                        key: "description",
                        label: "Deskripsi",
                        placeholder: "Jelaskan proyeknya...",
                      },
                      {
                        key: "tech",
                        label: "Teknologi",
                        placeholder: "React, Node.js, MongoDB",
                      },
                      {
                        key: "url",
                        label: "Link Proyek",
                        placeholder: "https://github.com/...",
                      },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="label-field">{label}</label>
                        {key === "description" ? (
                          <textarea
                            className="input-field resize-none"
                            rows={2}
                            placeholder={placeholder}
                            value={project[key] || ""}
                            onChange={(e) =>
                              updateArrayField("projects", i, {
                                ...project,
                                [key]: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            className="input-field"
                            placeholder={placeholder}
                            value={project[key] || ""}
                            onChange={(e) =>
                              updateArrayField("projects", i, {
                                ...project,
                                [key]: e.target.value,
                              })
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                <button
                  onClick={() =>
                    addArrayItem("projects", {
                      name: "",
                      description: "",
                      tech: "",
                      url: "",
                    })
                  }
                  className="btn-ghost w-full text-sm flex items-center justify-center gap-2"
                >
                  <Plus size={15} />
                  Tambah Proyek
                </button>
              </div>
            )}

            <SectionHeader
              icon={Briefcase}
              title="Pengalaman Kerja"
              isOpen={openSections.experience}
              onToggle={() => toggleSection("experience")}
            />
            {openSections.experience && (
              <div className="glass rounded-xl p-5 mb-4 space-y-4">
                {data.experience.map((exp, i) => (
                  <div key={i} className="glass-card rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-gold-400/70 font-mono">
                        Pengalaman #{i + 1}
                      </span>
                      <button
                        onClick={() => removeArrayItem("experience", i)}
                        className="text-white/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {[
                      {
                        key: "company",
                        label: "Perusahaan",
                        placeholder: "PT. Contoh Jaya",
                      },
                      {
                        key: "role",
                        label: "Posisi / Role",
                        placeholder: "Frontend Developer",
                      },
                      {
                        key: "period",
                        label: "Periode",
                        placeholder: "Jan 2023 - Des 2023",
                      },
                      {
                        key: "description",
                        label: "Deskripsi",
                        placeholder: "Tanggung jawab dan pencapaian...",
                      },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="label-field">{label}</label>
                        {key === "description" ? (
                          <textarea
                            className="input-field resize-none"
                            rows={2}
                            placeholder={placeholder}
                            value={exp[key] || ""}
                            onChange={(e) =>
                              updateArrayField("experience", i, {
                                ...exp,
                                [key]: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            className="input-field"
                            placeholder={placeholder}
                            value={exp[key] || ""}
                            onChange={(e) =>
                              updateArrayField("experience", i, {
                                ...exp,
                                [key]: e.target.value,
                              })
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                <button
                  onClick={() =>
                    addArrayItem("experience", {
                      company: "",
                      role: "",
                      period: "",
                      description: "",
                    })
                  }
                  className="btn-ghost w-full text-sm flex items-center justify-center gap-2"
                >
                  <Plus size={15} />
                  Tambah Pengalaman
                </button>
              </div>
            )}

            <SectionHeader
              icon={GraduationCap}
              title="Pendidikan"
              isOpen={openSections.education}
              onToggle={() => toggleSection("education")}
            />
            {openSections.education && (
              <div className="glass rounded-xl p-5 mb-4 space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i} className="glass-card rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-gold-400/70 font-mono">
                        Pendidikan #{i + 1}
                      </span>
                      <button
                        onClick={() => removeArrayItem("education", i)}
                        className="text-white/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {[
                      {
                        key: "school",
                        label: "Institusi / Universitas",
                        placeholder: "Universitas Indonesia",
                      },
                      {
                        key: "degree",
                        label: "Gelar / Jurusan",
                        placeholder: "S1 Teknik Informatika",
                      },
                      {
                        key: "period",
                        label: "Periode",
                        placeholder: "2019 - 2023",
                      },
                      {
                        key: "gpa",
                        label: "IPK (opsional)",
                        placeholder: "3.75 / 4.00",
                      },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="label-field">{label}</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder={placeholder}
                          value={edu[key] || ""}
                          onChange={(e) =>
                            updateArrayField("education", i, {
                              ...edu,
                              [key]: e.target.value,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
                <button
                  onClick={() =>
                    addArrayItem("education", {
                      school: "",
                      degree: "",
                      period: "",
                      gpa: "",
                    })
                  }
                  className="btn-ghost w-full text-sm flex items-center justify-center gap-2"
                >
                  <Plus size={15} />
                  Tambah Pendidikan
                </button>
              </div>
            )}
          </div>

          <div
            className={`${showPreviewMobile ? "block" : "hidden lg:block"} h-full`}
          >
            <div className="glass rounded-2xl h-full overflow-hidden border border-white/[0.06]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-white/30 font-mono">
                  live-preview · {currentTemplate?.name || "minimal"}
                </span>
              </div>
              <div className="h-[calc(100%-44px)] overflow-y-auto">
                <LivePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;