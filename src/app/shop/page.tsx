import { Header } from '@/components/header';
import { OrderConfirmation } from '@/components/shop/order-confirmation';

export default function ShopPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 space-y-4 p-4 md:space-y-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Shop Dashboard</h1>
            <p className="text-muted-foreground">Manage incoming orders and confirm items.</p>
          </div>
        </div>
        <OrderConfirmation />
      </main>
    </div>
  );
}
