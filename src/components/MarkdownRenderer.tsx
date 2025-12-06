import React from 'react';

interface MarkdownRendererProps {
  content: string;
  id?: string;
  className?: string;
}

export default function MarkdownRenderer({ content, id, className }: MarkdownRendererProps) {
  if (!content) return null;

  // Split by double newlines to handle paragraphs
  const paragraphs = content.split(/\n\n+/);

  return (
    <div id={id} className={`space-y-4 text-base leading-relaxed ${className || ''}`}>
      {paragraphs.map((paragraph, pIndex) => {
        // Check if paragraph is a list
        if (paragraph.trim().startsWith('- ') || paragraph.trim().startsWith('• ')) {
          const listItems = paragraph.split(/\n/).filter(line => line.trim().length > 0);
          return (
            <ul key={pIndex} className="list-disc pl-5 space-y-1">
              {listItems.map((item, iIndex) => {
                const cleanItem = item.replace(/^[-•]\s+/, '');
                return <li key={iIndex}>{parseInline(cleanItem)}</li>;
              })}
            </ul>
          );
        }

        // Regular paragraph
        return (
          <p key={pIndex} className="mb-2">
            {paragraph.split(/\n/).map((line, lIndex, arr) => (
              <React.Fragment key={lIndex}>
                {parseInline(line)}
                {lIndex < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function parseInline(text: string): React.ReactNode[] {
  // Regex to match bold (**text**), italic (*text*), and code (`text`)
  // We use a capturing group to split the string including the delimiters
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index} className="italic">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className="bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded font-mono text-sm font-bold">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}
