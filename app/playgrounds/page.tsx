"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Filter, MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { mockPlaygrounds } from "@/lib/mock-data"

export default function PlaygroundsPage() {
  const searchParams = useSearchParams()
  const initialLocation = searchParams.get("location") || ""
  const initialSport = searchParams.get("sport") || ""

  const [location, setLocation] = useState(initialLocation)
  const [sport, setSport] = useState(initialSport)
  const [playgrounds, setPlaygrounds] = useState(mockPlaygrounds)
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState(mockPlaygrounds)

  useEffect(() => {
    let filtered = [...playgrounds]

    if (location) {
      filtered = filtered.filter((pg) => pg.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (sport && sport !== "all") {
      filtered = filtered.filter((pg) => pg.sports.some((s) => s.toLowerCase() === sport.toLowerCase()))
    }

    setFilteredPlaygrounds(filtered)
  }, [location, sport, playgrounds])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-muted/50 py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Playgrounds</h1>
                <p className="text-muted-foreground">Find and book your perfect sports playground</p>
              </div>
              <div className="flex gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter Playgrounds</SheetTitle>
                      <SheetDescription>Narrow down your search with these filters</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                          placeholder="Enter location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sport</label>
                        <Select value={sport} onValueChange={setSport}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sport" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Sports</SelectItem>
                            <SelectItem value="football">Football</SelectItem>
                            <SelectItem value="cricket">Cricket</SelectItem>
                            <SelectItem value="basketball">Basketball</SelectItem>
                            <SelectItem value="tennis">Tennis</SelectItem>
                            <SelectItem value="badminton">Badminton</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        className="mt-4"
                        onClick={() => {
                          setLocation("")
                          setSport("")
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="flex-1">
                <Input
                  placeholder="Search by location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-48">
                <Select value={sport} onValueChange={setSport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sports</SelectItem>
                    <SelectItem value="football">Football</SelectItem>
                    <SelectItem value="cricket">Cricket</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="tennis">Tennis</SelectItem>
                    <SelectItem value="badminton">Badminton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <div className="mb-6">
              <h2 className="text-lg font-medium">
                {filteredPlaygrounds.length} {filteredPlaygrounds.length === 1 ? "playground" : "playgrounds"} found
              </h2>
            </div>

            {filteredPlaygrounds.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No playgrounds found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria</p>
                <Button
                  onClick={() => {
                    setLocation("")
                    setSport("")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaygrounds.map((playground, index) => (
                  <motion.div
                    key={playground.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 w-full">
                        <Image
                          src={playground.image || "/placeholder.svg?height=400&width=600"}
                          alt={playground.name}
                          fill
                          className="object-cover"
                        />
                        {playground.featured && <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>}
                      </div>
                      <CardContent className="p-6 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-xl">{playground.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{playground.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{playground.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {playground.sports.map((sport) => (
                            <Badge key={sport} variant="outline">
                              {sport}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {playground.description.substring(0, 100)}...
                        </p>
                        <div className="font-bold text-lg">
                          ₹{playground.pricePerHour}{" "}
                          <span className="text-sm font-normal text-muted-foreground">per hour</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Link href={`/playgrounds/${playground.id}`} className="w-full">
                          <Button className="w-full">Book Now</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
