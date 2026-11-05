import Banner from "@/components/home/banner";
import Values from "@/components/home/values";
import Features from "@/components/home/features";
import Subscribe from "@/components/home/subscribe";
import UpcomingEvents from "@/components/home/upcoming-event";
import CommunityAction from "@/components/home/community-action";
import WelcomePopup from "@/components/home/welcome-popup";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <WelcomePopup />
      <main className="flex-1">
        <Banner />
        <Values />
        <Features />
        <UpcomingEvents />
        <CommunityAction />
        <Subscribe />
      </main>
    </div>
  );
}
