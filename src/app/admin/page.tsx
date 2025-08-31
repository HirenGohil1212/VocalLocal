import { Header } from '@/components/header';
import { AnalyticsDashboard } from '@/components/admin/analytics-dashboard';
import { OrderAssignment } from '@/components/admin/order-assignment';
import { Separator } from '@/components/ui/separator';

export default function AdminPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 space-y-4 p-4 md:space-y-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Oversee operations and manage assignments.</p>
          </div>
        </div>
        <AnalyticsDashboard />
        <Separator />
        <OrderAssignment />
      </main>
    </div>
  );
}
