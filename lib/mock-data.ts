export interface Playground {
  id: string
  name: string
  location: string
  description: string
  sports: string[]
  pricePerHour: number
  rating: number
  image?: string
  featured?: boolean
  amenities: string[]
  capacity: number
  reviews: Review[]
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
}

export interface TimeSlot {
  id: string
  playgroundId: string
  date: string
  startTime: string
  endTime: string
  isBooked: boolean
  price: number
}

export interface Booking {
  id: string
  userId: string
  userName: string
  playgroundId: string
  playgroundName: string
  date: string
  startTime: string
  endTime: string
  totalPrice: number
  status: "confirmed" | "cancelled" | "completed"
  createdAt: string
}

export const mockPlaygrounds: Playground[] = [
  {
    id: "pg1",
    name: "Green Field Stadium",
    location: "Downtown Sports Complex, Chennai",
    description:
      "A premium football and cricket facility with well-maintained grounds and professional equipment. Perfect for tournaments and casual games alike.",
    sports: ["Football", "Cricket"],
    pricePerHour: 1500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop",
    featured: true,
    amenities: ["Changing Rooms", "Floodlights", "Parking", "Refreshments"],
    capacity: 22,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "John Doe",
        rating: 5,
        comment: "Excellent facilities and friendly staff. The pitch was in perfect condition.",
        date: "2023-04-15",
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Jane Smith",
        rating: 4,
        comment: "Great place to play, though the parking can get crowded on weekends.",
        date: "2023-03-22",
      },
    ],
  },
  {
    id: "pg2",
    name: "Indoor Sports Arena",
    location: "Westside Mall, Mumbai",
    description:
      "State-of-the-art indoor facility offering multiple courts for badminton, basketball, and table tennis. Climate controlled for year-round comfort.",
    sports: ["Badminton", "Basketball", "Table Tennis"],
    pricePerHour: 900,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop",
    featured: false,
    amenities: ["Air Conditioning", "Equipment Rental", "Cafe", "Lockers"],
    capacity: 30,
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Mike Johnson",
        rating: 5,
        comment: "Perfect for rainy days. The basketball court has excellent flooring.",
        date: "2023-05-10",
      },
    ],
  },
  {
    id: "pg3",
    name: "Sunset Tennis Club",
    location: "Beachside Avenue, Goa",
    description:
      "Premium tennis courts with both clay and hard surface options. Stunning ocean views make this a favorite among tennis enthusiasts.",
    sports: ["Tennis"],
    pricePerHour: 1200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1622279457486-28f39ade75c9?q=80&w=1000&auto=format&fit=crop",
    featured: true,
    amenities: ["Pro Shop", "Coaching", "Showers", "Clubhouse"],
    capacity: 8,
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "Sarah Williams",
        rating: 5,
        comment: "The clay courts are exceptionally well maintained. Worth every penny!",
        date: "2023-02-18",
      },
    ],
  },
  {
    id: "pg4",
    name: "City Basketball Court",
    location: "Central Park, Delhi",
    description:
      "Public basketball courts in the heart of the city. Recently renovated with new hoops and line markings.",
    sports: ["Basketball"],
    pricePerHour: 600,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1505666287802-931dc83a5dc9?q=80&w=1000&auto=format&fit=crop",
    featured: false,
    amenities: ["Water Fountains", "Public Restrooms", "Seating Area"],
    capacity: 15,
    reviews: [
      {
        id: "r5",
        userId: "u5",
        userName: "David Chen",
        rating: 4,
        comment: "Good courts for casual play. Can get busy in the evenings.",
        date: "2023-06-05",
      },
    ],
  },
  {
    id: "pg5",
    name: "Riverside Cricket Ground",
    location: "East End, Mumbai",
    description:
      "Spacious cricket ground with well-maintained pitch and outfield. Popular for weekend tournaments and practice sessions.",
    sports: ["Cricket"],
    pricePerHour: 1300,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop",
    featured: false,
    amenities: ["Practice Nets", "Pavilion", "Scoreboard", "Equipment Rental"],
    capacity: 22,
    reviews: [
      {
        id: "r6",
        userId: "u6",
        userName: "Raj Patel",
        rating: 5,
        comment: "Best cricket ground in the city. The pitch is excellent for both batting and bowling.",
        date: "2023-01-30",
      },
    ],
  },
  {
    id: "pg6",
    name: "Multi-Sport Complex",
    location: "University Campus, Bangalore",
    description: "Modern facility offering multiple sports options. Popular among students and young professionals.",
    sports: ["Football", "Basketball", "Volleyball", "Badminton"],
    pricePerHour: 1000,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
    featured: true,
    amenities: ["Changing Rooms", "Vending Machines", "First Aid", "WiFi"],
    capacity: 40,
    reviews: [
      {
        id: "r7",
        userId: "u7",
        userName: "Yuki Tanaka",
        rating: 4,
        comment: "Great variety of sports available. The facilities are clean and well-maintained.",
        date: "2023-04-02",
      },
    ],
  },
  {
    id: "pg7",
    name: "Ace Badminton Center",
    location: "North District, Hyderabad",
    description:
      "Dedicated badminton facility with professional-grade courts and equipment. Offers coaching and regular tournaments.",
    sports: ["Badminton"],
    pricePerHour: 700,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1613918618042-ae6ed9a0bfa8?q=80&w=1000&auto=format&fit=crop",
    featured: false,
    amenities: ["Pro Shop", "Coaching", "Lounge Area", "Showers"],
    capacity: 16,
    reviews: [
      {
        id: "r8",
        userId: "u8",
        userName: "Lin Wei",
        rating: 5,
        comment: "The courts are fantastic and the staff is very helpful. Best badminton venue in town!",
        date: "2023-05-20",
      },
    ],
  },
  {
    id: "pg8",
    name: "Golden Goal Football Arena",
    location: "Sports City, Chennai",
    description:
      "Premium football facility with both indoor and outdoor pitches. FIFA-approved artificial turf ensures excellent playing conditions year-round.",
    sports: ["Football"],
    pricePerHour: 1800,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1000&auto=format&fit=crop",
    featured: true,
    amenities: ["Player Lounge", "Analysis Room", "Premium Changing Rooms", "Cafe"],
    capacity: 22,
    reviews: [
      {
        id: "r9",
        userId: "u9",
        userName: "Mohammed Al-Farsi",
        rating: 5,
        comment: "World-class facility. The pitches are immaculate and the amenities are top-notch.",
        date: "2023-03-15",
      },
    ],
  },
]

