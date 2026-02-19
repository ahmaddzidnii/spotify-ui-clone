import { ScrollArea } from "@/components/scroll-area";
import { Link } from "react-router";

interface LyricLine {
  id: number;
  text: string;
}

const lyrics: LyricLine[] = [
  { id: 1, text: "Tak tembangke lagu iki" },
  { id: 2, text: "Kanggo sliramu sing paling tak tresnani" },
  { id: 3, text: "Getun ati iki, aku ra nepati janji" },
  { id: 4, text: "Aku lungo tanpo kondo" },
  { id: 5, text: "Mergo kedanan wong liyo" },
  { id: 6, text: "Kelingan mbiyen dewe ketemu" },
  { id: 7, text: "Kowe janji ra bakal ngelarani atiku" },
  { id: 8, text: "Segampang iki caramu mupus roso tresnoku" },
  { id: 9, text: "Aku ra bakal lali" },
  { id: 10, text: "Tekan kapan ra bakal tak ngapurani" },
  { id: 11, text: "Kowe lungo ninggal aku, atiku loro" },
  { id: 12, text: "Ora nyongko kowe gampang keno gudho" },
  { id: 13, text: "Aku raiso nompo lehmu dolanan tresno" },
  { id: 14, text: "Tak akoni pancen aku iki dudu sopo-sopo" },
  { id: 15, text: "Sing gede pangapuramu, lungaku ninggal tatu" },
  { id: 16, text: "Wes gawe loro atimu" },
  { id: 17, text: "Aku ra butuh tresnomu, kabeh kuwi mung palsu" },
  { id: 18, text: "Tak buang roso tresnoku, korban janji manismu" },
  { id: 19, text: "Tak jaluk pengertianmu" },
  { id: 20, text: "Ojo dadi loromu, tulung ngapuranen aku" },
  { id: 21, text: "Ati iki dudu dolanan, dudu pelampiasan" },
  { id: 22, text: "S'najan uripku pas-pasan, aku wani kelangan" },
  { id: 23, text: "Ora perlu tok getuni cerito loro iki" },
  { id: 24, text: "Ora bakal tak baleni" },
  { id: 25, text: "Kowe lungo ninggal aku, atiku loro" },
  { id: 26, text: "Ora nyongko kowe gampang keno gudho" },
  { id: 27, text: "Aku raiso nompo lehmu dolanan tresno" },
  { id: 28, text: "Tak akoni pancen aku iki dudu sopo-sopo" },
  { id: 29, text: "Sing gede pangapuramu, lungaku ninggal tatu" },
  { id: 30, text: "Wes gawe loro atimu" },
  { id: 31, text: "Aku ra butuh tresnomu, kabeh kuwi mung palsu" },
  { id: 32, text: "Tak buang roso tresnoku, korban janji manismu" },
  { id: 33, text: "Tak jaluk pengertianmu" },
  { id: 34, text: "Ojo dadi loromu, tulung ngapuranen aku" },
  { id: 35, text: "Ati iki dudu dolanan, dudu pelampiasan" },
  { id: 36, text: "S'najan uripku pas-pasan, aku wani kelangan" },
  { id: 37, text: "Ora perlu tok getuni cerito loro iki" },
  { id: 38, text: "Ora tak baleni" },
  { id: 39, text: "Ora perlu tok getuni cerito loro iki" },
  { id: 40, text: "Ora tak baleni" },
];

export const LyricsPage = () => {
  return (
    <ScrollArea className="grid grid-cols-1 h-[calc(100vh-73px)] bg-lyrics-background overflow-hidden">
      <div className="my-12 max-w-3xl mx-auto px-8">
        <div className="flex flex-col gap-5  items-start">
          {lyrics.map((line) => (
            <Link
              to="#"
              style={{
                color: line.id == 2 ? "var(--color-lyrics-active)" : "var(--color-lyrics-inactive)",
              }}
              key={line.id}
              className="leading-10 text-balance text-3xl font-extrabold"
            >
              {line.text}
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};
