"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Clock, MapPin, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookingModal } from "@/components/booking-modal"
import { ReviewForm } from "@/components/review-form"
import { mockPlaygrounds, mockTimeSlots } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-provider"
import { useToast } from "@/hooks/use-toast"

export default function PlaygroundDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [playground, setPlayground] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlots, setSelectedSlots] = useState([])
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    // In a real app, this would be an API call
    const foundPlayground = mockPlaygrounds.find((p) => p.id === params.id)
    if (foundPlayground) {
      setPlayground(foundPlayground)
      setReviews(foundPlayground.reviews || [])
    }

    // Get available slots for the selected date
    const slots = mockTimeSlots.filter(
      (slot) => slot.playgroundId === params.id && slot.date === selectedDate && !slot.isBooked,
    )
    setAvailableSlots(slots)
  }, [params.id, selectedDate])

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setSelectedSlots([])
  }

  const handleSlotToggle = (slot) => {
    if (selectedSlots.some((s) => s.id === slot.id)) {
      setSelectedSlots(selectedSlots.filter((s) => s.id !== slot.id))
    } else {
      setSelectedSlots([...selectedSlots, slot])
    }
  }

  const handleBookNow = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to book a playground",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (selectedSlots.length === 0) {
      toast({
        title: "No slots selected",
        description: "Please select at least one time slot",
        variant: "destructive",
      })
      return
    }

    setIsBookingModalOpen(true)
  }

  const handleReviewSubmitted = () => {
    // In a real app, this would refresh the reviews from the server
    // For now, we'll simulate adding a new review
    const newReview = {
      id: `r${reviews.length + 1}`,
      userId: user?.id || "new-user",
      userName: user?.name || "New User",
      rating: 5,
      comment: "Great experience! Just submitted this review.",
      date: new Date().toISOString().split("T")[0],
    }

    setReviews([newReview, ...reviews])
  }

  if (!playground) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading playground details...</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // Generate dates for the next 7 days
  const nextDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split("T")[0]
  })

  const totalPrice = selectedSlots.reduce((sum, slot) => sum + slot.price, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={playground.image || "/placeholder.svg?height=800&width=1600"}
            alt={playground.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="container">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{playground.name}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-white">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{playground.location}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>
                        {playground.rating} ({reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-sm text-muted-foreground">Price per hour</div>
                  <div className="text-2xl font-bold">₹{playground.pricePerHour}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="details">
                <TabsList className="mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">About this playground</h2>
                    <p className="text-muted-foreground">{playground.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Sports</h3>
                    <div className="flex flex-wrap gap-2">
                      {playground.sports.map((sport) => (
                        <Badge key={sport} variant="secondary" className="text-sm">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Capacity</h3>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Up to {playground.capacity} players</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Location</h3>
                    <div className="aspect-video relative rounded-lg overflow-hidden border">
                      <Image
                        src="/placeholder.svg?height=400&width=800"
                        alt="Map location"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="amenities" className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {playground.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center p-3 border rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-primary">✓</span>
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Reviews</h2>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{playground.rating}</span>
                      <span className="text-muted-foreground ml-1">({reviews.length} reviews)</span>
                    </div>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-4">Write a Review</h3>
                      <ReviewForm playgroundId={playground.id} onReviewSubmitted={handleReviewSubmitted} />
                    </CardContent>
                  </Card>

                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between mb-2">
                              <div className="font-medium">{review.userName}</div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span>{review.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                            <div className="text-xs text-muted-foreground">{review.date}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Book this playground</h2>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Select Date</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                      {nextDates.map((date) => {
                        const d = new Date(date)
                        const isSelected = date === selectedDate
                        return (
                          <Button
                            key={date}
                            variant={isSelected ? "default" : "outline"}
                            className="h-auto flex flex-col py-2"
                            onClick={() => handleDateChange(date)}
                          >
                            <span className="text-xs">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                            <span className="text-lg font-bold">{d.getDate()}</span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Available Time Slots</h3>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>1 hour per slot</span>
                      </div>
                    </div>

                    {availableSlots.length === 0 ? (
                      <div className="text-center py-8 border rounded-lg">
                        <p className="text-muted-foreground">No available slots for this date</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {availableSlots.map((slot) => {
                          const isSelected = selectedSlots.some((s) => s.id === slot.id)
                          return (
                            <Button
                              key={slot.id}
                              variant={isSelected ? "default" : "outline"}
                              className="h-auto py-2"
                              onClick={() => handleSlotToggle(slot)}
                            >
                              {slot.startTime} - {slot.endTime}
                            </Button>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {selectedSlots.length > 0 && (
                    <div className="mb-6 p-4 border rounded-lg bg-muted/50">
                      <h3 className="text-sm font-medium mb-2">Selected Slots</h3>
                      <ul className="space-y-2">
                        {selectedSlots.map((slot) => (
                          <li key={slot.id} className="flex justify-between text-sm">
                            <span>
                              {slot.startTime} - {slot.endTime}
                            </span>
                            <span>₹{slot.price}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t flex justify-between font-medium">
                        <span>Total</span>
                        <span>₹{totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <Button className="w-full" size="lg" onClick={handleBookNow} disabled={selectedSlots.length === 0}>
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        playground={playground}
        selectedDate={selectedDate}
        selectedSlots={selectedSlots}
        totalPrice={totalPrice}
      />
    </div>
  )
}
