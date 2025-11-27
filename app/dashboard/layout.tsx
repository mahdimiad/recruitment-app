import DashboardTopNav from '@/components/layout/DashboardTopNav'
import DashboardFooter from '@/components/layout/DashboardFooter'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <DashboardTopNav />
      <main className="flex-1">
        {children}
      </main>
      <DashboardFooter />
    </div>
  )
}

