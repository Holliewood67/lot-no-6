import EventCard from "../components/event-card";
import { client } from "@/sanity/client";
import { SanityEvent } from "@/types/sanity";

const EVENTS_QUERY = `*[_type == "event" && dateTime(start) >= dateTime(now())]{
  _id,
  title,
  start,
  presenter,
  image,
  description
}|order(start asc)`;

const options = { next: { revalidate: 30} };

export default async function EventsPage() {
  const events = await client.fetch<SanityEvent[]>(EVENTS_QUERY, {}, options);

  return (
    <section id="events" className="flex flex-col justify-center text-center items-center py-4 border-b-2 max-w-7xl mx-auto">
      <h1 className="text-4xl pb-4">UPCOMING EVENTS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6 p-4">
        {/* Iterates through upcoming events and displays event cards based on retrieved info */}
          {events.map((event) => (
            <div key={event._id}>
              <EventCard event={event} />
            </div>
          ))}
      </div>      
    </section>
  )
}