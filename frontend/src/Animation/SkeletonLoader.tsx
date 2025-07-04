import { motion } from 'framer-motion';

export const SkeletonCard = () => {
  return (
    <div className="h-full bg-muted/20 rounded-xl overflow-hidden border border-border/20">
      <div className="h-48 bg-gradient-to-r from-muted/30 to-muted/40 animate-pulse" />
      <div className="p-6">
        <div className="h-6 bg-muted/30 rounded w-3/4 mb-4 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted/20 rounded w-full animate-pulse" />
          <div className="h-4 bg-muted/20 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-muted/20 rounded w-2/3 animate-pulse" />
        </div>
        <div className="mt-6 h-10 bg-muted/30 rounded-lg w-3/4 mx-auto animate-pulse" />
      </div>
    </div>
  );
};

export const SkeletonNav = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-32 bg-muted/30 rounded animate-pulse" />
          <nav className="ml-10 hidden space-x-6 md:flex">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-muted/20 rounded animate-pulse" />
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-muted/20 rounded-full animate-pulse" />
          <div className="h-10 w-24 bg-muted/30 rounded-lg animate-pulse" />
        </div>
      </div>
    </header>
  );
};
