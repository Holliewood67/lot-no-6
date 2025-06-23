type Artist = {
  name: string;
  imageUrl: string;
  bio: string;
  links?: Record<string, string>;
};

const artistList: Artist[] = [
  {
    name: "Sample Artist",
    imageUrl: "/artist-pics/test.png",
    bio: "This month at Lot No. 6, our walls feature the bold and expressive work of a local visual artist whose style blends emotion and texture with vibrant color. Their pieces bring fresh energy to the space — stop by and take a look.",
    links: {
      instagram: "https://instagram.com",
      spotify: "https://spotify.com",
    },
  },
];

export default artistList;
export type { Artist };
