import { 
  FileText, Clock, CheckCircle2, TrendingUp, BarChart3, XCircle,
  MapPin, AlertCircle, MessageSquare, Megaphone, Map as MapIcon, User, Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar 
} from "recharts"

const trendData = [
  { name: "Jan", submitted: 18, resolved: 10 },
  { name: "Feb", submitted: 25, resolved: 15 },
  { name: "Mar", submitted: 35, resolved: 20 },
  { name: "Apr", submitted: 28, resolved: 25 },
  { name: "May", submitted: 30, resolved: 28 },
  { name: "Jun", submitted: 36, resolved: 32 },
]

const categoryData = [
  { name: "Roads", value: 4, color: "#3b82f6" },
  { name: "Water", value: 2, color: "#0ea5e9" },
  { name: "Sanitation", value: 3, color: "#8b5cf6" },
  { name: "Electricity", value: 1, color: "#f59e0b" },
  { name: "Waste", value: 2, color: "#22c55e" },
]

const recentActivity = [
  { id: 1, action: "Issue resolved", desc: "Sewage overflow at Lazimpat fixed.", time: "2h", type: "resolved" },
  { id: 2, action: "Status updated", desc: "Pothole on Baneshwor In Progress.", time: "1d", type: "updated" },
  { id: 3, action: "Authority responded", desc: "Repair crew assigned for Ward 10.", time: "2d", type: "responded" },
  { id: 4, action: "Report submitted", desc: "Broken pipe reported at Baluwatar.", time: "5d", type: "submitted" },
]

const myRecentReports = [
  { id: "AWZ-2024-001", title: "Pothole on Baneshwor Ma...", category: "Roads", date: "Jun 18, 2026", status: "In Progress" },
  { id: "AWZ-2024-002", title: "Street Light Outage - Bal...", category: "Street Lights", date: "Jun 15, 2026", status: "Submitted" },
  { id: "AWZ-2024-003", title: "Sewage Overflow Near Sc...", category: "Sanitation", date: "Jun 10, 2026", status: "Resolved" },
  { id: "AWZ-2024-004", title: "Garbage Pile at Teku Inter...", category: "Waste Management", date: "Jun 8, 2026", status: "Rejected" },
  { id: "AWZ-2024-005", title: "Broken Water Pipe - Balu...", category: "Water Supply", date: "Jun 5, 2026", status: "In Progress" },
]

