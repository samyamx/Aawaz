import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { RootLayout } from "./components/layout/RootLayout"
import { DashboardPage } from "./features/dashboard/DashboardPage"
import { ReportIssuePage } from "./features/issues/ReportIssuePage"
import { MyReportsPage } from "./features/issues/MyReportsPage"
import { MapPage } from "./features/map/MapPage"
import { StatisticsPage } from "./features/statistics/StatisticsPage"
import { NotificationsPage } from "./features/notifications/NotificationsPage"
import { ProfilePage } from "./features/profile/ProfilePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="report" element={<ReportIssuePage />} />
          <Route path="reports" element={<MyReportsPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
