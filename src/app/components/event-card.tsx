import Image from "next/image";
import Link from "next/link";
import { Antonio } from "next/font/google";

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '700'], 
})


type Event = {
    id: string,
    htmlLink: string,
    summary: string,
    description?: string,
    location?: string,
    start: { dateTime: string},
    end: { dateTime: string},
    attachments?: { fileUrl: string; title: string}[];
}

const googleDriveFix = (url: string) => {
  const match = url.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{10,})/);
  return match
    ? `https://drive.google.com/uc?export=view&id=${match[1]}`
    : url;
};

export default function EventCard( { event } : {event: Event}) {

  const summaryParts = event.summary.split("-")
  const title = summaryParts[0];
  const presenter = summaryParts.length > 1 ? summaryParts[1] : null;

  const startDate = new Date(event.start.dateTime).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });  


const imageUrlCropped =
  event.attachments && event.attachments.length > 0
    ? (() => {
        const croppedIndex = event.attachments.findIndex(
          (att) => att.title && att.title.toLowerCase().includes("cropped")
        );
        if (croppedIndex !== -1) {
          return googleDriveFix(event.attachments[croppedIndex].fileUrl);
        } else {
          // Fallback to first image if no cropped image is found
          return googleDriveFix(event.attachments[0].fileUrl);
        }
      })()
    : "/lot-6.png";
    
    const imgAlt = 
    event.attachments && event.attachments.length > 0
      ? event.attachments![0].title : "Musical Monsters";

    const shortDescription = event.description
    ? event.description.replace(/<[^>]+>/g, "").slice(0, 100) + "..."
    : null;

    return(
      <div className="bg-white border-2 border-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
        {imageUrlCropped && (
          <Image
            src={imageUrlCropped}
            alt={imgAlt}
            width={600}
            height={600}
            className="w-full max-h-64 object-cover bg-black"
          />
        )}

        <div className={`${antonio.className} p-4 flex flex-col flex-grow`}>
          <h2 className="text-xl md:text-2xl font-bold text-black mb-0">
            {title}
          </h2>
          {presenter && (
            <p className="text-md italic text-gray-600 mb-2">Presented by {presenter}</p>
          )}
          <p className="text-md text-black mb-1">{startDate}</p>
          {shortDescription && (
            <p className="text-black text-lg mb-2 flex-grow">
              {shortDescription}
            </p>
          )}

          <Link
            href={`/events/${event.id}`} // <- Update this to your actual blog route later
            className="mt-auto text-white text-sm font-semibold hover:underline rounded-xl bg-black mx-auto py-1 px-4"
          >
            Read more →
          </Link>
        </div>
      </div>
    )
}