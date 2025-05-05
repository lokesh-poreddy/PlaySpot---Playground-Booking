"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, CircleUser, MapPin, PlusCircle, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useAuth } from "@/lib/auth-provider"
import { mockPlaygrounds, mockBookings } from "@/lib/mock-data"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== "admin") {
      router.push("/")
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [user, router])

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-6">You don't have permission to access this page</p>
            <Link href="/">
              <Button>Go to Home</Button>
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading dashboard...</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage playgrounds, bookings, and users</p>
            </div>
            <Link href="/admin/playgrounds/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Playground
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Playgrounds</p>
                    <p className="text-3xl font-bold">{mockPlaygrounds.length}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Bookings</p>
                    <p className="text-3xl font-bold">{mockBookings.length}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Users</p>
                    <p className="text-3xl font-bold">24</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CircleUser className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Average Rating</p>
                    <div className="flex items-center">
                      <p className="text-3xl font-bold mr-2">4.6</p>
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="playgrounds">
            <TabsList className="mb-6">
              <TabsTrigger value="playgrounds">Playgrounds</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="playgrounds">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Playgrounds</CardTitle>
                  <CardDescription>View and manage all playgrounds in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 font-medium border-b">
                      <div className="col-span-5">Name</div>
                      <div className="col-span-3">Location</div>
                      <div className="col-span-2">Price</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {mockPlaygrounds.slice(0, 5).map((playground) => (
                      <div key={playground.id} className="grid grid-cols-12 p-4 border-b last:border-0 items-center">
                        <div className="col-span-5 font-medium">{playground.name}</div>
                        <div className="col-span-3 text-muted-foreground truncate">{playground.location}</div>
                        <div className="col-span-2">${playground.pricePerHour}/hr</div>
                        <div className="col-span-2 flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Link href="/admin/playgrounds">
                      <Button variant="outline">View All Playgrounds</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>View and manage recent bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 font-medium border-b">
                      <div className="col-span-3">User</div>
                      <div className="col-span-3">Playground</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {mockBookings.map((booking) => (
                      <div key={booking.id} className="grid grid-cols-12 p-4 border-b last:border-0 items-center">
                        <div className="col-span-3 font-medium">{booking.userName}</div>
                        <div className="col-span-3 text-muted-foreground truncate">{booking.playgroundName}</div>
                        <div className="col-span-2">{booking.date}</div>
                        <div className="col-span-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Link href="/admin/bookings">
                      <Button variant="outline">View All Bookings</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage users in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 font-medium border-b">
                      <div className="col-span-3">Name</div>
                      <div className="col-span-4">Email</div>
                      <div className="col-span-2">Role</div>
                      <div className="col-span-3">Actions</div>
                    </div>
                    {[
                      { id: "1", name: "Admin User", email: "admin@example.com", role: "admin" },
                      { id: "2", name: "John Doe", email: "john@example.com", role: "user" },
                      { id: "3", name: "Jane Smith", email: "jane@example.com", role: "user" },
                      { id: "4", name: "Mike Johnson", email: "mike@example.com", role: "user" },
                      { id: "5", name: "Sarah Williams", email: "sarah@example.com", role: "user" },
                    ].map((user) => (
                      <div key={user.id} className="grid grid-cols-12 p-4 border-b last:border-0 items-center">
                        <div className="col-span-3 font-medium">{user.name}</div>
                        <div className="col-span-4 text-muted-foreground">{user.email}</div>
                        <div className="col-span-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </div>
                        <div className="col-span-3 flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Link href="/admin/users">
                      <Button variant="outline">View All Users</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
