export default function Hero() {
    return(
        <section className="h-screen w-full flex flex-col items-center justify-center text-center px-4 py-12 border-b-2">
            <h1 className="text-3xl md:text-4xl">Welcome to Lot No. 6</h1>
            <p className="text-lg md:text 2xl md:max-w-xl lg:max-w-3xl py-6">Tulsa's favorite stop for art, karaoke, live music, ^ more, located in the heart of the Pearl District</p>
            <a href="/events" className="py-2 px-4 bg-gray-600/25 rounded-lg">See What's Happening</a>
        </section>
    )
}
