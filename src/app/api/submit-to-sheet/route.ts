import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, scores, dominant, date } = body;

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
      name,
      email,
      linguistik: scores.linguistik || 0,
      matematis: scores.matematis || 0,
      spasial: scores.spasial || 0,
      kinestetik: scores.kinestetik || 0,
      musikal: scores.musikal || 0,
      interpersonal: scores.interpersonal || 0,
      intrapersonal: scores.intrapersonal || 0,
      naturalis: scores.naturalis || 0,
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
  } catch (error: any) {
    console.error("Gagal mengirim data ke Google Sheets:", error);
    return NextResponse.json(
      { status: "error", message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
