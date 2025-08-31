'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { deliveryOrders } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bike, Check, Package, X } from 'lucide-react';
import { Badge } from '../ui/badge';

type OrderStatus = 'Pending' | 'Accepted' | 'Delivered';

const statusStyles: Record<OrderStatus, string> = {
  Pending: 'border-yellow-500/80 bg-yellow-500/10 text-yellow-600',
  Accepted: 'border-blue-500/80 bg-blue-500/10 text-blue-600',
  Delivered: 'border-green-500/80 bg-green-500/10 text-green-600',
};

function OrderCard({ order }: { order: (typeof deliveryOrders)[0] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.orderId}</CardTitle>
            <CardDescription>{order.shopName}</CardDescription>
          </div>
          <Badge variant="outline" className={statusStyles[order.status as OrderStatus]}>
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold">Delivery Address</h4>
          <p className="text-muted-foreground">{order.customerAddress}</p>
        </div>
        <div>
          <h4 className="font-semibold">Estimated Earnings</h4>
          <p className="text-primary font-bold text-lg">${order.earnings.toFixed(2)}</p>
        </div>
        {order.status === 'Pending' && (
          <div className="flex gap-2">
            <Button className="w-full" variant="outline">
              <X className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button className="w-full">
              <Check className="mr-2 h-4 w-4" /> Accept
            </Button>
          </div>
        )}
        {order.status === 'Accepted' && (
          <div className="flex gap-2">
            <Button className="w-full">
              <Package className="mr-2 h-4 w-4" /> Mark as Picked Up
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function OrderManagement() {
  const pendingOrders = deliveryOrders.filter((o) => o.status === 'Pending');
  const activeOrders = deliveryOrders.filter((o) => o.status === 'Accepted');
  const completedOrders = deliveryOrders.filter((o) => o.status === 'Delivered');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bike />
          Manage Delivery Requests
        </CardTitle>
        <CardDescription>Review and manage your incoming delivery jobs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-4 pt-4">
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => <OrderCard key={order.orderId} order={order} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No pending orders.</p>
            )}
          </TabsContent>
          <TabsContent value="active" className="space-y-4 pt-4">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => <OrderCard key={order.orderId} order={order} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No active orders.</p>
            )}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4 pt-4">
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => <OrderCard key={order.orderId} order={order} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No completed orders yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
