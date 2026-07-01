import { Bell, CheckCircle2, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const notifications = [
  { id: 1, type: "status", title: "Issue Resolved", message: "Your report 'Water leak in Park' has been resolved by the municipal team.", time: "2 hours ago", read: false, icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  { id: 2, type: "update", title: "Status Update", message: "Your report 'Broken Streetlight' is now In Progress.", time: "1 day ago", read: false, icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  { id: 3, type: "info", title: "Community Announcement", message: "Road maintenance scheduled for Oak Avenue this weekend.", time: "3 days ago", read: true, icon: Info, color: "text-primary", bg: "bg-primary/10" },
]

export function NotificationsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated on your reports and community alerts.</p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id} className={`transition-colors ${notif.read ? 'bg-slate-50 opacity-70' : 'bg-white shadow-sm'}`}>
            <CardContent className="p-6 flex gap-4">
              <div className={`mt-1 flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full ${notif.bg}`}>
                <notif.icon className={`h-5 w-5 ${notif.color}`} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 leading-none">{notif.title}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{notif.time}</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="flex-shrink-0 flex items-center justify-center pl-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
