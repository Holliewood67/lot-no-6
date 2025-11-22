"use client"

import EventCard from "./event-card"
import { AnimatePresence, motion } from "framer-motion"

import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface EventProps {
  events: SanityDocument[];
}

export default function Events({ events }: EventProps) {
  console.log('Event IDs:', events.map(e => e._id));
  return (
    <section id="events" className="flex flex-col justify-center text-center items-center py-4 border-b-2">
      <h1 className="text-4xl pb-4">EVENTS</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        {/* Iterates through upcoming events and displays event cards based on retrieved info */}
        <AnimatePresence initial={false} >
          {events.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, height: 0}}
              animate={{opacity: 1, height: "auto"}}
              exit={{opacity: 0, height: 0}}
              transition={{ duration: 0.4, ease: "easeOut" }}
              layout>
              <EventCard event={event} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      
        <button
          className="mt-6 px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
        >
          Show More
        </button>
      
    </section>
  )
}
