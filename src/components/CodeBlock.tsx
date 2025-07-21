import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  editable?: boolean;
  onChange?: (code: string) => void;
}

export const CodeBlock = ({ code, language = "javascript", title, editable = false, onChange }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCode = (code: string) => {
    // Simple syntax highlighting for demonstration
    return code
      .replace(/\b(function|const|let|var|if|else|for|while|return|true|false|null|undefined)\b/g, '<span class="text-syntax-keyword font-semibold">$1</span>')
      .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="text-syntax-string">$1$2$3</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-syntax-number">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-syntax-comment italic">$1</span>');
  };

  return (
    <div className="bg-code-bg border border-code-border rounded-lg overflow-hidden">
      {title && (
        <div className="bg-muted px-4 py-2 border-b border-code-border flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 w-6 p-0"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
      )}
      <div className="p-4">
        {editable ? (
          <textarea
            value={code}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full h-32 bg-transparent text-foreground font-mono text-sm resize-none border-none outline-none"
            placeholder="Generated code will appear here..."
          />
        ) : (
          <pre className="text-sm">
            <code
              className="font-mono text-foreground"
              dangerouslySetInnerHTML={{ __html: formatCode(code) }}
            />
          </pre>
        )}
      </div>
    </div>
  );
};