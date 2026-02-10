"use server";

import * as cheerio from "cheerio";

export type BookmarkData = {
  title: string;
  image: string;
  url: string;
  hostname: string;
};

export async function scrapeMetaData(url: string): Promise<BookmarkData | null> {
  if (!url) return null;

  try {
    // 1. Fetch HTML dari URL target
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });
    
    if (!res.ok) throw new Error("Gagal akses URL");
    
    const html = await res.text();

    // 2. Load HTML ke Cheerio untuk diparsing
    const $ = cheerio.load(html);

    // 3. Cari Title & Image (Open Graph Meta Tags)
    const title = $('meta[property="og:title"]').attr("content") || $("title").text() || "No Title";
    const image = $('meta[property="og:image"]').attr("content") || "";
    
    // Ambil hostname (misal: youtube.com)
    const { hostname } = new URL(url);

    return {
      title,
      image,
      url,
      hostname,
    };

  } catch (error) {
    console.error("Error scraping:", error);
    return null;
  }
}