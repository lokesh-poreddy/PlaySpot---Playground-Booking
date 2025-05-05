"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-provider"
import { getWeatherData, getWeatherRecommendations, type WeatherData } from "@/lib/weather-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  unknown: Sun,
}

export function WeatherSuggestions() {
  const { user } = useAuth()
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState("Chennai")

  useEffect(() => {
    if (!user) return

    const fetchWeather = async () => {
      setIsLoading(true)
      try {
        const data = await getWeatherData(location)
        setWeatherData(data)
      } catch (error) {
        console.error("Failed to fetch weather:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
  }, [user, location])

  if (!user) return null

  if (isLoading) {
    return (
      <section className="py-12 bg-muted/50">
        <div className="container">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-72" />
                </div>
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-28" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  if (!weatherData) return null

  const weatherType = weatherData.weatherType
  const WeatherIcon = weatherIcons[weatherType]

  // Get AI-like recommendations
  const { bestTimeToPlay, recommendation, sportsRecommendation } = getWeatherRecommendations(weatherData)

  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="current">
                <TabsList className="mb-4">
                  <TabsTrigger value="current">Current Weather</TabsTrigger>
                  <TabsTrigger value="forecast">Forecast</TabsTrigger>
                  <TabsTrigger value="recommendation">AI Recommendation</TabsTrigger>
                </TabsList>

                <TabsContent value="current">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <WeatherIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Hello, {user.name || "there"}!</h3>
                      <p className="text-muted-foreground">
                        It's currently {Math.round(weatherData.temperature)}°C in {weatherData.location} with{" "}
                        {weatherData.description}.
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Droplets className="h-4 w-4 mr-1" />
                          <span>{weatherData.humidity}% humidity</span>
                        </div>
                        <div className="flex items-center">
                          <Wind className="h-4 w-4 mr-1" />
                          <span>{weatherData.windSpeed} m/s wind</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recommended Sports:</h4>
                      <div className="flex flex-wrap gap-2">
                        {sportsRecommendation.map((sport) => (
                          <div key={sport} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                            {sport}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="forecast">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Weather Forecast for {weatherData.location}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {weatherData.forecast.map((item, index) => {
                        const date = new Date(item.dateTime)
                        const ForecastIcon = weatherIcons[item.weatherType]
                        return (
                          <Card key={index} className="overflow-hidden">
                            <CardContent className="p-3">
                              <div className="text-center">
                                <p className="font-medium">{date.toLocaleDateString([], { weekday: "short" })}</p>
                                <p className="text-xs text-muted-foreground">
                                  {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>
                                <div className="flex justify-center my-2">
                                  <ForecastIcon className="h-6 w-6 text-primary" />
                                </div>
                                <p className="text-lg font-bold">{Math.round(item.temperature)}°C</p>
                                <p className="text-xs text-muted-foreground capitalize">{item.description}</p>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="recommendation">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <WeatherIcon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">AI Sports Recommendation</h3>
                        <div className="space-y-2">
                          <p className="text-muted-foreground">
                            <span className="font-medium">Best time to play:</span> {bestTimeToPlay}
                          </p>
                          <p className="text-muted-foreground">{recommendation}</p>
                          <div className="pt-2">
                            <h4 className="font-medium mb-2">Recommended Activities:</h4>
                            <div className="flex flex-wrap gap-2">
                              {sportsRecommendation.map((sport) => (
                                <div key={sport} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                                  {sport}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
