import Hero from "./components/hero";
import Events from "./components/events";
import FeaturedArtist from "./components/featured-artist";
import About from "./components/about";
import Contact from "./components/contact";
import { client } from "@/sanity/client";
import { SanityArtist, SanityEvent } from "@/types/sanity";

const ARTISTS_QUERY = `*[_type == "artist"]|order(name desc)`;  // Fixed typo: ARISTS -> ARTISTS

const EVENTS_QUERY = `*[_type == "event"]{
  _id,
  title,
  start,
  presenter,
  image,
  description
}|order(start desc)`;

const options = { next: { revalidate: 30} };

export default async function Home() {
  const artists = await client.fetch<SanityArtist[]>(ARTISTS_QUERY, {}, options);  // Fixed: use SanityArtist[] instead of SanityDocument[]
  const events = await client.fetch<SanityEvent[]>(EVENTS_QUERY, {}, options);  // Fixed: use SanityEvent[] instead of SanityDocument[]
    
  return (
    <div className="grid justify-items-center bg-black text-white">
      <Hero />
      <Events events={events.slice(0, 3)} />
      <FeaturedArtist artists={artists}/>
      <About />
      <Contact />
    </div>
  );
}