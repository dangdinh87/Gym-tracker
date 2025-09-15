import { cn } from "@/lib/utils";

interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function PageHeader({ children, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4 pb-8", className)}>
      {children}
    </div>
  );
}

interface PageHeaderHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function PageHeaderHeading({ children, className }: PageHeaderHeadingProps) {
  return (
    <h1 className={cn("text-4xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent", className)}>
      {children}
    </h1>
  );
}

interface PageHeaderDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageHeaderDescription({ children, className }: PageHeaderDescriptionProps) {
  return (
    <p className={cn("text-xl text-muted-foreground max-w-2xl", className)}>
      {children}
    </p>
  );
}