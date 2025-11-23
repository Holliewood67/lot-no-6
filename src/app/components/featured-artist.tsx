import Image from "next/image";
import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableText } from "next-sanity";
import { SanityArtist } from "@/types/sanity";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface FeaturedArtistProps {
  artists: SanityArtist[];
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
                {artist.image ? (
                  <Image
                    src={urlFor(artist.image).width(400).height(400).url()}
                    alt={`${artist.name}'s photo`}
                    width={400}
                    height={400}
                    className="rounded-xl object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-[400px] h-[400px] bg-gray-800 rounded-xl flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>
              {/* Bio & Links Card */}
              <div className="flex-1 flex flex-col justify-center bg-black/60 border border-white/20 p-6 rounded-xl shadow-md">
                <div className="text-center md:text-left">
                  <h3 className="text-4xl font-semibold mb-3">{artist.name}</h3>
                  <div className="text-gray-300 mb-4 text-base md:text-lg">
                    {artist.bio && <PortableText value={artist.bio} />}
                  </div>
                  {/* {artist.links && (
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    </div>
                  )} */}
                  
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}