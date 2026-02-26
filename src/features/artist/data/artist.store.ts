import jkt48Data from "@/data/raw/artist-overview/jkt48.json";
import tiaraAndiniData from "@/data/raw/artist-overview/tiara-andini.json";
import slemanRecehData from "@/data/raw/artist-overview/sleman-receh.json";
import arsyWidiantoData from "@/data/raw/artist-overview/arsy-widianto.json";
import anggisDevakiData from "@/data/raw/artist-overview/anggis-devaki.json";

import type { ArtistAPIContract } from "./artist.types";

export const artists: Record<string, ArtistAPIContract> = {
  "spotify:artist:2l8I5pWUnfF7bMK1z6EJRk": jkt48Data,
  "spotify:artist:7lXTU6VtJQWfiN2vuZyzqf": anggisDevakiData,
  "spotify:artist:0kPb52ySN2k9P6wEZPTUzm": tiaraAndiniData,
  "spotify:artist:0jcgtGZTWxoepAUgADwcHP": slemanRecehData,
  "spotify:artist:7j5PGC0BF48rRtcmgbVvOT": arsyWidiantoData,
};

export const getArtistById = (id: string) => {
  return artists[id as keyof typeof artists] ?? null;
};
