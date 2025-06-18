"use client"

import { useEffect, useState } from "react"
import EventCard from "./event-card";

type Event = {
    id: string,
    htmlLink: string,
    summary: string,
    description?: string,
    start: { dateTime: string},
    end: { dateTime: string},
    attachment?: { fileUrl: string; title: string}[];
}


export default function Events() {
    const [events, setevents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await fetch('api/events');
            const data = await res.json();
            setevents(data);
        }

        fetchEvents();
    }, [])

    return(
        <section id="events" className="flex flex-col justify-center text-center items-center py-4 border-b-2">
            <h1 className="text-4xl pb-4">EVENTS</h1>
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {/* Iterates through array of events and displays event card for each event found */}
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </section>
    )
}