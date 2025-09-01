import { Header } from '@/components/header';
import { OrderManagement } from '@/components/delivery/order-management';
import { EarningsDashboard } from '@/components/delivery/earnings-dashboard';
import { Separator } from '@/components/ui/separator';

export default function DeliveryPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 space-y-4 p-4 md:space-y-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Delivery Dashboard</h1>
            <p className="text-muted-foreground">Manage your orders and track your earnings.</p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <div className="md:col-span-2">
                <OrderManagement />
            </div>
            <div className="md:col-span-1">
                <EarningsDashboard />
            </div>
        </div>
      </main>
    </div>
  );
}
