'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { deliveryOrders as initialDeliveryOrders } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bike, Check, Package, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';

type Order = (typeof initialDeliveryOrders)[0];
type OrderStatus = 'Pending' | 'Accepted' | 'Delivered' | 'Picked Up';

const statusStyles: Record<OrderStatus, string> = {
  Pending: 'border-yellow-500/80 bg-yellow-500/10 text-yellow-600',
  Accepted: 'border-blue-500/80 bg-blue-500/10 text-blue-600',
  'Picked Up': 'border-purple-500/80 bg-purple-500/10 text-purple-600',
  Delivered: 'border-green-500/80 bg-green-500/10 text-green-600',
};

function OrderCard({ order, onStatusChange }: { order: Order, onStatusChange: (id: string, status: OrderStatus) => void }) {
  const { toast } = useToast();

  const handleAccept = () => {
    onStatusChange(order.orderId, 'Accepted');
    toast({ title: 'Order Accepted', description: `You have accepted order ${order.orderId}.` });
  };

  const handleReject = () => {
    // In a real app, this would likely remove the order or send it back to a pool.
    // Here we'll just inform the user.
    toast({ variant: 'destructive', title: 'Order Rejected', description: `You have rejected order ${order.orderId}.` });
  };

  const handlePickUp = () => {
    onStatusChange(order.orderId, 'Picked Up');
    toast({ title: 'Order Picked Up', description: `You have picked up order ${order.orderId}.` });
  };
  
  const handleDeliver = () => {
    onStatusChange(order.orderId, 'Delivered');
    toast({ title: 'Order Delivered!', description: `You have delivered order ${order.orderId}.` });
  };


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
            <Button className="w-full" variant="outline" onClick={handleReject}>
              <X className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button className="w-full" onClick={handleAccept}>
              <Check className="mr-2 h-4 w-4" /> Accept
            </Button>
          </div>
        )}
        {order.status === 'Accepted' && (
          <div className="flex gap-2">
            <Button className="w-full" onClick={handlePickUp}>
              <Package className="mr-2 h-4 w-4" /> Mark as Picked Up
            </Button>
          </div>
        )}
        {order.status === 'Picked Up' && (
          <div className="flex gap-2">
            <Button className="w-full" onClick={handleDeliver}>
              <Bike className="mr-2 h-4 w-4" /> Mark as Delivered
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function OrderManagement() {
  const [orders, setOrders] = useState(initialDeliveryOrders);
  
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
  };

  const pendingOrders = orders.filter((o) => o.status === 'Pending');
  const activeOrders = orders.filter((o) => ['Accepted', 'Picked Up'].includes(o.status));
  const completedOrders = orders.filter((o) => o.status === 'Delivered');

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
              pendingOrders.map((order) => <OrderCard key={order.orderId} order={order} onStatusChange={handleStatusChange} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No pending orders.</p>
            )}
          </TabsContent>
          <TabsContent value="active" className="space-y-4 pt-4">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => <OrderCard key={order.orderId} order={order} onStatusChange={handleStatusChange} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No active orders.</p>
            )}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4 pt-4">
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => <OrderCard key={order.orderId} order={order} onStatusChange={handleStatusChange} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No completed orders yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
