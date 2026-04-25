import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface StepperStep {
  number: number;
  title: string;
  description?: string;
}

interface ProcessStepperProps {
  steps: StepperStep[];
  className?: string;
  lastHighlighted?: boolean;
}

export function ProcessStepper({
  steps,
  className,
  lastHighlighted = true,
}: ProcessStepperProps) {
  return (
    <ol
      className={cn(
        "relative grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-0",
        className,
      )}
    >
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const highlighted = lastHighlighted && isLast;
        return (
          <li key={step.number} className="relative flex md:flex-col">
            <div className="relative flex shrink-0 items-center md:block">
              <span
                className={cn(
                  "relative z-10 flex size-12 items-center justify-center rounded-full border-2 font-heading text-base font-bold shadow-sm",
                  highlighted
                    ? "border-chart-4 bg-chart-4 text-background"
                    : "border-border bg-background text-foreground",
                )}
              >
                {highlighted ? <Check className="size-5" /> : step.number}
              </span>
              {!isLast && (
                <span
                  aria-hidden
                  className="ml-4 h-px flex-1 border-t-2 border-dashed border-border md:absolute md:left-12 md:top-6 md:ml-0 md:h-0 md:w-[calc(100%-3rem)] md:-translate-y-1/2"
                />
              )}
            </div>
            <div className="ml-4 flex flex-col md:ml-0 md:mt-4 md:pr-4">
              <span className="font-heading text-sm font-semibold">
                {step.title}
              </span>
              {step.description && (
                <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
