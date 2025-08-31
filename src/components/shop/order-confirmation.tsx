'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { shopOrders as initialShopOrders, deliveryPartners } from '@/lib/data';
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
import { useToast } from '@/hooks/use-toast';

type Order = (typeof initialShopOrders)[0];
type OrderStatus = 'Pending' | 'Confirmed' | 'Ready for Pickup' | 'Handed Over';

const statusStyles: Record<OrderStatus, string> = {
    Pending: 'border-yellow-500/80 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 dark:border-yellow-400/50',
    Confirmed: 'border-blue-500/80 bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:border-blue-400/50',
    'Ready for Pickup': 'border-green-500/80 bg-green-500/10 text-green-600 dark:text-green-400 dark:border-green-400/50',
    'Handed Over': 'border-gray-500/80 bg-gray-500/10 text-gray-600 dark:text-gray-400 dark:border-gray-400/50',
};

function OrderCard({ order, onStatusChange, onHandover }: { order: Order, onStatusChange: (id: string, status: OrderStatus) => void, onHandover: (orderId: string, partnerId: string) => void }) {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConfirm = () => {
    onStatusChange(order.orderId, 'Confirmed');
    toast({ title: 'Order Confirmed', description: `Order ${order.orderId} has been confirmed.` });
  };

  const handleReject = () => {
    toast({ variant: 'destructive', title: 'Order Rejected', description: `Order ${order.orderId} has been rejected.` });
  };
  
  const handleReady = () => {
    onStatusChange(order.orderId, 'Ready for Pickup');
    toast({ title: 'Order Ready', description: `Order ${order.orderId} is now ready for pickup.` });
  };

  const handleHandover = () => {
    if (!selectedPartner) {
        toast({ variant: 'destructive', title: 'Selection Missing', description: 'Please select a delivery partner.' });
        return;
    }
    onHandover(order.orderId, selectedPartner);
  };

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
            <Button className="w-full" variant="outline" onClick={handleReject}>
              <X className="mr-2 h-4 w-4" /> Reject Order
            </Button>
            <Button className="w-full" onClick={handleConfirm}>
              <Check className="mr-2 h-4 w-4" /> Confirm Availability
            </Button>
          </div>
        )}
        {order.status === 'Confirmed' && (
          <Button className="w-full" onClick={handleReady}>
            <ThumbsUp className="mr-2 h-4 w-4" /> Mark as Ready for Pickup
          </Button>
        )}
        {order.status === 'Ready for Pickup' && (
            <div className='space-y-3'>
                <p className="text-sm font-medium">Handover to Delivery Partner</p>
                <div className='flex flex-col sm:flex-row gap-2 items-center'>
                    <Select onValueChange={setSelectedPartner}>
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
                    <Button className='w-full sm:w-auto' onClick={handleHandover}>
                        <Truck className="mr-2 h-4 w-4" /> Handover
                    </Button>
                </div>
            </div>
        )}
        {order.status === 'Handed Over' && (
             <p className='text-sm text-center text-muted-foreground'>This order was handed over to {order.assignedPartner}.</p>
        )}
      </CardContent>
    </Card>
  );
}

export function OrderConfirmation() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(initialShopOrders);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.orderId === orderId ? {...o, status: newStatus } : o));
  };

  const handleHandover = (orderId: string, partnerId: string) => {
    const partner = deliveryPartners.find(p => p.id === partnerId);
    if (!partner) return;

    setOrders(orders.map(o => o.orderId === orderId ? { ...o, status: 'Handed Over', assignedPartner: partner.name } : o));

    toast({ 
      title: 'Order Handed Over', 
      description: `Order ${orderId} has been handed over to ${partner.name}.` 
    });
  };

  const pendingOrders = orders.filter((o) => o.status === 'Pending');
  const confirmedOrders = orders.filter((o) => o.status === 'Confirmed');
  const readyOrders = orders.filter((o) => o.status === 'Ready for Pickup');
  const completedOrders = orders.filter((o) => o.status === 'Handed Over');

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
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({confirmedOrders.length})</TabsTrigger>
            <TabsTrigger value="ready">Ready ({readyOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-4 pt-4">
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => <OrderCard key={order.orderId} order={order} onStatusChange={handleStatusChange} onHandover={handleHandover} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No pending orders.</p>
            )}
          </TabsContent>
          <TabsContent value="confirmed" className="space-y-4 pt-4">
            {confirmedOrders.length > 0 ? (
              confirmedOrders.map((order) => <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} onHandover={handleHandover} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No confirmed orders.</p>
            )}
          </TabsContent>
          <TabsContent value="ready" className="space-y-4 pt-4">
            {readyOrders.length > 0 ? (
              readyOrders.map((order) => <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} onHandover={handleHandover} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No orders are ready for pickup.</p>
            )}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4 pt-4">
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} onHandover={handleHandover} />)
            ) : (
              <p className="text-center text-muted-foreground py-8">No completed orders.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
