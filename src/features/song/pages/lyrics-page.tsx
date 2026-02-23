import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/scroll-area";
import { Link } from "react-router";

const trackLyrics = {
  lyrics: {
    syncType: "LINE_SYNCED",
    lines: [
      { startTimeMs: "8760", words: "Harusnya aku katakan dari dulu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "16720", words: "Sebelum semua jadi begini", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "25250", words: "Kini terlanjur, kisah sudah tak sama", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "33240", words: "Seperti awal bertemu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "40720", words: "Kamu telah banyak berubah", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "48840", words: "Tak seperti yang kukenal dahulu, mm-hm", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "62500", words: "Mana dirimu yang dahulu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "66700", words: "Yang selalu pentingkan aku?", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "70810", words: "Kini yang terdengar hanya suara amarahmu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "79120", words: "Mana kekasihku yang dulu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "83130", words: "Yang tak pernah bisa melihatku menangis bersedih?", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "91090", words: "Mana dirimu yang dahulu?", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "99780", words: "(Kurindukan semua dirimu yang dahulu)", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      {
        startTimeMs: "106970",
        words: "(Mana kekasihku yang dulu?) Mana kekasihku yang dulu?",
        syllables: [],
        endTimeMs: "0",
        transliteratedWords: "",
      },
      { startTimeMs: "116450", words: "Kurindukan semua masa bahagia seperti dulu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "124300", words: "Saat tulusmu masih untukku, uh-oh", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "133930", words: "Kamu kini jauh berbeda", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "141940", words: "Tak seperti yang kukenal dahulu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "151360", words: "Mana dirimu yang dahulu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "155490", words: "Yang selalu pentingkan aku?", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "159680", words: "Kini yang terdengar hanya suara amarahmu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "167900", words: "Mana kekasihku yang dulu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "172090", words: "Yang tak pernah bisa melihatku menangis bersedih?", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "179960", words: "Mana dirimu yang dahulu?", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "184540", words: "(Mana dirimu yang dahulu)", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "188790", words: "(Yang selalu pentingkan aku?)", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "193290", words: "Kini hanya suara amarahmu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      {
        startTimeMs: "201130",
        words: "Mana kekasihku yang dulu (yang tak pernah bisa melihatku)",
        syllables: [],
        endTimeMs: "0",
        transliteratedWords: "",
      },
      { startTimeMs: "207300", words: "Yang pentingkan aku? (Menangis bersedih)", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "214460", words: "Mana dirimu yang dulu?", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "222590", words: "Ku rindu dirimu yang dulu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "230370", words: "", syllables: [], endTimeMs: "0", transliteratedWords: "" },
    ],
    provider: "MusixMatch",
    providerLyricsId: "190493162",
    providerDisplayName: "Musixmatch",
    syncLyricsUri: "",
    isDenseTypeface: false,
    alternatives: [],
    language: "ms",
    isRtlLanguage: false,
    capStatus: "NONE",
    previewLines: [
      { startTimeMs: "8760", words: "Harusnya aku katakan dari dulu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "16720", words: "Sebelum semua jadi begini", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "25250", words: "Kini terlanjur, kisah sudah tak sama", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "33240", words: "Seperti awal bertemu", syllables: [], endTimeMs: "0", transliteratedWords: "" },
      { startTimeMs: "40720", words: "Kamu telah banyak berubah", syllables: [], endTimeMs: "0", transliteratedWords: "" },
    ],
  },
  colors: {
    background: -6526624,
    text: -16777216,
    highlightText: -1,
  },
  hasVocalRemoval: false,
};

export const LyricsPage = () => {
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play pas mounted
  const activeLineRef = useRef<HTMLAnchorElement>(null); // Ref untuk tag <Link>

  const lines = trackLyrics.lyrics.lines;

  // Timer Simulasi Audio
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeMs((prev) => prev + 200);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Kalkulasi Lirik Aktif
  const activeIndex = lines.findIndex((line, index) => {
    const startMs = Number(line.startTimeMs);
    const nextStartMs = lines[index + 1] ? Number(lines[index + 1].startTimeMs) : Infinity;
    return currentTimeMs >= startMs && currentTimeMs < nextStartMs;
  });

  // Auto-Scroll ke Tengah
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  return (
    <ScrollArea
      style={
        {
          "--lyrics-color-active": "rgba(255, 255, 255, 1)",
          "--lyrics-color-inactive": "rgba(247, 193, 183, 1)",
          "--lyrics-color-passed": "rgba(255, 255, 255, 1)",
          "--lyrics-color-background": "rgba(83, 40, 34, 1)",
          "--lyrics-color-messaging": "rgba(247, 193, 183, 1)",
          backgroundColor: "var(--lyrics-color-background)",
        } as React.CSSProperties
      }
      className="grid grid-cols-1 h-full overflow-hidden relative"
    >
      <div className="my-12 max-w-3xl mx-auto px-8">
        <div className="flex flex-col items-start">
          {lines.map((line, index) => {
            const isActive = index === activeIndex;
            const isPassed = index < activeIndex;

            let lyricColor = "var(--lyrics-color-inactive)";

            if (isActive) lyricColor = "var(--lyrics-color-active)";
            if (isPassed) lyricColor = "var(--lyrics-color-passed)";

            return (
              <Link
                to="#"
                key={index}
                ref={isActive ? activeLineRef : null}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTimeMs(Number(line.startTimeMs));
                  setIsPlaying(true);
                }}
                style={{
                  color: lyricColor,
                  opacity: isPassed ? 0.5 : 1,
                  transition: "color 0.4s ease",
                }}
                className="leading-10 text-balance text-4xl font-extrabold origin-left mb-6"
              >
                {line.words || "♪"}
              </Link>
            );
          })}
        </div>
        <div className="pt-80">
          <p
            style={{
              color: "var(--lyrics-color-messaging)",
            }}
            className="text-sm"
          >
            Lyrics provided by {trackLyrics.lyrics.providerDisplayName}
          </p>
        </div>
      </div>
    </ScrollArea>
  );
};
