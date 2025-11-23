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
  // Filter to only featured artists that are active now
  const activeArtists = artists.filter((artist) => {
    const now = new Date();
    const start = new Date(artist.startDate);
    const end = new Date(artist.endDate);
    return start <= now && now <= end;
  });

  // Don't render anything if no active artists
  if (activeArtists.length === 0) {
    return null;
  }

  return (
    <section
      id="featured"
      className="w-full border-b-2 border-white py-12 px-4 bg-black text-white"
    >
      {activeArtists.map((artist) => {
        // Generate image URL with error handling
        let imageUrl = "/lot-6.png"; // Default fallback
        if (artist.image) {
          try {
            imageUrl = urlFor(artist.image).width(400).height(400).url();
          } catch (error) {
            console.error('Error generating artist image URL:', error);
          }
        }

        return (
          <div key={artist._id} className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Featured Artist</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Artist Image */}
              <div className="flex-shrink-0">
                <Image
                  src={imageUrl}
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
                    {artist.bio && <PortableText value={artist.bio} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}