import DashboardTopNav from '@/components/layout/DashboardSidebar'
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
        <div className="py-6">
          {children}
        </div>
      </main>
      <DashboardFooter />
    </div>
  )
}

