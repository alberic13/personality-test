import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, scores, dominant, date, testType } = body;

    // Ambil URL Google Apps Script Web App dari env
    const webappUrl = process.env.SHEET_WEBAPP_URL || process.env.NEXT_PUBLIC_SHEET_WEBAPP_URL;

    if (!webappUrl) {
      console.warn("SHEET_WEBAPP_URL belum dikonfigurasi di .env.local");
      // Jika belum diset, anggap sukses secara lokal agar kuis tetap berlanjut
      return NextResponse.json({ 
        status: "mock_success", 
        message: "URL Sheet belum diset, data disimulasikan sukses." 
      });
    }

    // Siapkan data untuk dikirim ke Google Sheet
    const payload = {
      testType: testType || "majemuk",
      name,
      email,
      // Kecerdasan Majemuk
      linguistik: scores.linguistik || 0,
      matematis: scores.matematis || 0,
      spasial: scores.spasial || 0,
      kinestetik: testType === "gaya-belajar" ? (scores.gaya_kinestetik || 0) : (scores.kinestetik || 0),
      musikal: scores.musikal || 0,
      interpersonal: scores.interpersonal || 0,
      intrapersonal: scores.intrapersonal || 0,
      naturalis: scores.naturalis || 0,
      // RIASEC
      realistic: scores.realistic || 0,
      investigative: scores.investigative || 0,
      artistic: scores.artistic || 0,
      social: scores.social || 0,
      enterprising: scores.enterprising || 0,
      conventional: scores.conventional || 0,
      // Gaya Belajar
      gaya_visual: scores.gaya_visual || 0,
      gaya_auditori: scores.gaya_auditori || 0,
      gaya_kinestetik: scores.gaya_kinestetik || 0,
      visual: scores.gaya_visual || 0,
      auditori: scores.gaya_auditori || 0,

      dominant: dominant.join(", "),
      date: date || new Date().toISOString()
    };

    // Kirim data ke Google Apps Script Web App
    const response = await fetch(webappUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Google Web App merespons dengan status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Gagal mengirim data ke Google Sheets:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { status: "error", message: errorMessage },
      { status: 500 }
    );
  }
}
