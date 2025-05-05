"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaymentForm } from "@/components/payment-form"
import { useAuth } from "@/lib/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  playground: any
  selectedDate: string
  selectedSlots: any[]
  totalPrice: number
}

export function BookingModal({
  isOpen,
  onClose,
  playground,
  selectedDate,
  selectedSlots,
  totalPrice,
}: BookingModalProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState(user?.name || "")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStep(2)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentComplete = () => {
    setStep(3)
  }

  const handleClose = () => {
    if (step === 3) {
      router.push("/bookings")
    } else {
      onClose()
    }
    setStep(1)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle>Complete your booking</DialogTitle>
                <DialogDescription>Confirm your details to book {playground?.name}</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Booking Details</Label>
                  <div className="rounded-lg border p-3 space-y-3">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{formatDate(selectedDate)}</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedSlots.length} {selectedSlots.length === 1 ? "slot" : "slots"} selected
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Time Slots</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedSlots.map((slot) => (
                            <div key={slot.id}>
                              {slot.startTime} - {slot.endTime}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{playground?.name}</div>
                        <div className="text-sm text-muted-foreground">{playground?.location}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="flex justify-between font-medium">
                    <span>Total Price</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Continue to Payment"}
                  </Button>
                </DialogFooter>
              </form>
            </motion.div>
          ) : step === 2 ? (
            <PaymentForm amount={totalPrice} onPaymentComplete={handlePaymentComplete} onCancel={() => setStep(1)} />
          ) : (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="py-6 text-center"
            >
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <DialogTitle className="mb-2">Booking Confirmed!</DialogTitle>
              <DialogDescription className="mb-6">
                Your booking at {playground?.name} has been confirmed. You can view your booking details in your
                account.
              </DialogDescription>
              <Button onClick={handleClose} className="w-full">
                View My Bookings
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
