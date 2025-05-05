"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockPlaygrounds } from "@/lib/mock-data"

export function FeaturedPlaygrounds() {
  const [playgrounds, setPlaygrounds] = useState(mockPlaygrounds.slice(0, 6))

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Playgrounds</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover top-rated sports facilities in your area. Book your next game at one of these popular venues.
            </p>
          </div>
          <Link href="/playgrounds">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Playgrounds
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playgrounds.map((playground, index) => (
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
                  <p className="text-sm text-muted-foreground mb-4">{playground.description.substring(0, 100)}...</p>
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
      </div>
    </section>
  )
}
