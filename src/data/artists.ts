import jkt48Data from "./raw/artist-overview/jkt48.json";
import anggisDevakiData from "./raw/artist-overview/anggis-devaki.json";
import tiaraAndiniData from "./raw/artist-overview/tiara-andini.json";
import slemanRecehData from "./raw/artist-overview/sleman-receh.json";
import arsyWidiantoData from "./raw/artist-overview/arsy-widianto.json";

export const artists = {
  "spotify:artist:2l8I5pWUnfF7bMK1z6EJRk": jkt48Data.data.artistUnion,
  "spotify:artist:7lXTU6VtJQWfiN2vuZyzqf": anggisDevakiData.data.artistUnion,
  "spotify:artist:0kPb52ySN2k9P6wEZPTUzm": tiaraAndiniData.data.artistUnion,
  "spotify:artist:0jcgtGZTWxoepAUgADwcHP": slemanRecehData.data.artistUnion,
  "spotify:artist:7j5PGC0BF48rRtcmgbVvOT": arsyWidiantoData.data.artistUnion,
};
