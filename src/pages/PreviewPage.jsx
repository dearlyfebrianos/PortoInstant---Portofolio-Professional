import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import LivePreview from "../components/preview/LivePreview";
import { Download, ArrowLeft, Edit2, Layout } from "lucide-react";
import { toast } from "react-hot-toast";

const PreviewPage = () => {
  const { data } = usePortfolio();
  const previewRef = useRef(null);

  const handleDownloadPDF = async () => {
    const toastId = toast.loading("Menyiapkan PDF...");
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = previewRef.current;
      if (!element) throw new Error("Element not found");

      const opt = {
        margin: 0,
        filename: `portofolio-${(data.name || "porto").toLowerCase().replace(/\s+/g, "-")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF berhasil didownload!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Gagal download PDF. Coba lagi.", { id: toastId });
    }
  };

  const hasData = data.name || data.title || data.bio;

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold gold-text mb-1">
              Preview
            </h1>
            <p className="text-white/40 text-sm">
              Tampilan akhir portofoliomu sebelum didownload
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/templates">
              <button className="btn-ghost text-sm py-2 px-4 flex items-center gap-2">
                <Layout size={14} />
                Ganti Template
              </button>
            </Link>
            <Link to="/builder">
              <button className="btn-ghost text-sm py-2 px-4 flex items-center gap-2">
                <Edit2 size={14} />
                Edit
              </button>
            </Link>
            <button
              onClick={handleDownloadPDF}
              className="btn-primary text-sm py-2 px-5 flex items-center gap-2"
              disabled={!hasData}
            >
              <Download size={14} />
              Download PDF
            </button>
          </div>
        </div>

        {!hasData && (
          <div className="glass-card rounded-2xl p-12 text-center mb-6">
            <p className="text-white/30 text-base mb-4">
              Portofoliomu masih kosong.
            </p>
            <Link to="/builder">
              <button className="btn-primary text-sm">Mulai Isi Data</button>
            </Link>
          </div>
        )}

        <div className="glass rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-white/30 font-mono">
              portofolio-
              {(data.name || "preview").toLowerCase().replace(/\s+/g, "-")}.pdf
            </span>
          </div>
          <div ref={previewRef} className="min-h-[800px]">
            <LivePreview />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPDF}
            disabled={!hasData}
            className="btn-primary text-base px-10 py-4 flex items-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;