import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { Check, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

export const templates = [
  {
    id: "minimal",
    name: "Minimalis",
    tag: "Klasik & Bersih",
    hasPhoto: false,
    desc: "Desain hitam-putih yang bersih dan profesional. Cocok untuk posisi korporat, keuangan, dan hukum.",
    accent: "from-slate-500 to-slate-700",
    features: [
      "Hitam & putih elegan",
      "Tipografi serif klasik",
      "Layout ATS-friendly",
      "Clean & mudah dibaca",
    ],
    preview: (
      <div className="bg-white rounded-lg overflow-hidden text-gray-900 h-full p-4">
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
    hasPhoto: false,
    desc: "Desain gelap bergaya tech modern dengan aksen biru. Ideal untuk developer, data scientist, dan engineer.",
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
    hasPhoto: true,
    desc: "Desain penuh warna dengan sentuhan kreatif. Sempurna untuk desainer, ilustrator, dan creative professional.",
    accent: "from-pink-500 to-purple-600",
    features: [
      "Gradient pink & ungu",
      "Support foto profil",
      "Card-style layout",
      "Cocok untuk creative roles",
    ],
    preview: (
      <div
        className="rounded-lg overflow-hidden h-full p-3"
        style={{ background: "linear-gradient(135deg,#fdf2f8,#f0f9ff)" }}
      >
        <div className="text-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 mx-auto mb-1" />
          <div className="h-2.5 w-20 bg-gray-800 rounded mx-auto mb-0.5" />
          <div className="h-1.5 w-14 bg-purple-500/60 rounded mx-auto" />
        </div>
        <div className="bg-white rounded-xl p-2 shadow-sm mb-1.5">
          <div className="h-1.5 w-8 bg-pink-400 rounded mb-1" />
          <div className="h-1 w-full bg-gray-200 rounded" />
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-3 w-8 rounded-full"
              style={{
                background: "linear-gradient(to right,#fce7f3,#ede9fe)",
              }}
            />
          ))}
        </div>
      </div>
    ),
  },

  {
    id: "professional",
    name: "Profesional",
    tag: "Corporate & Formal",
    hasPhoto: true,
    desc: "Desain dua kolom elegan dengan foto profil. Ideal untuk posisi manajerial, konsultan, dan profesional senior.",
    accent: "from-blue-800 to-blue-600",
    features: [
      "Layout dua kolom",
      "Support foto profil",
      "Sidebar navy elegan",
      "Cocok untuk senior roles",
    ],
    preview: (
      <div className="rounded-lg overflow-hidden h-full flex">
        <div
          className="w-2/5 h-full p-2"
          style={{ background: "linear-gradient(180deg,#1a365d,#2a4a7f)" }}
        >
          <div className="w-9 h-9 rounded-full bg-blue-300/40 border-2 border-blue-200/30 mx-auto mb-2" />
          <div className="h-2 w-12 bg-white/70 rounded mx-auto mb-1" />
          <div className="h-1.5 w-10 bg-blue-200/50 rounded mx-auto mb-2" />
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-1.5 w-full bg-white/20 rounded" />
            ))}
          </div>
        </div>
        <div className="flex-1 bg-gray-50 p-2 space-y-2">
          <div>
            <div className="h-1.5 w-10 bg-blue-800/40 rounded mb-1" />
            <div className="h-1 w-full bg-gray-300 rounded" />
            <div className="h-1 w-4/5 bg-gray-300 rounded mt-0.5" />
          </div>
          <div className="h-3 w-full bg-gray-200 rounded" />
        </div>
      </div>
    ),
  },

  {
    id: "elegant",
    name: "Elegan",
    tag: "Gold & Luxury",
    hasPhoto: false,
    desc: "Desain mewah dengan aksen emas dan tipografi premium. Cocok untuk eksekutif, konsultan, dan brand personal premium.",
    accent: "from-yellow-600 to-amber-500",
    features: [
      "Aksen emas premium",
      "Dark luxury background",
      "Tipografi premium",
      "Cocok untuk eksekutif",
    ],
    preview: (
      <div
        className="rounded-lg overflow-hidden h-full p-3"
        style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)" }}
      >
        <div className="border-b border-yellow-600/40 pb-2 mb-2">
          <div
            className="h-3.5 w-24 rounded mb-1"
            style={{ background: "linear-gradient(to right,#d4af37,#f0c040)" }}
          />
          <div className="h-1.5 w-16 bg-yellow-200/30 rounded" />
        </div>
        <div className="mb-2">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-1 h-1 rounded-full bg-yellow-500" />
            <div className="h-1.5 w-8 bg-yellow-500/60 rounded" />
          </div>
          <div className="h-1 w-full bg-white/15 rounded" />
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-3 w-8 rounded border border-yellow-600/40"
              style={{ background: "rgba(212,175,55,0.1)" }}
            />
          ))}
        </div>
      </div>
    ),
  },

  {
    id: "neon",
    name: "Neon Cyber",
    tag: "Futuristic",
    hasPhoto: true,
    desc: "Desain futuristik neon hijau & cyan di atas hitam pekat. Untuk developer, gamer, dan tech enthusiast.",
    accent: "from-green-400 to-cyan-400",
    features: [
      "Neon green & cyan glow",
      "Support foto profil",
      "Cyber aesthetic",
      "Untuk tech & gaming",
    ],
    preview: (
      <div
        className="rounded-lg overflow-hidden h-full p-3"
        style={{ background: "#000", border: "1px solid rgba(0,255,136,0.3)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-9 h-9 rounded-full flex-shrink-0"
            style={{
              background: "rgba(0,255,136,0.15)",
              border: "2px solid #00ff88",
            }}
          />
          <div>
            <div
              className="h-2.5 w-16 rounded mb-1"
              style={{ background: "#00ff88" }}
            />
            <div
              className="h-1.5 w-12 rounded"
              style={{ background: "rgba(0,212,255,0.5)" }}
            />
          </div>
        </div>
        <div className="space-y-1 mb-2">
          <div
            className="h-1 w-full rounded"
            style={{ background: "rgba(0,255,136,0.12)" }}
          />
          <div
            className="h-1 w-4/5 rounded"
            style={{ background: "rgba(0,255,136,0.08)" }}
          />
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-3 w-9 rounded"
              style={{
                background: "rgba(0,255,136,0.1)",
                border: "1px solid rgba(0,255,136,0.35)",
              }}
            />
          ))}
        </div>
      </div>
    ),
  },

  {
    id: "sunset",
    name: "Sunset",
    tag: "Warm & Vibrant",
    hasPhoto: true,
    desc: "Desain hangat gradien sunset oranye-ungu. Cocok untuk marketer, content creator, dan HR professional.",
    accent: "from-orange-500 to-rose-500",
    features: [
      "Gradien sunset hangat",
      "Support foto profil",
      "Tipografi modern bold",
      "Untuk creative & marketing",
    ],
    preview: (
      <div
        className="rounded-lg overflow-hidden h-full"
        style={{ background: "#fff7ed" }}
      >
        <div
          className="p-3"
          style={{
            background: "linear-gradient(135deg,#ea580c,#dc2626,#9333ea)",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white/50" />
            <div>
              <div className="h-2.5 w-16 bg-white/90 rounded mb-1" />
              <div className="h-1.5 w-12 bg-white/50 rounded" />
            </div>
          </div>
        </div>
        <div className="p-2.5 space-y-1.5">
          <div className="h-1 w-full bg-orange-100 rounded" />
          <div className="h-1 w-4/5 bg-orange-100 rounded" />
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2.5 w-8 rounded-full bg-orange-100 border border-orange-200"
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },

  {
    id: "forest",
    name: "Forest",
    tag: "Natural & Calm",
    hasPhoto: false,
    desc: "Desain natural palet hijau organik yang menenangkan. Ideal untuk environmental, NGO, educator, dan wellness.",
    accent: "from-green-700 to-emerald-600",
    features: [
      "Palet hijau organik",
      "Tipografi humanis",
      "Layout clean",
      "Untuk NGO & educator",
    ],
    preview: (
      <div
        className="rounded-lg overflow-hidden h-full"
        style={{ background: "#f0fdf4" }}
      >
        <div
          className="p-3 mb-2"
          style={{ background: "linear-gradient(135deg,#166534,#15803d)" }}
        >
          <div className="h-3 w-20 bg-white/80 rounded mb-1" />
          <div className="h-2 w-14 bg-green-200/60 rounded mb-1.5" />
          <div className="flex gap-2">
            <div className="h-1.5 w-10 bg-green-200/40 rounded" />
            <div className="h-1.5 w-10 bg-green-200/40 rounded" />
          </div>
        </div>
        <div className="px-3 space-y-2">
          <div className="h-1 w-full bg-green-100 rounded" />
          <div className="h-1 w-4/5 bg-green-100 rounded" />
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-2.5 w-8 rounded bg-green-100 border border-green-200"
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },

  {
    id: "aurora",
    name: "Aurora",
    tag: "Dreamy & Premium",
    hasPhoto: true,
    desc: "Desain aurora borealis dengan gradien ungu-biru-hijau yang magis. Untuk UI/UX designer, artist, dan dreamer.",
    accent: "from-violet-600 to-cyan-500",
    features: [
      "Aurora gradient magis",
      "Support foto profil",
      "Glass morphism effect",
      "Untuk designer & artist",
    ],
    preview: (
      <div
        className="rounded-lg overflow-hidden h-full"
        style={{ background: "linear-gradient(135deg,#0d0d1a,#1a0533)" }}
      >
        <div
          className="p-3"
          style={{
            background:
              "linear-gradient(135deg,rgba(124,58,237,0.5),rgba(6,182,212,0.3))",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-8 h-8 rounded-full"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            />
            <div>
              <div
                className="h-2.5 w-16 rounded mb-0.5"
                style={{ background: "rgba(255,255,255,0.8)" }}
              />
              <div
                className="h-1.5 w-12 rounded"
                style={{ background: "rgba(167,139,250,0.7)" }}
              />
            </div>
          </div>
        </div>
        <div className="p-3 space-y-1.5">
          <div
            className="h-1 w-full rounded"
            style={{ background: "rgba(124,58,237,0.25)" }}
          />
          <div
            className="h-1 w-4/5 rounded"
            style={{ background: "rgba(6,182,212,0.15)" }}
          />
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2.5 w-8 rounded"
                style={{
                  background: "rgba(124,58,237,0.2)",
                  border: "1px solid rgba(167,139,250,0.4)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },

  {
    id: "retro",
    name: "Retro Paper",
    tag: "Vintage & Unique",
    hasPhoto: false,
    desc: "Desain retro terinspirasi koran vintage dan mesin tik. Unik dan memorable untuk penulis, journalist, dan akademisi.",
    accent: "from-yellow-700 to-amber-800",
    features: [
      "Estetika koran vintage",
      "Tipografi monospace",
      "Texture kertas tua",
      "Untuk writer & journalist",
    ],
    preview: (
      <div
        className="rounded-lg overflow-hidden h-full p-3"
        style={{ background: "#fef9c3", border: "2px solid #d97706" }}
      >
        <div className="border-b-2 border-amber-800 pb-2 mb-2">
          <div
            className="h-3 w-20 rounded mx-auto mb-1"
            style={{ background: "#451a03", display: "block" }}
          />
          <div
            className="h-1.5 w-14 rounded mx-auto"
            style={{ background: "#92400e" }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div
              className="h-1.5 w-8 rounded mb-1"
              style={{ background: "#713f12" }}
            />
            <div
              className="h-1 w-full rounded"
              style={{ background: "rgba(113,63,18,0.2)" }}
            />
            <div
              className="h-1 w-4/5 rounded mt-0.5"
              style={{ background: "rgba(113,63,18,0.15)" }}
            />
          </div>
          <div>
            <div
              className="h-1.5 w-8 rounded mb-1"
              style={{ background: "#713f12" }}
            />
            <div
              className="h-1 w-full rounded"
              style={{ background: "rgba(113,63,18,0.2)" }}
            />
            <div
              className="h-1 w-3/5 rounded mt-0.5"
              style={{ background: "rgba(113,63,18,0.15)" }}
            />
          </div>
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
            Sepuluh desain unik — dari minimalis klasik hingga neon futuristik
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              className={`glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                data.selectedTemplate === tmpl.id
                  ? "border-gold-400/40 shadow-gold ring-1 ring-gold-400/30"
                  : "hover:border-white/20 hover:translate-y-[-2px]"
              }`}
            >
              <div className="relative h-44 p-3 bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden">
                {tmpl.preview}
                {data.selectedTemplate === tmpl.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center shadow-gold z-10">
                    <Check size={11} className="text-navy-950 font-bold" />
                  </div>
                )}
                {tmpl.hasPhoto && (
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium">
                      📷 Foto
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3.5 flex flex-col flex-1 border-t border-white/[0.05]">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-display text-sm font-semibold text-white/90 leading-tight">
                    {tmpl.name}
                  </h3>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full bg-gradient-to-r ${tmpl.accent} text-white font-medium whitespace-nowrap flex-shrink-0`}
                  >
                    {tmpl.tag}
                  </span>
                </div>
                <p className="text-white/30 text-[11px] leading-relaxed mb-3 flex-1 line-clamp-2">
                  {tmpl.desc}
                </p>

                <button
                  onClick={() => handleSelect(tmpl.id)}
                  className={`w-full text-xs py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-1.5 ${
                    data.selectedTemplate === tmpl.id
                      ? "btn-primary"
                      : "btn-ghost"
                  }`}
                >
                  {data.selectedTemplate === tmpl.id ? (
                    <>
                      <Check size={11} />
                      Aktif
                    </>
                  ) : (
                    <>
                      Pilih
                      <ArrowRight size={11} />
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