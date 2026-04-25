import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";

interface PageHeaderProps {
  title: string;
  subline?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subline,
  breadcrumbs,
  className,
  children,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative border-b bg-gradient-to-b from-muted/60 via-background to-background pt-10 pb-14 md:pt-16 md:pb-20",
        className,
      )}
    >
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} className="mb-6" />
        )}
        <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subline && (
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
            {subline}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </header>
  );
}
