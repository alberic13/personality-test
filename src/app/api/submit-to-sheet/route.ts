import { NextResponse } from "next/server";
import { z } from "zod";

const submitSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  email: z.string().trim().email("Format email tidak valid"),
  testType: z.enum(["majemuk", "riasec", "gaya-belajar"]).optional().default("majemuk"),
  scores: z.record(z.string(), z.number()).optional().default({}),
  dominant: z.union([z.array(z.string()), z.string()]).optional().default([]),
  date: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { status: "error", message: "Format JSON tidak valid." },
        { status: 400 }
      );
    }

    const parseResult = submitSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          status: "error",
          message: "Data yang dikirimkan tidak valid.",
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, scores, dominant, date, testType } = parseResult.data;
    const dominantString = Array.isArray(dominant) ? dominant.join(", ") : dominant;

    const webappUrl = process.env.SHEET_WEBAPP_URL || process.env.NEXT_PUBLIC_SHEET_WEBAPP_URL;

    if (!webappUrl) {
      console.warn("SHEET_WEBAPP_URL belum dikonfigurasi di .env.local");
      return NextResponse.json({
        status: "mock_success",
        message: "URL Sheet belum diset, data disimulasikan sukses.",
      });
    }

    const payload = {
      testType,
      name,
      email,
      linguistik: scores.linguistik || 0,
      matematis: scores.matematis || 0,
      spasial: scores.spasial || 0,
      kinestetik: testType === "gaya-belajar" ? (scores.gaya_kinestetik || 0) : (scores.kinestetik || 0),
      musikal: scores.musikal || 0,
      interpersonal: scores.interpersonal || 0,
      intrapersonal: scores.intrapersonal || 0,
      naturalis: scores.naturalis || 0,
      realistic: scores.realistic || 0,
      investigative: scores.investigative || 0,
      artistic: scores.artistic || 0,
      social: scores.social || 0,
      enterprising: scores.enterprising || 0,
      conventional: scores.conventional || 0,
      gaya_visual: scores.gaya_visual || 0,
      gaya_auditori: scores.gaya_auditori || 0,
      gaya_kinestetik: scores.gaya_kinestetik || 0,
      visual: scores.gaya_visual || 0,
      auditori: scores.gaya_auditori || 0,
      dominant: dominantString,
      date: date || new Date().toISOString(),
    };

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
