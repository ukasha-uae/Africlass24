import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import VennDiagram from './VennDiagram';
import GeometryDiagram from './GeometryDiagram';

interface MarkdownRendererProps {
  content: string;
  id?: string;
  className?: string;
}

export default function MarkdownRenderer({ content, id, className }: MarkdownRendererProps) {
  if (!content) return null;

  // Ensure code blocks are separated by double newlines so they are treated as paragraphs
  const normalizedContent = content
    .replace(/([^\n])\n```/g, '$1\n\n```') // Add newline before code block if missing
    .replace(/```\n([^\n])/g, '```\n\n$1'); // Add newline after code block if missing

  // Split by double newlines to handle paragraphs, but be careful not to split inside code blocks
  // This is a simple implementation; for robust markdown, use a library like react-markdown
  const paragraphs = normalizedContent.split(/\n\n+/);

  return (
    <div id={id} className={`space-y-4 text-base leading-relaxed ${className || ''}`}>
      {paragraphs.map((paragraph, pIndex) => {
        // Check for Venn Diagram code block
        if (paragraph.trim().startsWith('```venn')) {
          try {
            // Extract JSON content using regex to handle potential trailing text
            const vennRegex = /```venn\s*([\s\S]*?)\s*```([\s\S]*)/;
            const match = paragraph.match(vennRegex);
            
            let jsonContent;
            let remainingText = '';

            if (match) {
              jsonContent = match[1];
              remainingText = match[2];
            } else {
              // Fallback for simple cases
              jsonContent = paragraph.replace(/```venn\s*/, '').replace(/```\s*$/, '');
            }

            const props = JSON.parse(jsonContent);
            
            return (
              <React.Fragment key={pIndex}>
                <div className="my-6 flex justify-center">
                  <VennDiagram {...props} />
                </div>
                {remainingText && remainingText.trim().length > 0 && (
                  <div className="mb-2">
                    {remainingText.trim().split(/\n\n+/).map((subPara, spIndex) => (
                      <p key={spIndex} className="mb-2">
                        {subPara.split(/\n/).map((line, lIndex, arr) => (
                          <React.Fragment key={lIndex}>
                            {parseInline(line)}
                            {lIndex < arr.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          } catch (e) {
            console.error("Error parsing Venn diagram JSON:", e);
            return <pre key={pIndex} className="text-red-500">Error rendering diagram</pre>;
          }
        }

        // Check for Geometry Diagram code block
        if (paragraph.trim().startsWith('```geometry')) {
          try {
            // Extract JSON content using regex to handle potential trailing text
            const geoRegex = /```geometry\s*([\s\S]*?)\s*```([\s\S]*)/;
            const match = paragraph.match(geoRegex);
            
            let jsonContent;
            let remainingText = '';

            if (match) {
              jsonContent = match[1];
              remainingText = match[2];
            } else {
              // Fallback for simple cases
              jsonContent = paragraph.replace(/```geometry\s*/, '').replace(/```\s*$/, '');
            }

            const props = JSON.parse(jsonContent);
            
            return (
              <React.Fragment key={pIndex}>
                <div className="my-6 flex justify-center">
                  <GeometryDiagram {...props} />
                </div>
                {remainingText && remainingText.trim().length > 0 && (
                  <div className="mb-2">
                    {remainingText.trim().split(/\n\n+/).map((subPara, spIndex) => (
                      <p key={spIndex} className="mb-2">
                        {subPara.split(/\n/).map((line, lIndex, arr) => (
                          <React.Fragment key={lIndex}>
                            {parseInline(line)}
                            {lIndex < arr.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          } catch (e) {
            console.error("Error parsing Geometry diagram JSON:", e);
            return <pre key={pIndex} className="text-red-500">Error rendering geometry diagram</pre>;
          }
        }

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
  // Regex to match display math ($$text$$), inline math ($text$), bold (**text**), italic (*text*), and code (`text`)
  // We use a capturing group to split the string including the delimiters
  // Note: Check for $$ first so it doesn't get matched as two $
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$|\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      const latex = part.slice(2, -2);
      try {
        const html = katex.renderToString(latex, {
          throwOnError: false,
          displayMode: true
        });
        return <span key={index} dangerouslySetInnerHTML={{ __html: html }} className="my-4 text-center block" />;
      } catch (e) {
        console.error("KaTeX error:", e);
        return <span key={index} className="text-red-500 block">{part}</span>;
      }
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index} className="italic">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className="bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded font-mono text-sm font-bold">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      const latex = part.slice(1, -1);
      try {
        const html = katex.renderToString(latex, {
          throwOnError: false,
          displayMode: false
        });
        return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
      } catch (e) {
        console.error("KaTeX error:", e);
        return <span key={index} className="text-red-500">{part}</span>;
      }
    }
    return part;
  });
}