export const mockTimeSlots: TimeSlot[] = [
  // Today
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `ts-today-${i + 1}`,
    playgroundId: "pg1",
    date: new Date().toISOString().split("T")[0],
    startTime: `${i + 10}:00`,
    endTime: `${i + 11}:00`,
    isBooked: Math.random() > 0.7,
    price: 1500,
  })),

  // Tomorrow
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `ts-tomorrow-${i + 1}`,
    playgroundId: "pg1",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    startTime: `${i + 10}:00`,
    endTime: `${i + 11}:00`,
    isBooked: Math.random() > 0.5,
    price: 1500,
  })),

  // Day after tomorrow
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `ts-day-after-${i + 1}`,
    playgroundId: "pg1",
    date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    startTime: `${i + 10}:00`,
    endTime: `${i + 11}:00`,
    isBooked: Math.random() > 0.3,
    price: 1500,
  })),
]

export const mockBookings: Booking[] = [
  {
    id: "b1",
    userId: "2",
    userName: "John Doe",
    playgroundId: "pg1",
    playgroundName: "Green Field Stadium",
    date: "2023-06-15",
    startTime: "14:00",
    endTime: "16:00",
    totalPrice: 3000,
    status: "confirmed",
    createdAt: "2023-06-10T09:30:00Z",
  },
  {
    id: "b2",
    userId: "2",
    userName: "John Doe",
    playgroundId: "pg3",
    playgroundName: "Sunset Tennis Club",
    date: "2023-06-20",
    startTime: "10:00",
    endTime: "12:00",
    totalPrice: 2400,
    status: "confirmed",
    createdAt: "2023-06-12T14:45:00Z",
  },
  {
    id: "b3",
    userId: "2",
    userName: "John Doe",
    playgroundId: "pg2",
    playgroundName: "Indoor Sports Arena",
    date: "2023-05-30",
    startTime: "18:00",
    endTime: "19:00",
    totalPrice: 900,
    status: "completed",
    createdAt: "2023-05-25T11:20:00Z",
  },
]
