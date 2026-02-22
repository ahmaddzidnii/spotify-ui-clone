export type Track = {
  id: number;
  title: string;
  playCount: string;
  duration: string;
  isSaved: boolean;
  isMusicVideo: boolean;
  isActive: boolean;
  coverUrl: string;
};

export interface Artist {
  id: string;
  cover: {
    url: string;
    dominantColor: string;
  };
  name: string;
  monthlyListeners: number;
  tracks: {
    metadata: {
      videoPreview: {
        present: boolean;
        thumbnailUrl: string;
      };
    };
    data: Track[];
  };
}

const ARTISTS: Artist[] = [
  {
    id: "2l8I5pWUnfF7bMK1z6EJRk",
    cover: {
      url: "https://image-cdn-fa.spotifycdn.com/image/ab67618600009d80eb8e79216d982f582071da3d",
      dominantColor: "#5B0058FF",
    },
    name: "JKT48",
    monthlyListeners: 1540960,
    tracks: {
      metadata: {
        videoPreview: {
          present: true,
          thumbnailUrl: "https://i.scdn.co/image/ab67ba6900002ea625059949a3b0744a3c7e5ade",
        },
      },
      data: [
        {
          id: 1,
          title: "Seventeen",
          playCount: "43,582,632",
          duration: "3:45",
          isSaved: true,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02f6ce264866ac7fa1664b4db4",
        },
        {
          id: 2,
          title: "Rapsodi",
          playCount: "136,379,509",
          duration: "3:58",
          isSaved: false,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02dcd3a934c5c00bdfc1fd4d5c",
        },
        {
          id: 3,
          title: "Fortune Cookie Yang Mencinta",
          playCount: "51,809,889",
          duration: "4:42",
          isSaved: true,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02c1fb3e1f3cd9e8ace9cda286",
        },
        {
          id: 4,
          title: "Percik Kecil",
          playCount: "5,664,230",
          duration: "3:49",
          isSaved: true,
          isMusicVideo: true,
          isActive: true,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e0291389f69b393611aff87a6ac",
        },
        {
          id: 5,
          title: "Andai 'Ku Bukan Idola",
          playCount: "369,326",
          duration: "4:13",
          isSaved: false,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02d96453e606852f7868e15963",
        },
      ],
    },
  },
  {
    id: "7lXTU6VtJQWfiN2vuZyzqf",
    cover: {
      url: "https://image-cdn-fa.spotifycdn.com/image/ab67618600000194c9ea054ea26ca751d2f34938",
      dominantColor: "#353535FF",
    },
    name: "Anggis Devaki",
    monthlyListeners: 8320870,
    tracks: {
      metadata: {
        videoPreview: {
          present: true,
          thumbnailUrl: "https://i.scdn.co/image/ab67ba6900002ea6bf3a1e33527a83d13e486109",
        },
      },
      data: [
        {
          id: 1,
          title: "Dirimu Yang Dulu",
          playCount: "69,882,394",
          duration: "4:00",
          isSaved: true,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02d7105ffabf2ff9ddd265eab1",
        },
        {
          id: 2,
          title: "Kisah Tanpa Dirimu",
          playCount: "101,150,782",
          duration: "4:17",
          isSaved: true,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02d7105ffabf2ff9ddd265eab1",
        },
        {
          id: 3,
          title: "Percuma",
          playCount: "17,687,171",
          duration: "4:07",
          isSaved: false,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02d7105ffabf2ff9ddd265eab1",
        },
        {
          id: 4,
          title: "Jatuh Rapuh",
          playCount: "19,222,765",
          duration: "4:30",
          isSaved: false,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02d7105ffabf2ff9ddd265eab1",
        },
        {
          id: 5,
          title: "Bodoh",
          playCount: "12,545,101",
          duration: "4:08",
          isSaved: false,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02d7105ffabf2ff9ddd265eab1",
        },
      ],
    },
  },
  {
    id: "0kPb52ySN2k9P6wEZPTUzm",
    cover: {
      url: "https://image-cdn-ak.spotifycdn.com/image/ab6761860000eab10435ab4467a2874c2e868ea7",
      dominantColor: "#3A3434FF",
    },
    name: "Tiara Andini",
    monthlyListeners: 7625979,
    tracks: {
      metadata: {
        videoPreview: {
          present: true,
          thumbnailUrl: "https://canvaz.scdn.co/upload/licensor/7JGwF0zhX9oItt9901OvB5/video/b7c2df7748a4488ea394d30c6203b515.thmb.144x256.jpg",
        },
      },
      data: [
        {
          id: 1,
          title: "Janji Setia",
          playCount: "344,154,370",
          duration: "4:21",
          isSaved: false,
          isMusicVideo: true,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02937d621f0025409ee44285d1",
        },
        {
          id: 2,
          title: "Usai",
          playCount: "335,011,871",
          duration: "3:37",
          isSaved: false,
          isMusicVideo: true,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e023ea0e9844c8ce8016a0c5478",
        },
        {
          id: 3,
          title: "Tanpa Cinta",
          playCount: "68,031,247",
          duration: "4:15",
          isSaved: true,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02d1b4ab00a8b44b4405f884e0",
        },
        {
          id: 4,
          title: "Merasa Indah",
          playCount: "286,585,593",
          duration: "3:40",
          isSaved: false,
          isMusicVideo: true,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02937d621f0025409ee44285d1",
        },
        {
          id: 5,
          title: "Cintanya Aku",
          playCount: "238,257,604",
          duration: "3:54",
          isSaved: false,
          isMusicVideo: true,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02a9b7549ce65148ae47956489",
        },
      ],
    },
  },
  {
    id: "0jcgtGZTWxoepAUgADwcHP",
    cover: {
      url: "https://image-cdn-ak.spotifycdn.com/image/ab6761860000eab1e2c528890cd5432099d0aacb",
      dominantColor: "#2A373EFF",
    },
    name: "Sleman Receh",
    monthlyListeners: 1086397,
    tracks: {
      metadata: {
        videoPreview: {
          present: true,
          thumbnailUrl: "https://i.scdn.co/image/ab67ba6900002ea69c95c5fff85e1f0ce0c75bc6",
        },
      },
      data: [
        {
          id: 1,
          title: "Dongaku Nggo Kowe",
          playCount: "39,649,948",
          duration: "5:00",
          isSaved: false,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02274a22bc9fee19a287c441ef",
        },
        {
          id: 2,
          title: "Banyu Moto",
          playCount: "18,033,704",
          duration: "4:09",
          isSaved: true,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e020f94886d67ae4e92a92b2281",
        },
        {
          id: 3,
          title: "Ajur",
          playCount: "138,525",
          duration: "5:16",
          isSaved: false,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e028a4239e966b053f46a0bedb7",
        },
        {
          id: 4,
          title: "Lepat",
          playCount: "148,312",
          duration: "4:30",
          isSaved: false,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e029d5c6861e98f218a35f1c469",
        },
        {
          id: 5,
          title: "Kesandung Tresno",
          playCount: "3,606,325",
          duration: "4:57",
          isSaved: false,
          isMusicVideo: false,
          isActive: false,
          coverUrl: "https://i.scdn.co/image/ab67616d00001e02bbe4f609aa7482abe0cb2f8c",
        },
      ],
    },
  },
];

export const getArtistById = (id: string) => {
  return ARTISTS.find((artist) => artist.id === id) ?? null;
};
