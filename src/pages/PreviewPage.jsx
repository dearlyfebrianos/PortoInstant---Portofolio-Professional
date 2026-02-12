import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import LivePreview from "../components/preview/LivePreview";
import { Download, Edit2, Layout, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { templates } from "./TemplatesPage";

const PreviewPage = () => {
  const { data } = usePortfolio();
  const contentRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const currentTemplate = templates.find((t) => t.id === data.selectedTemplate);

  const handleDownloadPDF = async () => {
    if (isExporting) return;
    setIsExporting(true);
    const toastId = toast.loading("Menyiapkan PDF...");

    try {
      const { default: html2canvas } = await import("html2canvas");
      const { default: jsPDF } = await import("jspdf");

      const element = contentRef.current;
      if (!element) throw new Error("Element tidak ditemukan");

      const safeFilename = `PORTOFOLIO ${(data.name || "PORTO")
        .toUpperCase()
        .trim()
        .replace(/\s+/g, " ")}.pdf`;

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        logging: false,
        letterRendering: true,
        allowTaint: true,
        backgroundColor: null,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      const imgWidth = pdfWidth;
      let imgHeight = (canvas.height * pdfWidth) / canvas.width;
      if (imgHeight < pdfHeight) imgHeight = pdfHeight;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      let heightLeft = imgHeight;
      let position = 0;
      const pageHeight = pdfHeight;

      pdf.addImage(
        canvas.toDataURL("image/jpeg", 0.98),
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST",
      );
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL("image/jpeg", 0.98),
          "JPEG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST",
        );
        heightLeft -= pageHeight;
      }

      pdf.save(safeFilename);
      toast.success("PDF berhasil didownload!", { id: toastId });
    } catch (err) {
      console.error("PDF error:", err);
      toast.error("Gagal download PDF. Coba lagi.", { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  const hasData = !!(data.name || data.title || data.bio);

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold gold-text mb-1">
              Preview
            </h1>
            <p className="text-white/40 text-sm">
              Tampilan ini <strong className="text-white/60">identik</strong>{" "}
              dengan hasil PDF yang didownload
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
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
              className="btn-primary text-sm py-2 px-5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!hasData || isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Download size={14} />
                  Download PDF
                </>
              )}
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
            <span className="ml-3 text-xs text-white/30 font-mono truncate">
              {safeFilenameDisplay(data.name)} ·{" "}
              {currentTemplate?.name || "Minimal"}
            </span>
          </div>

          <div className="overflow-auto bg-neutral-200/10">
            <div ref={contentRef}>
              <LivePreview />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={handleDownloadPDF}
            disabled={!hasData || isExporting}
            className="btn-primary text-base px-10 py-4 flex items-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Memproses PDF...
              </>
            ) : (
              <>
                <Download size={18} />
                Download PDF
              </>
            )}
          </button>
        </div>

        <p className="text-center text-white/20 text-xs mt-4">
          Format A4 · Resolusi tinggi · Preview = hasil PDF
        </p>
      </div>
    </div>
  );
};

const safeFilenameDisplay = (name) =>
  `PORTOFOLIO ${(name || "PREVIEW").toUpperCase().trim().replace(/\s+/g, " ")}.pdf`;

export default PreviewPage;