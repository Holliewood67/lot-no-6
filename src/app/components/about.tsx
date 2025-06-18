"use client";
import React from "react";

export default function About() {
  return (
    <section className="w-full border-b-2 border-white py-12 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Google Maps Embed */}
          <div className="w-full lg:w-2/3 h-80 lg:h-96">
                <iframe
                title="Lot No. 6 Location"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&q=Lot+No.+6,+Tulsa,+OK`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl shadow-lg"
                />
          </div>

          {/* Hours */}
          <div className="w-full lg:w-1/3 text-center lg:text-left flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">Hours</h3>
            <ul className="text-gray-300 space-y-2">
              <li><strong>Monday:</strong> Closed</li>
              <li><strong>Tuesday:</strong> 6 PM – 2 AM</li>
              <li><strong>Wednesday:</strong> 6 PM – 2 AM</li>
              <li><strong>Thursday:</strong> 6 PM – 2 AM</li>
              <li><strong>Friday:</strong> 6 PM – 2 AM</li>
              <li><strong>Saturday:</strong> 6 PM – 2 AM</li>
              <li><strong>Sunday:</strong> Closed</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
