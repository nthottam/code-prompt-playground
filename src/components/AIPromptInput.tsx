import { useState } from "react";
import { Send, Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface AIPromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const AIPromptInput = ({ 
  onSubmit, 
  isLoading = false, 
  placeholder = "Describe how to solve this problem using natural language..."
}: AIPromptInputProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const examplePrompts = [
    "Use a hash map to track elements and their indices",
    "Implement a two-pointer approach from both ends",
    "Use binary search to find the target efficiently"
  ];

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">AI Code Generator</h3>
      </div>
      
      <div className="space-y-3">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[120px] resize-none bg-background/50 border-border focus:border-primary transition-colors"
        />
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Press Cmd/Ctrl + Enter to generate
          </span>
          <Button 
            onClick={handleSubmit}
            disabled={!prompt.trim() || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Generate Code
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-warning" />
          <span className="text-sm font-medium">Example prompts:</span>
        </div>
        <div className="space-y-1">
          {examplePrompts.map((example, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="h-auto p-2 text-left justify-start text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setPrompt(example)}
            >
              "{example}"
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};