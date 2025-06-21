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
    bio: "Mr. Test is a a Tulsa-based artist who doesn't actually exist, but is rather a placeholder just to show how a real bio would look here along with some kind of image. What do you think?",
    links: {
      instagram: "https://instagram.com",
      spotify: "https://spotify.com",
    },
  },
];

export default artistList;
export type { Artist };
