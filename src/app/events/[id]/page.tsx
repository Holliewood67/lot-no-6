import { notFound } from "next/navigation";
import Image from "next/image";
import { Antonio } from "next/font/google";
import { Metadata } from "next";

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '700'], 
});

type Event = {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime: string };
  htmlLink: string;
  attachments?: { fileUrl: string; title: string }[];
};

interface EventPageProps {
  params: Promise<{ id: string }>; 
}

// Fix Google Drive URLs for direct image embedding
const googleDriveFix = (url: string) => {
  const match = url.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{10,})/);
  return match
    ? `https://drive.google.com/uc?export=view&id=${match[1]}`
    : url;
};

async function fetchEventById(id: string): Promise<Event | undefined> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events`, {
    next: { revalidate: 60 },
  });
  const events: Event[] = await res.json();
  return events.find((e) => e.id === id);
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

  const flyerAttachment = event.attachments?.find((att) =>
    att.title?.toLowerCase().includes("full")
  ) ?? event.attachments?.[0];

  const imageUrl = flyerAttachment ? googleDriveFix(flyerAttachment.fileUrl) : null;

  return {
    title: `${event.summary} | Lot No. 6`,
    description: event.description || "Live events and community at Lot No. 6.",
    openGraph: {
      title: `${event.summary} | Lot No. 6`,
      description: event.description || "Live events and community at Lot No. 6.",
      url: `https://www.lotno6.com/events/${event.id}`,
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

  const flyerAttachment = event.attachments?.find((att) =>
    att.title?.toLowerCase().includes("full")
  ) ?? event.attachments?.[0];

  const imageUrl = flyerAttachment ? googleDriveFix(flyerAttachment.fileUrl) : "/lot-6.png";

  return (
    <section className="w-full py-12 px-4 text-white max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Flyer Image */}
        <div className="w-full md:w-1/2">
          <div className="w-full rounded-xl overflow-hidden shadow-lg border-2 border-white">
            <Image
              src={imageUrl}
              alt={`${event.summary} flyer`}
              width={800}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Event Details */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{event.summary}</h1>

          <p className={`${antonio.className} text-gray-300 mb-2`}>
            {new Date(event.start.dateTime).toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
              timeZone: "America/Chicago",
            })}
          </p>

          {event.description && (
            <p className={`${antonio.className} text-gray-200 mb-4 whitespace-pre-line`}>
              {event.description}
            </p>
          )}

          <a
            href={event.htmlLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${antonio.className} inline-block w-fit py-2 px-4 bg-white text-black rounded hover:bg-gray-300 transition`}
          >
            View on Google Calendar
          </a>
        </div>
      </div>
    </section>
  );
}
