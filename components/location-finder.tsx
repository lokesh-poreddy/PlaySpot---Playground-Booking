"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function LocationFinder() {
  const router = useRouter()
  const { toast } = useToast()
  const [location, setLocation] = useState("")
  const [isLocating, setIsLocating] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!location.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a location or use your current location",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    // In a real app, this would validate the location
    setTimeout(() => {
      router.push(`/playgrounds?location=${encodeURIComponent(location)}`)
      setIsSearching(false)
    }, 1000)
  }

  const getCurrentLocation = () => {
    setIsLocating(true)

    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation",
        variant: "destructive",
      })
      setIsLocating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords

          // In a real app, this would be a reverse geocoding API call
          // For now, we'll simulate it
          await new Promise((resolve) => setTimeout(resolve, 1500))

          // Simulate getting a location name from coordinates
          const locationName = "Your Current Location"
          setLocation(locationName)

          toast({
            title: "Location found",
            description: `Using your location: ${locationName}`,
          })
        } catch (error) {
          toast({
            title: "Error getting location",
            description: "Failed to get your location. Please try again or enter it manually.",
            variant: "destructive",
          })
        } finally {
          setIsLocating(false)
        }
      },
      (error) => {
        let message = "Failed to get your location"

        if (error.code === 1) {
          message = "Location access denied. Please enable location services."
        } else if (error.code === 2) {
          message = "Location unavailable. Please try again later."
        } else if (error.code === 3) {
          message = "Location request timed out. Please try again."
        }

        toast({
          title: "Error getting location",
          description: message,
          variant: "destructive",
        })

        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Input
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-12 pl-10"
        />
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>
      <Button
        type="button"
        variant="outline"
        className="h-12"
        onClick={getCurrentLocation}
        disabled={isLocating || isSearching}
      >
        {isLocating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Locating...
          </>
        ) : (
          "Use My Location"
        )}
      </Button>
      <Button type="submit" className="h-12" disabled={isLocating || isSearching}>
        {isSearching ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          "Find Playgrounds"
        )}
      </Button>
    </form>
  )
}
