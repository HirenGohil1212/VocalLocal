'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { adminOrders, deliveryPartners } from '@/lib/data';
import { Badge } from '../ui/badge';
import { UserCheck, Truck, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Order = (typeof adminOrders)[0];

export function OrderAssignment() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(adminOrders);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  const handleAssign = (orderId: string) => {
    if (!selectedPartner) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please select a delivery partner.",
        });
      return;
    }
    const partnerName = deliveryPartners.find(p => p.id === selectedPartner)?.name || null;
    setOrders(
      orders.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              status: 'Assigned',
              assignedPartner: partnerName,
            }
          : order
      )
    );
    toast({
        title: "Success",
        description: `Order ${orderId} assigned to ${partnerName}.`,
    });
    // This is a workaround to close the popover. A better solution would involve a controlled popover.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Assignment</CardTitle>
        <CardDescription>Manually assign delivery partners to pending orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Shop</TableHead>
              <TableHead>Customer Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow key={order.orderId}>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell>{order.shopName}</TableCell>
                <TableCell>{order.customerAddress}</TableCell>
                <TableCell>
                  {order.status === 'Assigned' ? (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                        <UserCheck className="mr-1 h-3 w-3" />
                        {order.status}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600 dark:border-yellow-400/60 dark:text-yellow-400">
                        <Clock className="mr-1 h-3 w-3" />
                        {order.status}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {order.status === 'Pending Assignment' ? (
                    <Popover onOpenChange={() => setSelectedPartner(null)}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Truck className="mr-2 h-4 w-4"/>
                            Assign
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-60">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Assign Partner</h4>
                            <p className="text-sm text-muted-foreground">
                              Select a partner for {order.orderId}.
                            </p>
                          </div>
                          <Select onValueChange={setSelectedPartner} value={selectedPartner ?? undefined}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a partner" />
                            </SelectTrigger>
                            <SelectContent>
                              {deliveryPartners.map((partner) => (
                                <SelectItem key={partner.id} value={partner.id}>
                                  {partner.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button onClick={() => handleAssign(order.orderId)}>Confirm Assignment</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">{order.assignedPartner}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
