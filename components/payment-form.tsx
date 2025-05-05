"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

interface PaymentFormProps {
  amount: number
  onPaymentComplete: () => void
  onCancel: () => void
}

export function PaymentForm({ amount, onPaymentComplete, onCancel }: PaymentFormProps) {
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [upiId, setUpiId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast({
          title: "Missing fields",
          description: "Please fill in all card details",
          variant: "destructive",
        })
        return
      }

      // Simple card number validation
      if (cardNumber.replace(/\s/g, "").length !== 16) {
        toast({
          title: "Invalid card number",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive",
        })
        return
      }
    } else if (paymentMethod === "upi") {
      if (!upiId || !upiId.includes("@")) {
        toast({
          title: "Invalid UPI ID",
          description: "Please enter a valid UPI ID (e.g., name@upi)",
          variant: "destructive",
        })
        return
      }
    }

    setIsProcessing(true)

    try {
      // In a real app, this would be an API call to a payment gateway
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Payment successful",
        description: `Payment of ₹${amount} completed successfully`,
      })

      onPaymentComplete()
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Payment Details</h2>
        <p className="text-muted-foreground">
          Complete your payment of <span className="font-medium">₹{amount}</span> to confirm your booking
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <CreditCard className="mb-3 h-6 w-6" />
              <span className="text-sm font-medium">Credit/Debit Card</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
            <Label
              htmlFor="upi"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-3 h-6 w-6"
              >
                <path d="M7 15h0a5 5 0 0 1 5-5 5 5 0 0 1 5 5h0" />
                <path d="M12 10V5" />
                <rect width="20" height="14" x="2" y="5" rx="2" />
              </svg>
              <span className="text-sm font-medium">UPI</span>
            </Label>
          </div>
        </RadioGroup>

        {paymentMethod === "card" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => {
                  // Format card number with spaces
                  const value = e.target.value.replace(/\s/g, "")
                  if (/^\d*$/.test(value) && value.length <= 16) {
                    const formatted = value.match(/.{1,4}/g)?.join(" ") || value
                    setCardNumber(formatted)
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-name">Cardholder Name</Label>
              <Input
                id="card-name"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    if (value.length <= 4) {
                      if (value.length > 2) {
                        setExpiryDate(`${value.slice(0, 2)}/${value.slice(2)}`)
                      } else {
                        setExpiryDate(value)
                      }
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    if (value.length <= 3) {
                      setCvv(value)
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="upi-id">UPI ID</Label>
            <Input id="upi-id" placeholder="name@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            <p className="text-sm text-muted-foreground">Enter your UPI ID (e.g., name@okicici, name@ybl)</p>
          </div>
        )}

        <div className="pt-4 flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ₹${amount}`
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
