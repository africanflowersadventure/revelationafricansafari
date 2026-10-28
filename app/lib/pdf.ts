// lib/pdf.ts
import type { CartItem } from "@/app/context/CartContext";

export type ItineraryMeta = {
  name: string;
  email: string;
  phone: string;
  startDate?: string;
};

const BRAND = {
  name: "Revelation Safari",
  tagline: "Your Tanzania Journey, Revealed",
  phone: "+255 757 535 767",
  whatsapp: "+255 757 535 767",
  email: "info@revelationafrica.com",
  website: "www.revelationafrica.com",
  address: "Arusha, Tanzania",
  logoPath: "/revelationLogo.png",
  logoFallbackBg: [30, 58, 47] as [number, number, number],
  logoFallbackFg: [217, 164, 91] as [number, number, number],
  cream: [244, 237, 228] as [number, number, number],
  forest: [30, 58, 47] as [number, number, number],
  terracotta: [193, 122, 75] as [number, number, number],
  gold: [217, 164, 91] as [number, number, number],
  charcoal: [44, 44, 44] as [number, number, number],
  muted: [120, 120, 120] as [number, number, number],
};

async function loadImageAsBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("FileReader error"));
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateItineraryPDF(
  items: CartItem[],
  meta: ItineraryMeta
): Promise<void> {
  if (typeof window === "undefined") return;

  if (!(window as any).jspdf) {
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Failed to load jsPDF"));
      document.head.appendChild(s);
    });
  }

  const { jsPDF } = (window as any).jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const pageW: number = doc.internal.pageSize.getWidth();
  const pageH: number = doc.internal.pageSize.getHeight();
  const margin = 48;

  const logoB64 = await loadImageAsBase64(BRAND.logoPath);

  /* ---------- Square logo ---------- */
  const drawSquareLogo = (x: number, y: number, size: number) => {
    if (logoB64) {
      try {
        doc.addImage(logoB64, "PNG", x, y, size, size, undefined, "FAST");
        return;
      } catch {
        /* fall through */
      }
    }
    doc.setFillColor(...BRAND.forest);
    doc.roundedRect(x, y, size, size, 6, 6, "F");
    doc.setTextColor(...BRAND.gold);
    doc.setFont("times", "bold");
    doc.setFontSize(size * 0.55);
    doc.text("R", x + size / 2, y + size * 0.68, { align: "center" });
  };

  /* ---------- Footer strip ---------- */
  const drawContactStrip = () => {
    doc.setFillColor(...BRAND.gold);
    doc.rect(0, pageH - 46, pageW, 2, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...BRAND.muted);
    const line1 = `${BRAND.name}  ·  ${BRAND.phone}  ·  ${BRAND.whatsapp} (WhatsApp)  ·  ${BRAND.email}`;
    const line2 = `${BRAND.address}  ·  ${BRAND.website}`;
    doc.text(line1, pageW / 2, pageH - 30, { align: "center" });
    doc.text(line2, pageW / 2, pageH - 18, { align: "center" });
  };

  /* ---------- Page header (cream) ---------- */
  const drawPageHeader = () => {
    doc.setFillColor(...BRAND.cream);
    doc.rect(0, 0, pageW, 64, "F");
    doc.setDrawColor(...BRAND.gold);
    doc.setLineWidth(1);
    doc.line(0, 64, pageW, 64);

    drawSquareLogo(margin, 10, 44);

    doc.setTextColor(...BRAND.forest);
    doc.setFont("times", "bold");
    doc.setFontSize(13);
    doc.text(BRAND.name, margin + 58, 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...BRAND.terracotta);
    doc.text(BRAND.tagline.toUpperCase(), margin + 58, 44);

    doc.setTextColor(...BRAND.charcoal);
    doc.setFontSize(7.5);
    doc.text(BRAND.phone, pageW - margin, 24, { align: "right" });
    doc.text(BRAND.email, pageW - margin, 36, { align: "right" });
    doc.text(BRAND.website, pageW - margin, 48, { align: "right" });
  };

  let y = margin;

  /* ============================================================
     COVER PAGE
     ============================================================ */
  doc.setFillColor(...BRAND.cream);
  doc.rect(0, 0, pageW, 240, "F");
  doc.setDrawColor(...BRAND.gold);
  doc.setLineWidth(1.5);
  doc.line(0, 240, pageW, 240);

  drawSquareLogo(margin, 30, 60);

  doc.setTextColor(...BRAND.forest);
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text(BRAND.name, margin + 78, 58);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND.terracotta);
  doc.text(BRAND.tagline.toUpperCase(), margin + 78, 76);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND.charcoal);
  const contactLines = [
    BRAND.address,
    `Phone: ${BRAND.phone}`,
    `WhatsApp: ${BRAND.whatsapp}`,
    `Email: ${BRAND.email}`,
    BRAND.website,
  ];
  let cy = 110;
  contactLines.forEach((line) => {
    doc.text(line, pageW - margin, cy, { align: "right" });
    cy += 12;
  });

  doc.setTextColor(...BRAND.forest);
  doc.setFont("times", "bold");
  doc.setFontSize(30);
  doc.text("Personalised Itinerary", margin, 180);

  y = 290;

  doc.setTextColor(...BRAND.forest);
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.text("Prepared for", margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...BRAND.charcoal);
  doc.text(`${meta.name}`, margin, y);
  y += 15;
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text(`Email: ${meta.email}`, margin, y);
  y += 14;
  doc.text(`Phone: ${meta.phone}`, margin, y);
  y += 14;
  if (meta.startDate) {
    doc.text(`Preferred start: ${meta.startDate}`, margin, y);
    y += 14;
  }
  y += 14;

  doc.setDrawColor(...BRAND.terracotta);
  doc.setLineWidth(1);
  doc.line(margin, y, pageW - margin, y);
  y += 18;

  const grandTotal = items.reduce(
    (s: number, i: CartItem) => s + i.priceUSD * i.travelers,
    0
  );

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...BRAND.forest);
  doc.text("Trip Summary", margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...BRAND.charcoal);
  items.forEach((it: CartItem) => {
    const line = `• ${it.title}  (${it.durationDays}D/${it.durationNights}N · ${it.travelers} travelers)`;
    const lines: string[] = doc.splitTextToSize(
      line,
      pageW - margin * 2 - 90
    );
    lines.forEach((l: string) => {
      doc.text(l, margin + 4, y);
      y += 12;
    });
    doc.text(
      `$${(it.priceUSD * it.travelers).toLocaleString()}`,
      pageW - margin,
      y - 12,
      { align: "right" }
    );
  });
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text("Grand total", margin, y);
  doc.text(`$${grandTotal.toLocaleString()}`, pageW - margin, y, {
    align: "right",
  });
  y += 20;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...BRAND.muted);
  doc.text(
    "Final quote depends on dates, season, group size, accommodation, and availability.",
    margin,
    y
  );

  drawContactStrip();

  /* ============================================================
     DAY-BY-DAY
     ============================================================ */
  items.forEach((it: CartItem) => {
    doc.addPage();
    drawPageHeader();
    y = 85;

    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...BRAND.forest);
    doc.text(`${it.title}`, margin, y);
    y += 16;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...BRAND.muted);
    doc.text(
      `${it.durationDays} Days / ${it.durationNights} Nights · ${
        it.travelers
      } travelers · Start: ${it.startDate || "TBD"}`,
      margin,
      y
    );
    y += 20;

    if (it.itinerary.length) {
      it.itinerary.forEach((d) => {
        if (y > pageH - 100) {
          doc.addPage();
          drawPageHeader();
          y = 85;
        }

        doc.setFillColor(...BRAND.terracotta);
        doc.circle(margin + 10, y + 4, 10, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text(String(d.day), margin + 10, y + 7, { align: "center" });

        doc.setTextColor(...BRAND.forest);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(d.title, margin + 28, y + 5);
        y += 20;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(60, 60, 60);
        const desc: string[] = doc.splitTextToSize(
          d.description,
          pageW - margin * 2 - 28
        );
        desc.forEach((line: string) => {
          if (y > pageH - 80) {
            doc.addPage();
            drawPageHeader();
            y = 85;
          }
          doc.text(line, margin + 28, y);
          y += 12;
        });

        const accomMeals = `Accommodation: ${d.accommodation} · Meals: ${d.meals}`;
        const amLines: string[] = doc.splitTextToSize(
          accomMeals,
          pageW - margin * 2 - 28
        );
        amLines.forEach((line: string) => {
          if (y > pageH - 80) {
            doc.addPage();
            drawPageHeader();
            y = 85;
          }
          doc.setTextColor(...BRAND.muted);
          doc.setFont("helvetica", "italic");
          doc.setFontSize(9);
          doc.text(line, margin + 28, y);
          y += 12;
          doc.setFont("helvetica", "normal");
        });
        y += 12;
      });
    } else {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(...BRAND.muted);
      doc.text("No day-by-day itinerary provided for this item.", margin, y);
      y += 18;
    }

    if (y > pageH - 160) {
      doc.addPage();
      drawPageHeader();
      y = 85;
    }
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...BRAND.forest);
    doc.text("Included", margin, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    it.inclusions.forEach((i: string) => {
      if (y > pageH - 80) {
        doc.addPage();
        drawPageHeader();
        y = 85;
      }
      doc.setTextColor(58, 138, 90);
      doc.setFont("helvetica", "bold");
      doc.text("✓", margin, y);
      doc.setTextColor(...BRAND.charcoal);
      doc.setFont("helvetica", "normal");
      const lines: string[] = doc.splitTextToSize(
        i,
        pageW - margin * 2 - 16
      );
      lines.forEach((line: string) => {
        doc.text(line, margin + 16, y);
        y += 12;
      });
    });
    y += 14;

    if (y > pageH - 160) {
      doc.addPage();
      drawPageHeader();
      y = 85;
    }
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...BRAND.forest);
    doc.text("Not Included", margin, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    it.exclusions.forEach((e: string) => {
      if (y > pageH - 80) {
        doc.addPage();
        drawPageHeader();
        y = 85;
      }
      doc.setTextColor(...BRAND.terracotta);
      doc.setFont("helvetica", "bold");
      doc.text("✕", margin, y);
      doc.setTextColor(...BRAND.charcoal);
      doc.setFont("helvetica", "normal");
      const lines: string[] = doc.splitTextToSize(
        e,
        pageW - margin * 2 - 16
      );
      lines.forEach((line: string) => {
        doc.text(line, margin + 16, y);
        y += 12;
      });
    });
  });

  /* ---------- Footer + page number on every page ---------- */
  const totalPages: number = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawContactStrip();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${totalPages}`, pageW - margin, pageH - 56, {
      align: "right",
    });
  }

  const filename = `Revelation-Safari-Itinerary-${
    meta.name.replace(/[^a-z0-9]/gi, "-").toLowerCase() || "trip"
  }.pdf`;
  doc.save(filename);
}