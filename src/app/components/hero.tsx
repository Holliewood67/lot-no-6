import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return(
        <section className="relative h-screen w-full border-b-2">
            {/* Background Iamge */}
            <div className="absolute inset-0">
                <Image
                    src="/lot-6-hero.png"
                    alt="Lot No. 6 venue with a crowd"
                    fill
                    priority
                    className="object-cover object-center"
                    />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10 ">
            {/* Text Content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 text-white">
                    <div className="bg-black/50 backdrop-blur-xs p-6 rounded-lg shadow-lg max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Welcome to Lot No. 6</h1>
                        <p className="my-6 text-lg md:text 2xl max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Tulsa&apos;s favorite stop for art, karaoke, live music, & more, located in the heart of the Pearl District</p>
                        <Link href="/#events" className="py-2 px-4 bg-gray-600/50 rounded-lg">See What&apos;s Happening</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
