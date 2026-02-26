import artiSemestinyaCintaData from "@/data/raw/album-overview/album-arti-semestinya-cinta.json";
import artiUntukCintaData from "@/data/raw/album-overview/album-arti-untuk-cinta.json";
import mahagitaVol2Data from "@/data/raw/album-overview/album-mahagita-vol-2.json";
import type { AlbumAPIContract } from "./album.types";

export const albums: Record<string, AlbumAPIContract> = {
  "spotify:album:48VJneXoN4AW5QAT4Ruwkc": artiSemestinyaCintaData as unknown as AlbumAPIContract,
  "spotify:album:4Tx1o9uaCC1EMPoCejM95i": artiUntukCintaData as unknown as AlbumAPIContract,
  "spotify:album:7MpAqxM7Mew0Vb1clDl6pJ": mahagitaVol2Data as unknown as AlbumAPIContract,
};

export const getAlbumById = (id: string): AlbumAPIContract | null => {
  return albums[id] ?? null;
};
