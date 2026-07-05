import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedDishes from "@/components/FeaturedDishes";
import ArtisticStory from "@/components/ArtisticStory";
import Gallery from "@/components/Gallery";
import CuratedActs from "@/components/CuratedActs";
import Reservation from "@/components/Reservation";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 lg:pb-0">
        <Hero />
        <FeaturedDishes />
        <ArtisticStory />
        <Gallery />
        <CuratedActs />
        <Reservation />
        <Testimonials />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
