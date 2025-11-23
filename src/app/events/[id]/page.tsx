import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Antonio } from "next/font/google";
import { Metadata } from "next";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { SanityEvent } from "@/types/sanity";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {  // Fixed: replaced 'any' with SanityImageSource
  return builder.image(source);
}

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '700'], 
});

interface EventPageProps {
  params: Promise<{ id: string }>; 
}

const EVENT_QUERY = `*[_type == "event" && _id == $id][0]{
  _id,
  title,
  start,
  presenter,
  image,
  description
}`;

async function fetchEventById(id: string): Promise<SanityEvent | null> {
  return await client.fetch(EVENT_QUERY, { id }, { next: { revalidate: 60 } });
}

export async function generateMetadata(
  { params }: EventPageProps,
): Promise<Metadata> {
  const resolvedParams = await params;
  const event = await fetchEventById(resolvedParams.id);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "No event found with this ID.",
    };
  }

  const imageUrl = event.image 
    ? urlFor(event.image).width(800).height(600).url() 
    : null;

  return {
    title: `${event.title} | Lot No. 6`,
    description: event.description?.[0]?.children?.[0]?.text || "Live events and community at Lot No. 6.",
    openGraph: {
      title: `${event.title} | Lot No. 6`,
      description: event.description?.[0]?.children?.[0]?.text || "Live events and community at Lot No. 6.",
      url: `https://www.lotno6.com/events/${event._id}`,
      siteName: "Lot No. 6",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 800,
              height: 600,
            },
          ]
        : [],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const resolvedParams = await params;
  const event = await fetchEventById(resolvedParams.id);

  if (!event) return notFound();

  const imageUrl = event.image 
    ? urlFor(event.image).width(800).height(800).url() 
    : "/lot-6.png";

  return (
    <section className="w-full py-12 px-4 text-white max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Event Image */}
        <div className="w-full md:w-1/2">
          <div className="w-full rounded-xl overflow-hidden shadow-lg border-2 border-white">
            <Image
              src={imageUrl}
              alt={`${event.title} image`}
              width={800}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Event Details */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          {event.presenter && (
            <p className={`${antonio.className} text-gray-300 mb-2 italic`}>
              Presented by {event.presenter}
            </p>
          )}
          <p className={`${antonio.className} text-gray-300 mb-4`} suppressHydrationWarning>
            {new Date(event.start).toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
              timeZone: "America/Chicago",
            })}
          </p>
          {event.description && (
            <div className={`${antonio.className} text-gray-200 mb-6`}>
              <PortableText value={event.description} />
            </div>
          )}
          <Link
            href="/events"
            className={`${antonio.className} inline-block w-fit py-2 px-6 bg-white text-black rounded-xl hover:bg-gray-300 transition`}
          >
            ← Back to Events
          </Link>
        </div>
      </div>
    </section>
  );
}