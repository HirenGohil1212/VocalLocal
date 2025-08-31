import { ShopCard } from '@/components/shop-card';
import { shops } from '@/lib/data';

export function ShopList() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
          Shop Near You
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </section>
  );
}
