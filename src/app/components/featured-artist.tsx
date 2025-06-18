"use client";
import Image from "next/image";
import artistList, { Artist } from "../data/artist-list";

export default function FeaturedArtist() {
  const artist: Artist = artistList[0]; // use first artist in array
  const { name, imageUrl, bio, links } = artist;

  return (
    <section id="featured" className="w-full border-b-2 border-white py-12 px-4 bg-black text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Featured Artist</h2>

        <div className="flex flex-col items-center">
          <Image
            src={imageUrl}
            alt={`${name}'s photo`}
            width={300}
            height={300}
            className="rounded-xl object-cover shadow-lg mb-6"
          />

          <h3 className="text-3xl font-semibold mb-3">{name}</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">{bio}</p>

          {links && (
            <div className="flex flex-wrap gap-4 justify-center">
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
          )}
        </div>
      </div>
    </section>
  );
}
