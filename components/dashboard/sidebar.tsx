"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Award, Coins, Gamepad2, Home, LayoutDashboard, Rocket, Settings, ShieldCheck } from "lucide-react"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tokens",
    href: "/dashboard/tokens",
    icon: Coins,
  },
  {
    title: "Achievements",
    href: "/dashboard/achievements",
    icon: Award,
  },
  {
    title: "Game",
    href: "/game",
    icon: Gamepad2,
  },
  {
    title: "Admin",
    href: "/dashboard/admin",
    icon: ShieldCheck,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Rocket className="h-6 w-6 text-primary" />
            <span>Space Puzzle</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-2">
          <div className="flex flex-col gap-1 py-2">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("justify-start", pathname === item.href && "bg-secondary")}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-auto p-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

