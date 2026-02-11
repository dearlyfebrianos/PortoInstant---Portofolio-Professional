import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { Check, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

const templates = [
  {
    id: "minimal",
    name: "Minimalis",
    tag: "Klasik & Bersih",
    desc: "Desain hitam-putih yang bersih dan profesional. Cocok untuk posisi korporat, keuangan, dan hukum.",
    colors: ["#f8fafc", "#1e293b", "#64748b"],
    accent: "from-slate-500 to-slate-700",
    features: [
      "Hitam & putih elegan",
      "Tipografi serif klasik",
      "Layout ATS-friendly",
      "Clean & mudah dibaca",
    ],
    preview: (
      <div className="bg-white rounded-lg overflow-hidden text-gray-900 h-full p-4 text-[9px]">
        <div className="border-b-2 border-gray-900 pb-2 mb-2">
          <div className="h-4 w-28 bg-gray-900 rounded mb-1" />
          <div className="h-2.5 w-20 bg-gray-400 rounded mb-2" />
          <div className="flex gap-2">
            <div className="h-1.5 w-14 bg-gray-300 rounded" />
            <div className="h-1.5 w-14 bg-gray-300 rounded" />
          </div>
        </div>
        <div className="mb-2">
          <div className="h-1.5 w-10 bg-gray-400 rounded mb-1" />
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-gray-200 rounded" />
            <div className="h-1.5 w-4/5 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-3 w-8 bg-gray-100 border border-gray-200 rounded"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "modern",
    name: "Modern",
    tag: "Dark & Tech",
    desc: "Desain gelap bergaya tech modern dengan aksen biru. Ideal untuk developer, data scientist, dan engineer.",
    colors: ["#0f172a", "#1e40af", "#60a5fa"],
    accent: "from-blue-600 to-indigo-700",
    features: [
      "Dark mode elegan",
      "Aksen warna biru",
      "Card-based layout",
      "Cocok untuk tech roles",
    ],
    preview: (
      <div className="bg-gray-950 rounded-lg overflow-hidden h-full">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-3 mb-2">
          <div className="h-3.5 w-24 bg-white/80 rounded mb-1" />
          <div className="h-2 w-16 bg-blue-200/60 rounded mb-1.5" />
          <div className="flex gap-1.5">
            <div className="h-1.5 w-12 bg-blue-200/40 rounded" />
            <div className="h-1.5 w-12 bg-blue-200/40 rounded" />
          </div>
        </div>
        <div className="px-3 space-y-2">
          <div className="h-1.5 w-8 bg-blue-400/60 rounded" />
          <div className="flex flex-wrap gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-3 w-8 bg-blue-900/50 border border-blue-700/50 rounded-full"
              />
            ))}
          </div>
          <div className="bg-white/5 rounded-lg p-2 border border-white/10">
            <div className="h-1.5 w-16 bg-white/60 rounded mb-1" />
            <div className="h-1.5 w-full bg-white/20 rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "creative",
    name: "Kreatif",
    tag: "Colorful & Bold",
    desc: "Desain penuh warna dengan sentuhan kreatif. Sempurna untuk desainer, ilustrator, dan creative professional.",
    colors: ["#fdf2f8", "#ec4899", "#a855f7"],
    accent: "from-pink-500 to-purple-600",
    features: [
      "Gradient pink & ungu",
      "Avatar initial letter",
      "Card-style layout",
      "Cocok untuk creative roles",
    ],
    preview: (
      <div
        className="rounded-lg overflow-hidden h-full p-3"
        style={{ background: "linear-gradient(135deg, #fdf2f8, #f0f9ff)" }}
      >
        <div className="text-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 mx-auto mb-1" />
          <div className="h-2.5 w-20 bg-gray-800 rounded mx-auto mb-0.5" />
          <div className="h-1.5 w-14 bg-purple-500/60 rounded mx-auto" />
        </div>
        <div className="bg-white rounded-xl p-2 shadow-sm mb-1.5">
          <div className="h-1.5 w-8 bg-pink-400 rounded mb-1" />
          <div className="space-y-0.5">
            <div className="h-1 w-full bg-gray-200 rounded" />
            <div className="h-1 w-4/5 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-3 w-8 rounded-full"
              style={{
                background: "linear-gradient(to right, #fce7f3, #ede9fe)",
              }}
            />
          ))}
        </div>
      </div>
    ),
  },
];

const TemplatesPage = () => {
  const { data, updateField } = usePortfolio();
  const navigate = useNavigate();

  const handleSelect = (id) => {
    updateField("selectedTemplate", id);
    toast.success(
      `Template "${templates.find((t) => t.id === id).name}" dipilih!`,
    );
    navigate("/builder");
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="tag-chip inline-flex mb-6">Pilih Tampilanmu</div>
          <h1 className="section-title mb-4">Template Premium</h1>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Tiga desain yang dirancang khusus untuk membuat portofoliomu tampil
            memukau
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              className={`glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                data.selectedTemplate === tmpl.id
                  ? "border-gold-400/40 shadow-gold ring-1 ring-gold-400/30"
                  : ""
              }`}
            >
              <div className="relative h-52 p-4 bg-gradient-to-b from-white/[0.03] to-transparent">
                {tmpl.preview}
                {data.selectedTemplate === tmpl.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center shadow-gold">
                    <Check size={12} className="text-navy-950 font-bold" />
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-lg font-semibold text-white/90">
                    {tmpl.name}
                  </h3>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r ${tmpl.accent} text-white font-medium`}
                  >
                    {tmpl.tag}
                  </span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed mb-4">
                  {tmpl.desc}
                </p>

                <ul className="space-y-1.5 mb-6 flex-1">
                  {tmpl.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs text-white/50"
                    >
                      <div className="w-1 h-1 rounded-full bg-gold-400/60 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelect(tmpl.id)}
                  className={`w-full text-sm py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    data.selectedTemplate === tmpl.id
                      ? "btn-primary"
                      : "btn-ghost"
                  }`}
                >
                  {data.selectedTemplate === tmpl.id ? (
                    <>
                      <Check size={14} />
                      Sedang Digunakan
                    </>
                  ) : (
                    <>
                      Gunakan Template
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;