type Artist = {
  name: string;
  imageUrl: string;
  bio: string;
  links?: Record<string, string>;
};

const artistList: Artist[] = [
  {
    name: "Mr. Test",
    imageUrl: "/artist-pics/test.png",
    bio: "Mr. Test is a Tulsa-based folk artist whose introspective lyrics and stripped-down style make him a standout performer. Catch him live at Lot No. 6 this month!",
    links: {
      instagram: "https://instagram.com",
      spotify: "https://spotify.com",
    },
  },
];

export default artistList;
export type { Artist };
