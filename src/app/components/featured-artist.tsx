import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from "next-sanity";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface FeaturedArtistProps {
  artists: SanityDocument[];
}

export default function FeaturedArtist({ artists }: FeaturedArtistProps) {
  return (
    <section
      id="featured"
      className="w-full border-b-2 border-white py-12 px-4 bg-black text-white"
    >
      {artists
        .filter((artist) => {
          const now = new Date();
          const start = new Date(artist.startDate);
          const end = new Date(artist.endDate);
          return start <= now && now <= end;
        })
        .map((artist) => (
          <div key={artist._id} className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Featured Artist</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Artist Image */}
              <div className="flex-shrink-0">
                <Image
                  src={urlFor(artist.image).width(400).height(400).url()}
                  alt={`${artist.name}'s photo`}
                  width={400}
                  height={400}
                  className="rounded-xl object-cover shadow-lg"
                />
              </div>
              {/* Bio & Links Card */}
              <div className="flex-1 flex flex-col justify-center bg-black/60 border border-white/20 p-6 rounded-xl shadow-md">
                <div className="text-center md:text-left">
                  <h3 className="text-4xl font-semibold mb-3">{artist.name}</h3>
                  <div className="text-gray-300 mb-4 text-base md:text-lg">
                    <PortableText value={artist.bio} />
                  </div>
                  {artist.links && (
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      {/* Add your links mapping here */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}