export function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-50/50 min-h-screen pb-12">
      
      {/* Hero Banner */}
      <div className="bg-[#1e40af] text-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <svg width="300" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M45.7,-76.3C58.9,-69.3,69.1,-56.3,77.3,-42.1C85.5,-27.9,91.7,-12.5,91.1,2.7C90.5,17.9,83.1,32.9,73.5,45.8C63.9,58.7,52.1,69.5,38.6,76.5C25.1,83.5,9.9,86.7,-4.9,85.7C-19.7,84.7,-34.1,79.5,-46.8,71.2C-59.5,62.9,-70.5,51.5,-78.6,37.8C-86.7,24.1,-91.9,8.1,-90.4,-7.1C-88.9,-22.3,-80.7,-36.7,-70.4,-48.5C-60.1,-60.3,-47.7,-69.5,-34.5,-76.3C-21.3,-83.1,-7.3,-87.5,7.3,-88.4C21.9,-89.3,42.4,-86.7,45.7,-76.3Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="z-10 space-y-2">
          <p className="text-blue-200 text-sm font-medium">Wednesday, June 25, 2026</p>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Ram Bahadur</h1>
          <p className="text-blue-100 max-w-lg">Your voice matters — report, track, and improve your community.</p>
        </div>
        
        <div className="z-10 mt-6 md:mt-0 flex items-center space-x-3">
          <Link to="/report">
            <Button variant="secondary" className="bg-white text-[#1e40af] hover:bg-slate-100 shadow-sm font-semibold">
              <FileText className="mr-2 h-4 w-4" /> Report Issue
            </Button>
          </Link>
          <Link to="/map">
            <Button className="bg-[#3b82f6] text-white hover:bg-[#2563eb] border border-blue-400 shadow-sm font-semibold">
              <MapIcon className="mr-2 h-4 w-4" /> View Map
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-100 rounded-lg"><FileText className="h-5 w-5 text-blue-600" /></div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center"><TrendingUp className="h-3 w-3 mr-1"/>+3</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-800">12</h3>
              <p className="text-xs font-medium text-slate-500">Total Reports</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-amber-100 rounded-lg"><Clock className="h-5 w-5 text-amber-600" /></div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center"><TrendingUp className="h-3 w-3 mr-1"/>+1</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-800">4</h3>
              <p className="text-xs font-medium text-slate-500">In Progress</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-emerald-100 rounded-lg"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center"><TrendingUp className="h-3 w-3 mr-1"/>+2</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-800">7</h3>
              <p className="text-xs font-medium text-slate-500">Resolved</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-purple-100 rounded-lg"><BarChart3 className="h-5 w-5 text-purple-600" /></div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center"><TrendingUp className="h-3 w-3 mr-1"/>+120</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-800">840</h3>
              <p className="text-xs font-medium text-slate-500">Impact Score</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-sky-100 rounded-lg"><TrendingUp className="h-5 w-5 text-sky-600" /></div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center"><TrendingUp className="h-3 w-3 mr-1"/>-1d</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-800">5d</h3>
              <p className="text-xs font-medium text-slate-500">Avg Resolution</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-red-100 rounded-lg"><XCircle className="h-5 w-5 text-red-600" /></div>
              <span className="text-xs font-semibold text-slate-400 flex items-center">—</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-800">1</h3>
              <p className="text-xs font-medium text-slate-500">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7 shadow-sm border-slate-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Reports Trend</CardTitle>
              <CardDescription>Jan – Jun 2026</CardDescription>
            </div>
            <div className="flex items-center space-x-4 text-xs font-medium">
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>Submitted</div>
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>Resolved</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="submitted" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-sm border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">By Category</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[140px] w-full relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2 text-xs font-medium">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center"><div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: item.color}}></div>{item.name}</div>
                  <span className="text-slate-500">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-sm border-slate-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <Link to="/notifications" className="text-xs font-medium text-blue-600 hover:underline">View all</Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      activity.type === 'resolved' ? 'bg-emerald-500' : 
                      activity.type === 'updated' ? 'bg-amber-500' : 
                      activity.type === 'responded' ? 'bg-purple-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="w-px h-full bg-slate-200 mt-2 absolute top-2 left-1 bottom-[-20px] -z-10 last:hidden"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">{activity.action}</p>
                      <span className="text-[10px] font-medium text-slate-400">{activity.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{activity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Reports Table */}
        <Card className="lg:col-span-8 shadow-sm border-slate-200 overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between bg-white border-b border-slate-100 py-4 shrink-0">
            <CardTitle className="text-lg">My Recent Reports</CardTitle>
            <Link to="/reports" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
              See all <ChevronRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </CardHeader>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left h-full">
              <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3 font-medium whitespace-nowrap">Report ID</th>
                  <th className="px-6 py-3 font-medium min-w-[200px]">Title</th>
                  <th className="px-6 py-3 font-medium whitespace-nowrap">Category</th>
                  <th className="px-6 py-3 font-medium whitespace-nowrap">Date</th>
                  <th className="px-6 py-3 font-medium whitespace-nowrap">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {myRecentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 font-mono text-slate-500 text-xs">{report.id}</td>
                    <td className="px-6 py-3.5 font-medium text-slate-800 flex items-center">
                      <div className="h-6 w-6 rounded bg-slate-200 mr-3 overflow-hidden shrink-0">
                        <img src={`https://picsum.photos/seed/${report.id}/50/50`} alt="" className="h-full w-full object-cover" />
                      </div>
                      <span className="line-clamp-1">{report.title}</span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-600">{report.category}</td>
                    <td className="px-6 py-3.5 text-slate-500 whitespace-nowrap">{report.date}</td>
                    <td className="px-6 py-3.5">
                      <Badge variant="outline" className={`
                        font-medium border-0 px-2.5 py-0.5 text-xs whitespace-nowrap
                        ${report.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 
                          report.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 
                          report.status === 'Submitted' ? 'bg-blue-100 text-blue-700' : 
                          'bg-red-100 text-red-700'}
                      `}>
                        {report.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-900">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Issue Map Preview & Notifications */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="shadow-sm border-slate-200 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
              <CardTitle className="text-lg">Issue Map</CardTitle>
              <Link to="/map" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
                Full map <ArrowUpRightIcon className="ml-1 h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="h-[140px] w-full rounded-md border border-slate-200 overflow-hidden relative bg-slate-100">
                <img src="https://api.maptiler.com/maps/streets-v2/256/0/0/0.png" alt="Map Preview" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                  <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-white/90 backdrop-blur-sm rounded px-2 py-1 flex items-center justify-center space-x-2 text-[8px] font-medium text-slate-600 shadow-sm border border-slate-200/50">
                  <span className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1"></div>Submitted</span>
                  <span className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1"></div>Active</span>
                  <span className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></div>Resolved</span>
                  <span className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></div>Rejected</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 flex-1 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <Link to="/notifications" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
                All <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
              <div className="space-y-4">
                <div className="flex gap-3 border-l-2 border-blue-500 pl-3 py-1">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-slate-800 flex items-center">
                        Issue Resolved <div className="h-1.5 w-1.5 rounded-full bg-blue-500 ml-2"></div>
                      </p>
                      <span className="text-[10px] text-slate-400">2h ago</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">AWZ-2024-003 (Sewage Overflow) has been fixed.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 border-l-2 border-transparent pl-3 py-1">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-slate-800 flex items-center">
                        Status Updated <div className="h-1.5 w-1.5 rounded-full bg-blue-500 ml-2"></div>
                      </p>
                      <span className="text-[10px] text-slate-400">1d ago</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">AWZ-2024-001 is now In Progress. Ward 10 t...</p>
                  </div>
                </div>

                <div className="flex gap-3 border-l-2 border-transparent pl-3 py-1">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-slate-800">Authority Response</p>
                      <span className="text-[10px] text-slate-400">2d ago</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">Officer commented on AWZ-2024-001.</p>
                  </div>
                </div>

                <div className="flex gap-3 border-l-2 border-transparent pl-3 py-1">
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Megaphone className="h-3.5 w-3.5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-slate-800">Community Alert</p>
                      <span className="text-[10px] text-slate-400">3d ago</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">Heavy rain expected. Report flooding issues...</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Submissions Bar Chart */}
        <Card className="lg:col-span-4 shadow-sm border-slate-200">
          <CardHeader className="pb-0 pt-4">
            <CardTitle className="text-lg">Monthly Submissions</CardTitle>
          </CardHeader>
          <CardContent className="pl-0 pb-2">
            <div className="h-[140px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ top: 0, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={5} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} tickCount={4} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="submitted" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-4 shadow-sm border-slate-200 bg-transparent shadow-none border-none">
          <CardHeader className="pb-2 pt-0 px-0">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="grid grid-cols-2 gap-3 h-[140px]">
              <Link to="/report" className="bg-[#2563eb] text-white rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#1d4ed8] transition-colors shadow-sm">
                <Plus className="h-5 w-5 mb-1.5" />
                <span className="text-sm font-semibold">New Report</span>
              </Link>
              <Link to="/reports" className="bg-white border border-slate-200 text-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                <FileText className="h-5 w-5 text-blue-600 mb-1.5" />
                <span className="text-sm font-semibold">My Reports</span>
              </Link>
              <Link to="/map" className="bg-white border border-slate-200 text-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                <MapIcon className="h-5 w-5 text-blue-600 mb-1.5" />
                <span className="text-sm font-semibold">Issue Map</span>
              </Link>
              <Link to="/profile" className="bg-white border border-slate-200 text-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                <User className="h-5 w-5 text-blue-600 mb-1.5" />
                <span className="text-sm font-semibold">Profile</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Kathmandu Metro Stats */}
        <Card className="lg:col-span-4 shadow-sm border-slate-200">
          <CardHeader className="pb-2 pt-4 border-b border-slate-100">
            <CardTitle className="text-lg">Kathmandu Metro</CardTitle>
          </CardHeader>
          <CardContent className="pt-3 pb-3">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Total Issues</span>
                <span className="text-sm font-bold text-blue-600">312</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Resolution Rate</span>
                <span className="text-sm font-bold text-emerald-600">86%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Avg Response</span>
                <span className="text-sm font-bold text-amber-500">4.2d</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Active Citizens</span>
                <span className="text-sm font-bold text-purple-600">1.4k</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              Top performing ward this month
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  )
}

function ArrowUpRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
  )
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  )
}
