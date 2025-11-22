import Hero from "./components/hero";
import Events from "./components/events";
import FeaturedArtist from "./components/featured-artist";
import About from "./components/about";
import Contact from "./components/contact";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const ARISTS_QUERY = `*[_type == "artist"]|order(name, desc)`;
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
  const artists = await client.fetch<SanityDocument[]>(ARISTS_QUERY, {}, options);
  const events = await client.fetch<SanityDocument[]>(EVENTS_QUERY, {}, options);

    console.log('Events from Sanity:', JSON.stringify(events, null, 2));
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
