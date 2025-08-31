import { PackageCheck, Bike, CircleHelp, Store, Check, X, User } from 'lucide-react';

export const shops = [
  {
    id: 1,
    name: "Farmer's Finest Market",
    category: 'Vegetables',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    dataAiHint: 'fresh vegetables',
  },
  {
    id: 2,
    name: 'The Daily Grocer',
    category: 'Groceries',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    dataAiHint: 'grocery store',
  },
  {
    id: 3,
    name: "Pill's Pharmacy",
    category: 'Medicine',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    dataAiHint: 'pharmacy interior',
  },
  {
    id: 4,
    name: 'The Book Nook',
    category: 'Stationery',
    imageUrl: 'https://picsum.photos/600/400?random=4',
    dataAiHint: 'stationery shop',
  },
  {
    id: 5,
    name: 'Green Grocers',
    category: 'Vegetables',
    imageUrl: 'https://picsum.photos/600/400?random=5',
    dataAiHint: 'vegetable stand',
  },
  {
    id: 6,
    name: 'QuickMart',
    category: 'Groceries',
    imageUrl: 'https://picsum.photos/600/400?random=6',
    dataAiHint: 'convenience store',
  },
];

export const deliveryOrders = [
  {
    orderId: 'ORD78901',
    shopName: "Farmer's Finest Market",
    customerAddress: '123 Green St, Meadowville',
    status: 'Pending',
    earnings: 5.5,
  },
  {
    orderId: 'ORD78902',
    shopName: 'The Daily Grocer',
    customerAddress: '456 Oak Ave, Townsville',
    status: 'Accepted',
    earnings: 7.25,
  },
  {
    orderId: 'ORD78903',
    shopName: 'The Book Nook',
    customerAddress: '789 Pine Ln, Cityburg',
    status: 'Delivered',
    earnings: 4.75,
  },
  {
    orderId: 'ORD78904',
    shopName: "Pill's Pharmacy",
    customerAddress: '101 Maple Dr, Hamlet',
    status: 'Pending',
    earnings: 6.0,
  },
];

export const shopOrders = [
    {
        orderId: "ORD78901",
        customerName: "Alice Johnson",
        itemCount: 5,
        status: "Pending",
        items: ["Tomatoes - 1kg", "Onions - 500g", "Potatoes - 1kg", "Spinach - 1 bunch", "Carrots - 500g"]
    },
    {
        orderId: "ORD78905",
        customerName: "Bob Williams",
        itemCount: 2,
        status: "Confirmed",
        items: ["Milk - 1L", "Bread - 1 loaf"]
    },
    {
        orderId: "ORD78906",
        customerName: "Charlie Brown",
        itemCount: 8,
        status: "Ready for Pickup",
        items: ["Notebooks - 4", "Pens - 1 box", "Aspirin - 1 bottle", "Band-aids - 1 box", "Apples - 1kg", "Bananas - 6", "Orange Juice - 1", "Cereal - 1 box"]
    }
];

export const deliveryPartners = [
    { id: "DP001", name: "John Doe" },
    { id: "DP002", name: "Jane Smith" },
    { id: "DP003", name: "Mike Ross" },
    { id: "DP004", name: "Rachel Zane" },
];

export const adminOrders = [
    {
        orderId: "ORD78901",
        shopName: "Farmer's Finest Market",
        customerAddress: "123 Green St, Meadowville",
        status: "Pending Assignment",
        assignedPartner: null,
    },
    {
        orderId: "ORD78904",
        shopName: "Pill's Pharmacy",
        customerAddress: "101 Maple Dr, Hamlet",
        status: "Pending Assignment",
        assignedPartner: null,
    },
    {
        orderId: "ORD78907",
        shopName: "The Daily Grocer",
        customerAddress: "212 Birch Rd, Villagetown",
        status: "Assigned",
        assignedPartner: "John Doe",
    },
];

export const earningsData = {
    total: 255.50,
    thisWeek: 75.20,
    thisMonth: 190.80,
    dailyEarnings: [
        { name: 'Mon', earnings: 15 },
        { name: 'Tue', earnings: 20 },
        { name: 'Wed', earnings: 12 },
        { name: 'Thu', earnings: 25 },
        { name: 'Fri', earnings: 30 },
        { name: 'Sat', earnings: 40 },
        { name: 'Sun', earnings: 35 },
    ]
}
