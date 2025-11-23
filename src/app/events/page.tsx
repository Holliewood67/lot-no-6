import EventCard from "../components/event-card";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import Link from "next/link";

const EVENTS_QUERY = `*[_type == "event"]{
  _id,
  title,
  start,
  presenter,
  image,
  description
}|order(start desc)`;
const options = { next: { revalidate: 30} };


const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}


export default async function EventsPage() {

  const events = await client.fetch<SanityDocument[]>(EVENTS_QUERY, {}, options);

  return (
    <section id="events" className="flex flex-col justify-center text-center items-center py-4 border-b-2">
      <h1 className="text-4xl pb-4">EVENTS</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6 p-4">
        {/* Iterates through upcoming events and displays event cards based on retrieved info */}
          {events.map((event) => (
            <div key={event._id}>
              <EventCard event={event} />
            </div>
          ))}
      </div>

      
        <Link
          href={"/events"}
          className="mt-6 px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
        >
          Show More
        </Link>
      
    </section>
  )
}
