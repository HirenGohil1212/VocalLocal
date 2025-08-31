'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { handleCustomRequest } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Store, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Finding Items...
        </>
      ) : (
        'Find Items Locally'
      )}
    </Button>
  );
}

export function CustomRequestForm() {
  const initialState = { message: '', data: null, error: false };
  const [state, formAction] = useFormState(handleCustomRequest, initialState);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
        });
      } else if (state.data) {
        setDialogOpen(true);
      }
    }
  }, [state, toast]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    formRef.current?.reset();
  }

  return (
    <>
      <form ref={formRef} action={formAction} className="space-y-4">
        <Textarea
          name="request"
          placeholder="e.g., 'A dozen organic eggs and whole wheat bread'"
          rows={3}
          required
        />
        <SubmitButton />
      </form>
      <AlertDialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request Results</AlertDialogTitle>
            <AlertDialogDescription>{state.message}</AlertDialogDescription>
          </AlertDialogHeader>
          {state.data && (
            <div className="space-y-4 py-4">
              {state.data.items && state.data.items.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    Found Items
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {state.data.items.map((item) => (
                      <Badge key={item} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {state.data.shopRecommendations && state.data.shopRecommendations.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Store className="h-5 w-5 text-primary" />
                    Recommended Shops
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {state.data.shopRecommendations.map((shop) => (
                      <Badge key={shop} variant="outline">{shop}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogClose}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
