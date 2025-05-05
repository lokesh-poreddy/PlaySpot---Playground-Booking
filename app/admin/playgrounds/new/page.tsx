"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Loader2, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useAuth } from "@/lib/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

const sportsList = [
  "Football",
  "Cricket",
  "Basketball",
  "Tennis",
  "Badminton",
  "Volleyball",
  "Table Tennis",
  "Swimming",
  "Hockey",
  "Rugby",
]

const amenitiesList = [
  "Changing Rooms",
  "Floodlights",
  "Parking",
  "Refreshments",
  "Equipment Rental",
  "Coaching",
  "Showers",
  "Lockers",
  "WiFi",
  "First Aid",
  "Cafe",
  "Pro Shop",
  "Scoreboard",
  "Seating Area",
  "Water Fountains",
]

export default function NewPlaygroundPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [pricePerHour, setPricePerHour] = useState("")
  const [capacity, setCapacity] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [sports, setSports] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([])
  const [featured, setFeatured] = useState(false)
  const [currentSport, setCurrentSport] = useState("")
  const [currentAmenity, setCurrentAmenity] = useState("")

  // Check if user is admin
  if (user && user.role !== "admin") {
    router.push("/")
    return null
  }

  if (!user) {
    router.push("/login")
    return null
  }

  const handleAddSport = () => {
    if (currentSport && !sports.includes(currentSport)) {
      setSports([...sports, currentSport])
      setCurrentSport("")
    }
  }

  const handleRemoveSport = (sport: string) => {
    setSports(sports.filter((s) => s !== sport))
  }

  const handleAddAmenity = () => {
    if (currentAmenity && !amenities.includes(currentAmenity)) {
      setAmenities([...amenities, currentAmenity])
      setCurrentAmenity("")
    }
  }

  const handleRemoveAmenity = (amenity: string) => {
    setAmenities(amenities.filter((a) => a !== amenity))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !location || !description || !pricePerHour || !capacity || sports.length === 0) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Playground created",
        description: "The playground has been created successfully",
      })

      router.push("/admin")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create playground. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" className="mr-4" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Add New Playground</h1>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Enter the basic details about the playground</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Playground Name *</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Green Field Stadium"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Downtown Sports Complex, Chennai"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe the playground, its facilities, and what makes it special"
                          rows={5}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price per Hour (₹) *</Label>
                          <Input
                            id="price"
                            type="number"
                            value={pricePerHour}
                            onChange={(e) => setPricePerHour(e.target.value)}
                            placeholder="e.g. 1500"
                            min="0"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="capacity">Capacity (players) *</Label>
                          <Input
                            id="capacity"
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            placeholder="e.g. 22"
                            min="1"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                          id="image"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="e.g. https://example.com/image.jpg"
                        />
                        <p className="text-sm text-muted-foreground">
                          Enter a URL for the playground image. Leave blank to use a default image.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={featured}
                          onChange={(e) => setFeatured(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label
                          htmlFor="featured"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Feature this playground on the homepage
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Sports & Amenities</CardTitle>
                      <CardDescription>Select the sports and amenities available at this playground</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Sports Available *</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {sports.map((sport) => (
                            <Badge key={sport} variant="secondary" className="flex items-center gap-1">
                              {sport}
                              <button
                                type="button"
                                onClick={() => handleRemoveSport(sport)}
                                className="ml-1 h-3 w-3 rounded-full text-muted-foreground hover:text-foreground"
                              >
                                <Trash className="h-3 w-3" />
                                <span className="sr-only">Remove {sport}</span>
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Select value={currentSport} onValueChange={setCurrentSport}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a sport" />
                            </SelectTrigger>
                            <SelectContent>
                              {sportsList.map((sport) => (
                                <SelectItem key={sport} value={sport}>
                                  {sport}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button type="button" onClick={handleAddSport} disabled={!currentSport}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Amenities</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                              {amenity}
                              <button
                                type="button"
                                onClick={() => handleRemoveAmenity(amenity)}
                                className="ml-1 h-3 w-3 rounded-full text-muted-foreground hover:text-foreground"
                              >
                                <Trash className="h-3 w-3" />
                                <span className="sr-only">Remove {amenity}</span>
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Select value={currentAmenity} onValueChange={setCurrentAmenity}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select an amenity" />
                            </SelectTrigger>
                            <SelectContent>
                              {amenitiesList.map((amenity) => (
                                <SelectItem key={amenity} value={amenity}>
                                  {amenity}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button type="button" onClick={handleAddAmenity} disabled={!currentAmenity}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preview</CardTitle>
                      <CardDescription>Preview of your playground listing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border overflow-hidden">
                        <div className="h-48 bg-muted relative">
                          {imageUrl ? (
                            <img
                              src={imageUrl || "/placeholder.svg"}
                              alt={name || "Playground"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                              No image provided
                            </div>
                          )}
                          {featured && <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-1">{name || "Playground Name"}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{location || "Location"}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {sports.map((sport) => (
                              <Badge key={sport} variant="outline">
                                {sport}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                            {description || "Description will appear here"}
                          </p>
                          <div className="font-bold">
                            {pricePerHour ? `₹${pricePerHour}` : "₹0"}{" "}
                            <span className="text-sm font-normal text-muted-foreground">per hour</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Create Playground"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
