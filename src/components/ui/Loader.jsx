import { Loader2, Leaf } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Spinner({ className, size = 24, ...props }) {
  return (
    <Loader2 
      size={size} 
      className={cn('animate-spin text-primary', className)} 
      {...props} 
    />
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 min-h-screen bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <Leaf className="text-primary animate-pulse" size={24} />
        </div>
        <h2 className="font-heading font-medium text-lg text-primary-dark tracking-wide animate-pulse">
          FarmKart Loading...
        </h2>
      </div>
    </div>
  );
}
