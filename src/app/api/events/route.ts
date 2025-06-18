import { json } from "stream/consumers";

export async function GET() {
    const calendarID = process.env.NEXT_PUBLIC_CALENDAR_ID;
    const apiKey = process.env.NEXT_PUBLIC_CALENDAR_API_KEY;

    if(!calendarID || !apiKey) {
    return new Response(
        JSON.stringify({error: "Missing Calendar ID or API Key in env"}),
        { status: 500 }
    );
    };

    const timeMin = new Date().toISOString();

    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?key=${apiKey}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime&showDeleted=false`
    console.log("Fetching from Google Calendar:", url);

    try {
        const res = await fetch(url, { cache: "no-store" });

        if(!res.ok) {
            return new Response(
                JSON.stringify({error: `Google API Error: ${res.status}`}),
                { status: res.status }
            );
        }
        const data = await res.json();
        return new Response(JSON.stringify(data.items), {
            headers: { 
                "Content-Type": "application/json",
                //Prevent deployed site from caching first calendar resposne
                "Cache-Control": "no-store", 
            },
            status: 200,
        });
    } catch (err) {
        console.error("Calendar Fetch Error:", err);
        return new Response(
        JSON.stringify({ error: "Server error fetching calendar events" }),
        { status: 500 }
    );
     }
} 