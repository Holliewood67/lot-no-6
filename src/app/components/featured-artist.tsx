"use client";
import Image from "next/image";
import artistList, { Artist } from "../data/artist-list";

export default function FeaturedArtist() {
  const artist: Artist = artistList[0];
  const { name, imageUrl, bio, links } = artist;

  return (
    <section
      id="featured"
      className="w-full border-b-2 border-white py-12 px-4 bg-black text-white"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Featured Artist</h2>

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8">
          {/* Artist Image */}
          <Image
            src={imageUrl}
            alt={`${name}'s photo`}
            width={300}
            height={300}
            className="rounded-xl object-cover shadow-lg"
          />

          {/* Bio & Links Card */}
          <div className="w-full flex flex-col min-h-full justify-center md:h-full bg-black/60 border border-white/20 p-6 rounded-xl shadow-md">
            <div className="text-center md:text-left">
              <h3 className="text-4xl font-semibold mb-3">{name}</h3>
              <p className="text-gray-300 max-w-xl mb-4 text-base md:text-lg lg:text-2xl">{bio}</p>
              {links && (
                <>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {Object.entries(links).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-4 rounded-full capitalize transition-colors duration-200"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
