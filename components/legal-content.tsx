import { cn } from "@/lib/utils";

interface LegalContentProps {
  markdown: string;
  className?: string;
}

/**
 * Sehr einfacher Markdown-Renderer für die Legal-Seiten (Impressum/Datenschutz).
 * Unterstützt: ## / ### Headings, **bold**, - Listen, Absätze.
 */
export function LegalContent({ markdown, className }: LegalContentProps) {
  const blocks = markdown.trim().split(/\n{2,}/);
  return (
    <div className={cn("prose-legal max-w-3xl", className)}>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("## ")) {
          return <h2 key={i}>{trimmed.slice(3)}</h2>;
        }
        if (trimmed.startsWith("### ")) {
          return <h3 key={i}>{trimmed.slice(4)}</h3>;
        }
        if (trimmed.startsWith("- ")) {
          const items = trimmed
            .split("\n")
            .map((l) => l.replace(/^-\s+/, "").trim())
            .filter(Boolean);
          return (
            <ul key={i}>
              {items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{renderInline(trimmed)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIdx = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    parts.push(<strong key={`b-${key++}`}>{match[1]}</strong>);
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts;
}
