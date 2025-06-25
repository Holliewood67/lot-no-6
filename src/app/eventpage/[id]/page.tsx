import { notFound } from "next/navigation";
import Image from "next/image";
import { Antonio } from "next/font/google";
import { h1 } from "framer-motion/client";

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '700'], 
});

 type Props = {
  params: { eventid: string };
};

type Event = {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime: string };
  htmlLink: string;
  attachments?: { fileUrl: string; title: string }[];
};


// Fix Google Drive URLs for direct image embedding
const googleDriveFix = (url: string) => {
  const match = url.match(/id=([^&]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
};

export default async function EventPage({ params }: Props) {
  const calendarID = process.env.NEXT_PUBLIC_CALENDAR_ID;
  const apiKey = process.env.NEXT_PUBLIC_CALENDAR_API_KEY;

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${params.eventid}?key=${apiKey}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
if (!res.ok) {
    return (
      <h1>Things are not okay.</h1>
    )
  // notFound();  // This will trigger Next.js 404 page
}  }

  const event: Event = await res.json();

  const startDate = new Date(event.start.dateTime).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const imageUrlFull =
    event.attachments && event.attachments.length > 0
    ? (() => {
        const index = event.attachments.findIndex(
          // Check to see if the image filename contains the word full, if none present, revert to default mm2 image
          (att) => att.title && att.title.toLowerCase().includes("full")
        );
        return index !== -1
          ? googleDriveFix(event.attachments[index].fileUrl)
          : "/lot-6.png";
      })()
    : "/lot-6.png";

  const imgAlt = 
    event.attachments && event.attachments.length > 0
    ? event.attachments![0].title : "Musical Monsters";
  return (
    <section className="w-full py-12 px-4 text-white max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Flyer Image */}
        <div className="w-full md:w-1/2">
          <div className="w-full rounded-xl overflow-hidden shadow-lg border-2 border-white">
            <Image
              src={imageUrlFull}
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
