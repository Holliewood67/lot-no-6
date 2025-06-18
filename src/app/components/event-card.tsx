import Image from "next/image";
import Link from "next/link";

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
  const match = url.match(/id=([^&]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
};



export default function EventCard( { event } : {event: Event}) {

   const startDate = new Date(event.start.dateTime).toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
  });  


  const imageUrlCropped =
    event.attachments && event.attachments.length > 0
    ? (() => {
        const index = event.attachments.findIndex(
          (att) => att.title && att.title.toLowerCase().includes("cropped")
        );
        return index !== -1
          ? googleDriveFix(event.attachments[index].fileUrl)
          : null;
      })()
    : "/logo.png";

    const imgAlt = 
    event.attachments && event.attachments.length > 0
      ? event.attachments![0].title : "Musical Monsters";

    const shortDescription = event.description
    ? event.description.replace(/<[^>]+>/g, "").slice(0, 100) + "..."
    : null;

    return(
      <div className="bg-white border-2 border-white rounded-xl shadow-md overflow-hidden flex flex-col">
        {imageUrlCropped && (
          <Image
            src={imageUrlCropped}
            alt={imgAlt}
            width={600}
            height={600}
            className="w-full max-h-64 object-cover bg-black"
          />
        )}

        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-black mb-1">
            {event.summary}
          </h2>
          <p className="text-sm text-black mb-1">{startDate}</p>
          {event.location && (
            <p className="text-black mb-2">{event.location}</p>
          )}

          {shortDescription && (
            <p className="text-black text-sm mb-2 flex-grow">
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