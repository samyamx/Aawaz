import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Map as MapIcon, FileText, Bell, User, HelpCircle, LogOut, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Report Issue",
    href: "/report",
    icon: FileText,
  },
  {
    title: "My Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Issue Map",
    href: "/map",
    icon: MapIcon,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: 2,
  },
]

const bottomNavItems = [
  { title: "Profile", href: "/profile", icon: User },
  { title: "Help Center", href: "#", icon: HelpCircle },
  { title: "Logout", href: "#", icon: LogOut },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <nav className="hidden md:flex flex-col w-64 bg-[#0f172a] text-slate-300 h-screen sticky top-0 border-r border-slate-800 shrink-0 shadow-xl z-20">
      
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-slate-100 font-bold text-base leading-tight">Aawaz</span>
            <span className="text-slate-500 text-[10px] uppercase font-semibold tracking-wider">Civic Platform</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex-1 py-6 px-4 space-y-1">
        {sidebarNavItems.map((item) => {
          const isActive = location.pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-[#1e40af] text-white shadow-md" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              )}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={cn("h-4 w-4", isActive ? "text-blue-200" : "text-slate-500")} />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span className="bg-blue-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {/* Bottom Nav */}
      <div className="p-4 border-t border-slate-800/50 space-y-1">
        {bottomNavItems.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors"
          >
            <item.icon className="h-4 w-4 text-slate-500" />
            <span>{item.title}</span>
          </Link>
        ))}

        <div className="mt-6 pt-4 px-2">
          <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="h-10 w-10 rounded-full bg-slate-700 overflow-hidden border-2 border-slate-600 flex-shrink-0">
              <img src="https://i.pravatar.cc/150?img=11" alt="Ram Bahadur" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-slate-200 text-sm font-semibold truncate">Ram Bahadur</span>
              <span className="text-slate-500 text-xs truncate">12 reports</span>
            </div>
            <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
          </div>
        </div>
      </div>
    </nav>
  )
}
