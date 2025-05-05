import { HeroSection } from "@/components/hero-section"
import { FeaturedPlaygrounds } from "@/components/featured-playgrounds"
import { WeatherSuggestions } from "@/components/weather-suggestions"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import WeatherWidget from '@/components/WeatherWidget';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <WeatherSuggestions />
        <FeaturedPlaygrounds />
      </main>
      <SiteFooter />
    </div>
  )
}
