import Image from "next/image";
import Link from "next/link";
import { Antonio } from "next/font/google";
import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { SanityEvent } from "@/types/sanity";
import { PortableTextBlock } from '@portabletext/types';

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {  // Fixed: replaced 'any' with SanityImageSource
  return builder.image(source);
}

interface EventProps {
  event: SanityEvent;
}

function getTruncatedDescription(portableText: PortableTextBlock[] | undefined, maxLength: number = 50): string {  // Fixed: replaced 'any' with proper type
  if (!portableText || !Array.isArray(portableText)) return '';
  
  let text = '';
  for (const block of portableText) {
    if (block._type === 'block' && 'children' in block) {
      for (const child of block.children) {
        if ('text' in child && child.text) {
          text += child.text + ' ';
        }
      }
    }
  }
  
  text = text.trim();
  
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  
  return text;
}

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '700'], 
})

export default function EventCard({ event }: EventProps) {
  // Only try to generate URL if image exists
  let imageUrl = null;
  if (event.image) {
    try {
      imageUrl = urlFor(event.image).width(600).height(600).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
    }
  }
  
  return (
    <div className="bg-white border-2 border-white rounded-xl shadow-md overflow-hidden flex flex-col xl:flex-row h-full">
      {/* Only render Image if valid URL */}
      <div className="xl:w-100 xl:flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.title || "Event image"}
            width={600}
            height={600}
            className="w-full max-h-64 object-cover bg-black"
          />
        ) : (
          <Image
            src="/lot-6.jpg"
            alt={event.title || "Event image"}
            width={600}
            height={600}
            className="w-full max-h-64 object-cover bg-black"
          />
        )}
      </div>
      <div className={`${antonio.className} p-4 flex flex-col flex-grow`}>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-0">
          {event.title}
        </h2>
        {event.presenter && (
          <p className="text-md italic text-gray-600 mb-2">
            Presented by {event.presenter}
          </p>
        )}
        <p className="text-md text-black mb-1">
          {new Date(event.start).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <div className="text-black text-lg mb-2 flex-grow xl:hidden">
          {getTruncatedDescription(event.description, 150)}
        </div>
        <div className="text-black text-lg mb-2 flex-grow hidden xl:block">
          {getTruncatedDescription(event.description, 300)}
        </div>
        <Link
          href={`/events/${event._id}`}
          className="mt-auto text-white text-sm font-semibold hover:underline rounded-xl bg-black mx-auto py-1 px-4"
        >
          See More →
        </Link>
      </div>
    </div>
  )
}