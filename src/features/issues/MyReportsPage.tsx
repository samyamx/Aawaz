import { useState } from "react"
import { Filter, Search, MapPin, MoreVertical } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const myReports = [
  { id: "REP-001", title: "Pothole on Main St", category: "Road Damage", date: "2023-10-25", status: "Submitted", location: "123 Main St", image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400&h=300" },
  { id: "REP-002", title: "Broken Streetlight", category: "Public Safety", date: "2023-10-22", status: "In Progress", location: "Oak Avenue", image: "https://images.unsplash.com/photo-1517722014278-c256a4d3f016?auto=format&fit=crop&q=80&w=400&h=300" },
  { id: "REP-003", title: "Water leak in Park", category: "Water Supply", date: "2023-10-15", status: "Resolved", location: "Central Park", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=400&h=300" },
]

export function MyReportsPage() {
  const [filter, setFilter] = useState("all")

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Reports</h1>
          <p className="text-muted-foreground mt-2">Track and manage the issues you have reported.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search reports..." className="pl-8 bg-white" />
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] bg-white">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {myReports.map((report) => (
          <Card key={report.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="h-48 overflow-hidden relative">
              <img src={report.image} alt={report.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
              <div className="absolute top-3 right-3">
                <Badge variant={report.status === 'Resolved' ? 'default' : 'secondary'} className={`shadow-sm ${report.status === 'Resolved' ? 'bg-success hover:bg-success/80' : report.status === 'In Progress' ? 'bg-warning text-white hover:bg-warning/80' : 'bg-primary text-primary-foreground'}`}>
                  {report.status}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">{report.id}</p>
                  <CardTitle className="line-clamp-1">{report.title}</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="-mr-2 -mt-2 h-8 w-8 text-slate-400 hover:text-slate-900">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{report.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-slate-500 mb-2">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                <span className="line-clamp-1">{report.location}</span>
              </div>
              <div className="text-xs text-slate-400 mt-4">Reported on {new Date(report.date).toLocaleDateString()}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
