import Hero from "./components/hero";
import Events from "./components/events";
import FeaturedArtist from "./components/featured-artist";
import About from "./components/about";
import Contact from "./components/contact";

export default function Home() {
  return (
    <div className="grid justify-items-center bg-black text-white">
      <Hero />
      <Events />
      <FeaturedArtist />
      <About />
      <Contact />
    </div>
  );
}
