import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Shop {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  dataAiHint: string;
}

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Image
          src={shop.imageUrl}
          alt={`Image of ${shop.name}`}
          width={600}
          height={400}
          className="aspect-video w-full object-cover"
          data-ai-hint={shop.dataAiHint}
        />
      </CardHeader>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2">{shop.category}</Badge>
        <CardTitle className="font-headline text-xl">{shop.name}</CardTitle>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href="#">
            View Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
