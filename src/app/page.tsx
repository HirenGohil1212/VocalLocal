import Image from 'next/image';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ShopList } from '@/components/shop-list';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 lg:flex-row">
        <div className="flex-1">
          <Hero />
          <ShopList />
        </div>
        <aside className="w-full lg:w-96">
          <CartSidebar />
        </aside>
      </main>
    </div>
  );
}

function CartSidebar() {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6" />
          <span>Your Cart</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="https://picsum.photos/64/64"
              width={64}
              height={64}
              alt="Fresh Tomatoes"
              className="rounded-md"
              data-ai-hint="fresh tomatoes"
            />
            <div>
              <p className="font-semibold">Fresh Tomatoes</p>
              <p className="text-sm text-muted-foreground">$2.99 / kg</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Minus className="h-4 w-4" />
            </Button>
            <span>1</span>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="https://picsum.photos/64/64"
              width={64}
              height={64}
              alt="Organic Milk"
              className="rounded-md"
              data-ai-hint="milk carton"
            />
            <div>
              <p className="font-semibold">Organic Milk</p>
              <p className="text-sm text-muted-foreground">$4.50 / liter</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Minus className="h-4 w-4" />
            </Button>
            <span>2</span>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$11.99</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>$2.00</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>$13.99</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full" size="lg">Checkout</Button>
        <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Empty Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
