import { Bell, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-slate-200">
      <div className="flex h-16 items-center px-4 md:px-6 gap-4">
        
        {/* Left Section: Menu & Title */}
        <div className="flex items-center gap-4 min-w-[200px]">
          <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 hidden md:flex">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <h2 className="text-base font-semibold text-slate-800 whitespace-nowrap hidden sm:block">Citizen Dashboard</h2>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 flex justify-center max-w-2xl mx-auto">
          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              type="search" 
              placeholder="Search reports..." 
              className="w-full pl-10 bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 rounded-full h-10 shadow-inner"
            />
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-2 md:gap-4 justify-end min-w-[120px]">
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
              <span className="sr-only">Notifications</span>
            </Button>
          </Link>
          <Link to="/profile" className="hidden sm:block">
            <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-slate-200 cursor-pointer hover:border-blue-500 transition-colors">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="h-full w-full object-cover" />
            </div>
          </Link>
        </div>
        
      </div>
    </header>
  )
}
