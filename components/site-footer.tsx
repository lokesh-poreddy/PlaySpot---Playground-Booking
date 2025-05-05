import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-8 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">PlaySpot</h3>
            <p className="text-sm text-muted-foreground">Book your favorite sports playgrounds with ease.</p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/playgrounds" className="text-sm text-muted-foreground hover:text-foreground">
                Playgrounds
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Sports</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/playgrounds?sport=football" className="text-sm text-muted-foreground hover:text-foreground">
                Football
              </Link>
              <Link href="/playgrounds?sport=cricket" className="text-sm text-muted-foreground hover:text-foreground">
                Cricket
              </Link>
              <Link
                href="/playgrounds?sport=basketball"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Basketball
              </Link>
              <Link href="/playgrounds?sport=tennis" className="text-sm text-muted-foreground hover:text-foreground">
                Tennis
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
        <div className="text-sm text-muted-foreground border-t pt-4">
          <p>© {new Date().getFullYear()} PlaySpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
