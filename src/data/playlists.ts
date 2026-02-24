import ngodinghPlaylist from "./raw/playlist-overview/ngodingh.json";
import scrollFesnukPlaylist from "./raw/playlist-overview/scroll-fesnuk.json";

export const playlists = {
  "spotify:playlist:5lF6ZtkLPr7acwFD973CCp": ngodinghPlaylist.data.playlistV2,
  "spotify:playlist:3fN3Kgy4kxLLtpFyfSDcuB": scrollFesnukPlaylist.data.playlistV2,
};

export const libraryResponse = {
  data: {
    me: {
      libraryV3: {
        __typename: "LibraryPage",
        availableFilters: [
          {
            id: "Playlists",
            name: "Playlists",
          },
        ],
        availableSortOrders: [
          {
            id: "Recents",
            name: "Recents",
          },
          {
            id: "Recently Added",
            name: "Recently Added",
          },
          {
            id: "Alphabetical",
            name: "Alphabetical",
          },
          {
            id: "Creator",
            name: "Creator",
          },
        ],
        breadcrumbs: [],
        items: [
          {
            addedAt: {
              isoString: "1970-01-01T00:00:00Z",
            },
            depth: 0,
            item: {
              __typename: "LibraryPseudoPlaylistResponseWrapper",
              _uri: "spotify:collection:tracks",
              data: {
                __typename: "PseudoPlaylist",
                count: 5,
                image: {
                  extractedColors: {
                    colorDark: {
                      hex: "#5018F0",
                      isFallback: false,
                    },
                  },
                  sources: [
                    {
                      height: 64,
                      url: "https://misc.scdn.co/liked-songs/liked-songs-64.png",
                      width: 64,
                    },
                    {
                      height: 300,
                      url: "https://misc.scdn.co/liked-songs/liked-songs-300.png",
                      width: 300,
                    },
                    {
                      height: 640,
                      url: "https://misc.scdn.co/liked-songs/liked-songs-640.png",
                      width: 640,
                    },
                  ],
                },
                name: "Liked Songs",
                uri: "spotify:collection:tracks",
              },
            },
            pinnable: true,
            pinned: true,
            playedAt: null,
          },
          {
            addedAt: {
              isoString: "2021-11-16T11:47:36Z",
            },
            depth: 0,
            item: {
              __typename: "PlaylistResponseWrapper",
              _uri: "spotify:playlist:5lF6ZtkLPr7acwFD973CCp",
              data: {
                __typename: "Playlist",
                attributes: [],
                currentUserCapabilities: {
                  canEditItems: true,
                  canView: true,
                },
                description: "",
                format: "",
                images: {
                  items: [
                    {
                      extractedColors: {
                        colorDark: {
                          hex: "#785858",
                          isFallback: false,
                        },
                      },
                      sources: [
                        {
                          height: 640,
                          url: "https://mosaic.scdn.co/640/ab67616d00001e020f94886d67ae4e92a92b2281ab67616d00001e02ab85980da8a5c59d26309a6fab67616d00001e02c5b4a9d8fdc63b9562a4d280ab67616d00001e02f6ce264866ac7fa1664b4db4",
                          width: 640,
                        },
                        {
                          height: 300,
                          url: "https://mosaic.scdn.co/300/ab67616d00001e020f94886d67ae4e92a92b2281ab67616d00001e02ab85980da8a5c59d26309a6fab67616d00001e02c5b4a9d8fdc63b9562a4d280ab67616d00001e02f6ce264866ac7fa1664b4db4",
                          width: 300,
                        },
                        {
                          height: 60,
                          url: "https://mosaic.scdn.co/60/ab67616d00001e020f94886d67ae4e92a92b2281ab67616d00001e02ab85980da8a5c59d26309a6fab67616d00001e02c5b4a9d8fdc63b9562a4d280ab67616d00001e02f6ce264866ac7fa1664b4db4",
                          width: 60,
                        },
                      ],
                    },
                  ],
                },
                name: "Ngodingh",
                ownerV2: {
                  data: {
                    __typename: "User",
                    avatar: null,
                    id: "nil5fgbz7xteglq1d46gfnnqs",
                    name: "ahmaddzidnii",
                    uri: "spotify:user:nil5fgbz7xteglq1d46gfnnqs",
                    username: "nil5fgbz7xteglq1d46gfnnqs",
                  },
                },
                revisionId: "AAAAF1AlqxJ/TNHTqeKpNui2gUTLRx3h",
                uri: "spotify:playlist:5lF6ZtkLPr7acwFD973CCp",
              },
            },
            pinnable: true,
            pinned: false,
            playedAt: {
              isoString: "2026-02-23T16:03:14.619Z",
            },
          },
          {
            addedAt: {
              isoString: "2026-02-15T09:08:21.475Z",
            },
            depth: 0,
            item: {
              __typename: "PlaylistResponseWrapper",
              _uri: "spotify:playlist:3fN3Kgy4kxLLtpFyfSDcuB",
              data: {
                __typename: "Playlist",
                attributes: [],
                currentUserCapabilities: {
                  canEditItems: true,
                  canView: true,
                },
                description: "Playlist created by the tutorial on developer.spotify.com",
                format: "",
                images: {
                  items: [
                    {
                      extractedColors: {
                        colorDark: {
                          hex: "#686060",
                          isFallback: false,
                        },
                      },
                      sources: [
                        {
                          height: 640,
                          url: "https://mosaic.scdn.co/640/ab67616d00001e02d1b4ab00a8b44b4405f884e0ab67616d00001e02d40efa53074e19b201b18507ab67616d00001e02f1f1e524da6fd9e2b142ce07ab67616d00001e02ff0bb52e3043a5bf5f7978a8",
                          width: 640,
                        },
                        {
                          height: 300,
                          url: "https://mosaic.scdn.co/300/ab67616d00001e02d1b4ab00a8b44b4405f884e0ab67616d00001e02d40efa53074e19b201b18507ab67616d00001e02f1f1e524da6fd9e2b142ce07ab67616d00001e02ff0bb52e3043a5bf5f7978a8",
                          width: 300,
                        },
                        {
                          height: 60,
                          url: "https://mosaic.scdn.co/60/ab67616d00001e02d1b4ab00a8b44b4405f884e0ab67616d00001e02d40efa53074e19b201b18507ab67616d00001e02f1f1e524da6fd9e2b142ce07ab67616d00001e02ff0bb52e3043a5bf5f7978a8",
                          width: 60,
                        },
                      ],
                    },
                  ],
                },
                name: "Scroll Fesnuk",
                ownerV2: {
                  data: {
                    __typename: "User",
                    avatar: null,
                    id: "nil5fgbz7xteglq1d46gfnnqs",
                    name: "ahmaddzidnii",
                    uri: "spotify:user:nil5fgbz7xteglq1d46gfnnqs",
                    username: "nil5fgbz7xteglq1d46gfnnqs",
                  },
                },
                revisionId: "AAAAAxp4Xc8AKrNYklYdtFQJhbh4Nlzy",
                uri: "spotify:playlist:3fN3Kgy4kxLLtpFyfSDcuB",
              },
            },
            pinnable: true,
            pinned: false,
            playedAt: null,
          },
        ],
        pagingInfo: {
          limit: 50,
          offset: 0,
        },
        selectedFilters: [],
        selectedSortOrder: {
          id: "Recents",
          name: "Recents",
        },
        totalCount: 3,
      },
    },
  },
};
