"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useAuth } from "@/lib/auth-provider"
import { mockBookings } from "@/lib/mock-data"
import type { Booking } from "@/lib/mock-data"

export default function BookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchBookings = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Filter bookings for the current user
        const userBookings = user ? mockBookings.filter((booking) => booking.userId === user.id) : []
        setBookings(userBookings)
      } catch (error) {
        console.error("Error fetching bookings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [user])

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <h1 className="text-2xl font-bold mb-4">Login Required</h1>
            <p className="text-muted-foreground mb-6">Please log in to view your bookings</p>
            <Link href="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const upcomingBookings = bookings.filter((booking) => booking.status === "confirmed")
  const pastBookings = bookings.filter((booking) => booking.status === "completed" || booking.status === "cancelled")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">
                Upcoming
                {upcomingBookings.length > 0 && (
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {upcomingBookings.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {isLoading ? (
                <div className="text-center py-12">
                  <p>Loading your bookings...</p>
                </div>
              ) : upcomingBookings.length === 0 ? (
                <div className="text-center py-12 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">No upcoming bookings</h3>
                  <p className="text-muted-foreground mb-6">You don't have any upcoming bookings yet</p>
                  <Link href="/playgrounds">
                    <Button>Find Playgrounds</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6">
                  {upcomingBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold mb-2">{booking.playgroundName}</h3>
                              <div className="space-y-2">
                                <div className="flex items-center text-muted-foreground">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>{formatDate(booking.date)}</span>
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>
                                    {booking.startTime} - {booking.endTime}
                                  </span>
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span>Location details will be available here</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center md:text-right">
                              <div className="text-sm text-muted-foreground mb-1">Total Price</div>
                              <div className="text-2xl font-bold">₹{booking.totalPrice}</div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between p-6 pt-0 border-t mt-6">
                          <Button variant="outline">Cancel Booking</Button>
                          <Link href={`/playgrounds/${booking.playgroundId}`}>
                            <Button variant="secondary">View Playground</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {isLoading ? (
                <div className="text-center py-12">
                  <p>Loading your bookings...</p>
                </div>
              ) : pastBookings.length === 0 ? (
                <div className="text-center py-12 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">No past bookings</h3>
                  <p className="text-muted-foreground mb-6">You don't have any past bookings</p>
                  <Link href="/playgrounds">
                    <Button>Find Playgrounds</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6">
                  {pastBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="opacity-80">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center mb-2">
                                <h3 className="text-xl font-bold">{booking.playgroundName}</h3>
                                <span className="ml-3 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                  {booking.status}
                                </span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center text-muted-foreground">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>{formatDate(booking.date)}</span>
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>
                                    {booking.startTime} - {booking.endTime}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center md:text-right">
                              <div className="text-sm text-muted-foreground mb-1">Total Price</div>
                              <div className="text-2xl font-bold">₹{booking.totalPrice}</div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end p-6 pt-0 border-t mt-6">
                          <Link href={`/playgrounds/${booking.playgroundId}`}>
                            <Button variant="outline">Book Again</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
