import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from "lucide-react";

const MinimalPreview = ({ data }) => (
  <div className="bg-white text-gray-900 min-h-full p-8 font-sans text-sm">
    <div className="border-b-2 border-gray-900 pb-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">
        {data.name || "Nama Lengkap"}
      </h1>
      <p className="text-base text-gray-500 mb-4">
        {data.title || "Jabatan / Role"}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
        {data.email && <span className="flex items-center gap-1"><Mail size={11} />{data.email}</span>}
        {data.phone && <span className="flex items-center gap-1"><Phone size={11} />{data.phone}</span>}
        {data.location && <span className="flex items-center gap-1"><MapPin size={11} />{data.location}</span>}
        {data.website && <span className="flex items-center gap-1"><Globe size={11} />{data.website}</span>}
        {data.linkedin && <span className="flex items-center gap-1"><Linkedin size={11} />{data.linkedin}</span>}
        {data.github && <span className="flex items-center gap-1"><Github size={11} />{data.github}</span>}
      </div>
    </div>

    {data.bio && (
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Tentang Saya</h2>
        <p className="text-gray-700 leading-relaxed text-xs">{data.bio}</p>
      </div>
    )}

    {data.skills.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-1.5">
          {data.skills.map((s, i) => (
            <span key={i} className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium border border-gray-200">
              {s}
            </span>
          ))}
        </div>
      </div>
    )}

    {data.experience.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Pengalaman</h2>
        <div className="space-y-3">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800 text-xs">{exp.role || "Posisi"}</p>
                  <p className="text-gray-500 text-xs">{exp.company || "Perusahaan"}</p>
                </div>
                <p className="text-gray-400 text-xs">{exp.period}</p>
              </div>
              {exp.description && <p className="text-gray-600 text-xs mt-1 leading-relaxed">{exp.description}</p>}
            </div>
          ))}
        </div>
      </div>
    )}

    {data.projects.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Proyek</h2>
        <div className="space-y-3">
          {data.projects.map((proj, i) => (
            <div key={i}>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800 text-xs">{proj.name || "Nama Proyek"}</p>
                {proj.url && <ExternalLink size={10} className="text-gray-400" />}
              </div>
              {proj.description && <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{proj.description}</p>}
              {proj.tech && <p className="text-gray-400 text-xs mt-0.5">Tech: {proj.tech}</p>}
            </div>
          ))}
        </div>
      </div>
    )}

    {data.education.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Pendidikan</h2>
        <div className="space-y-2">
          {data.education.map((edu, i) => (
            <div key={i} className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800 text-xs">{edu.degree || "Gelar"}</p>
                <p className="text-gray-500 text-xs">{edu.school || "Institusi"}{edu.gpa ? ` · IPK ${edu.gpa}` : ""}</p>
              </div>
              <p className="text-gray-400 text-xs">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const ModernPreview = ({ data }) => (
  <div className="bg-gray-950 text-gray-100 min-h-full text-sm">
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-8">
      <h1 className="text-3xl font-bold text-white mb-1">{data.name || "Nama Lengkap"}</h1>
      <p className="text-blue-200 text-base mb-4">{data.title || "Jabatan / Role"}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-blue-200/80">
        {data.email && <span className="flex items-center gap-1"><Mail size={11} />{data.email}</span>}
        {data.phone && <span className="flex items-center gap-1"><Phone size={11} />{data.phone}</span>}
        {data.location && <span className="flex items-center gap-1"><MapPin size={11} />{data.location}</span>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.bio && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">About</h2>
          <p className="text-gray-300 text-xs leading-relaxed">{data.bio}</p>
        </div>
      )}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((s, i) => (
              <span key={i} className="px-2.5 py-0.5 bg-blue-900/50 text-blue-200 rounded-full text-xs border border-blue-700/50">{s}</span>
            ))}
          </div>
        </div>
      )}
      {data.projects.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Projects</h2>
          <div className="space-y-2">
            {data.projects.map((proj, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="font-semibold text-xs text-white">{proj.name || "Nama Proyek"}</p>
                {proj.description && <p className="text-gray-400 text-xs mt-1">{proj.description}</p>}
                {proj.tech && <p className="text-blue-400/70 text-xs mt-1">{proj.tech}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const CreativePreview = ({ data }) => (
  <div className="min-h-full text-sm" style={{ background: "linear-gradient(135deg, #fdf2f8 0%, #f0f9ff 100%)" }}>
    <div className="p-8 text-center border-b border-pink-100">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
        {(data.name || "?")[0]}
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{data.name || "Nama Lengkap"}</h1>
      <p className="text-purple-600 font-medium text-sm mb-3">{data.title || "Jabatan / Role"}</p>
      <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500">
        {data.email && <span className="flex items-center gap-1"><Mail size={10} />{data.email}</span>}
        {data.location && <span className="flex items-center gap-1"><MapPin size={10} />{data.location}</span>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.bio && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2">Tentang</h2>
          <p className="text-gray-600 text-xs leading-relaxed">{data.bio}</p>
        </div>
      )}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((s, i) => (
              <span key={i} className="px-2.5 py-0.5 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full text-xs font-medium">{s}</span>
            ))}
          </div>
        </div>
      )}
      {data.projects.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2">Proyek</h2>
          <div className="space-y-2">
            {data.projects.map((proj, i) => (
              <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-pink-50">
                <p className="font-semibold text-gray-800 text-xs">{proj.name || "Nama Proyek"}</p>
                {proj.description && <p className="text-gray-500 text-xs mt-1">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const LivePreview = () => {
  const { data } = usePortfolio();

  const hasAnyData = data.name || data.title || data.bio || data.skills.length > 0;

  if (!hasAnyData) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/20 flex items-center justify-center mb-4">
          <Globe size={24} className="text-gold-400/50" />
        </div>
        <p className="text-white/30 text-sm font-medium mb-1">Preview akan muncul di sini</p>
        <p className="text-white/20 text-xs">Mulai isi form di sebelah kiri</p>
      </div>
    );
  }

  if (data.selectedTemplate === "modern") return <ModernPreview data={data} />;
  if (data.selectedTemplate === "creative") return <CreativePreview data={data} />;
  return <MinimalPreview data={data} />;
};

export default LivePreview;