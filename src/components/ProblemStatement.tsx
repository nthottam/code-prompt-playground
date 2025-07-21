import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ProblemStatementProps {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints?: string[];
}

export const ProblemStatement = ({ title, difficulty, description, examples, constraints }: ProblemStatementProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-success text-success-foreground';
      case 'Medium':
        return 'bg-warning text-warning-foreground';
      case 'Hard':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Examples</h3>
        {examples.map((example, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="font-medium text-sm">Example {index + 1}:</div>
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-muted-foreground">Input:</span>
                <code className="ml-2 px-2 py-1 bg-code-bg rounded text-foreground font-mono">
                  {example.input}
                </code>
              </div>
              <div>
                <span className="text-muted-foreground">Output:</span>
                <code className="ml-2 px-2 py-1 bg-code-bg rounded text-foreground font-mono">
                  {example.output}
                </code>
              </div>
              {example.explanation && (
                <div>
                  <span className="text-muted-foreground">Explanation:</span>
                  <span className="ml-2 text-foreground">{example.explanation}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {constraints && constraints.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Constraints</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {constraints.map((constraint, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <code className="font-mono">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};