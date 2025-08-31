'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { shopOrders, deliveryPartners } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Package, ThumbsUp, Truck, User, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type OrderStatus = 'Pending' | 'Confirmed' | 'Ready for Pickup';

const statusStyles: Record<OrderStatus, string> = {
    Pending: 'border-yellow-500/80 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 dark:border-yellow-400/50',
    Confirmed: 'border-blue-500/80 bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:border-blue-400/50',
    'Ready for Pickup': 'border-green-500/80 bg-green-500/10 text-green-600 dark:text-green-400 dark:border-green-400/50',
};

function OrderCard({ order }: { order: (typeof shopOrders)[0] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.orderId}</CardTitle>
            <CardDescription className="flex items-center gap-2 pt-1">
                <User className="h-4 w-4"/>
                {order.customerName}
            </CardDescription>
          </div>
          <Badge variant="outline" className={statusStyles[order.status as OrderStatus]}>
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Items ({order.itemCount})</h4>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            {order.items.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
        <Separator/>
        {order.status === 'Pending' && (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="w-full" variant="outline">
              <X className="mr-2 h-4 w-4" /> Reject Order
            </Button>
            <Button className="w-full">
              <Check className="mr-2 h-4 w-4" /> Confirm Availability
            </Button>
          </div>
        )}
        {order.status === 'Confirmed' && (
          <Button className="w-full">
            <ThumbsUp className="mr-2 h-4 w-4" /> Mark as Ready for Pickup
          </Button>
        )}
        {order.status === 'Ready for Pickup' && (
            <div className='space-y-3'>
                <p className="text-sm font-medium">Handover to Delivery Partner</p>
                <div className='flex flex-col sm:flex-row gap-2 items-center'>
                    <Select>
                        <SelectTrigger className='flex-1'>
                            <SelectValue placeholder="Select delivery partner" />
                        </SelectTrigger>
                        <SelectContent>
                            {deliveryPartners.map((partner) => (
                            <SelectItem key={partner.id} value={partner.id}>
                                {partner.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button className='w-full sm:w-auto'>
                        <Truck className="mr-2 h-4 w-4" /> Handover
                    </Button>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}

export function OrderConfirmation() {
  const pendingOrders = shopOrders.filter((o) => o.status === 'Pending');
  const confirmedOrders = shopOrders.filter((o) => o.status === 'Confirmed');
  const readyOrders = shopOrders.filter((o) => o.status === 'Ready for Pickup');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package />
          Incoming Orders
        </CardTitle>
        <CardDescription>Confirm incoming orders and prepare them for pickup.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({confirmedOrders.length})</TabsTrigger>
            <TabsTrigger value="ready">Ready ({readyOrders.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-4 pt-4">
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => <OrderCard key={order.orderId} order={order} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No pending orders.</p>
            )}
          </TabsContent>
          <TabsContent value="confirmed" className="space-y-4 pt-4">
            {confirmedOrders.length > 0 ? (
              confirmedOrders.map((order) => <OrderCard key={order.orderId} order={order} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No confirmed orders.</p>
            )}
          </TabsContent>
          <TabsContent value="ready" className="space-y-4 pt-4">
            {readyOrders.length > 0 ? (
              readyOrders.map((order) => <OrderCard key={order.orderId} order={order} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No orders are ready for pickup.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
