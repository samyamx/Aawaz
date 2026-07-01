import { Link, useLocation } from "react-router-dom"
import { Home, Map as MapIcon, PlusCircle, Bell, UserCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const bottomNavItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Report",
    href: "/report",
    icon: PlusCircle,
  },
  {
    title: "Map",
    href: "/map",
    icon: MapIcon,
  },
  {
    title: "Alerts",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCircle,
  },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-white/95 backdrop-blur pb-safe">
      {bottomNavItems.map((item) => {
        const isActive = location.pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors",
              isActive ? "text-primary" : "text-slate-500 hover:text-slate-900"
            )}
          >
            <item.icon className={cn("h-6 w-6", isActive && item.href === "/report" && "h-8 w-8 text-primary bg-primary/10 rounded-full p-1")} />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
