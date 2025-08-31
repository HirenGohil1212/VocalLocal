import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomRequestForm } from '@/components/custom-request-form';
import { ScrollText } from 'lucide-react';

export function Hero() {
  return (
    <section className="w-full py-6">
      <Card className="bg-primary/10 border-primary/20">
        <div className="container grid gap-6 md:grid-cols-2 lg:gap-12 px-4 md:px-6">
          <div className="flex flex-col justify-center space-y-4 py-8">
            <div className="space-y-2">
              <h1 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                Can't find it? We'll get it.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Just tell us what you need. We'll check local shops and find the best options for you, fast.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center p-6">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ScrollText className="text-primary"/>
                        <span>Custom Request</span>
                    </CardTitle>
                    <CardDescription>
                        Type in any item, and we'll work our magic.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CustomRequestForm/>
                </CardContent>
            </Card>
          </div>
        </div>
      </Card>
    </section>
  );
}
