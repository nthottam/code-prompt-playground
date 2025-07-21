import { ChevronDown, Code, Hash, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Problem } from "@/data/problems";

interface ProblemSelectorProps {
  problems: Problem[];
  currentProblem: Problem;
  onProblemChange: (problem: Problem) => void;
}

export const ProblemSelector = ({ problems, currentProblem, onProblemChange }: ProblemSelectorProps) => {
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

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'array':
        return <Hash className="h-4 w-4" />;
      case 'linked list':
        return <List className="h-4 w-4" />;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getCategoryIcon(currentProblem.category)}
          <div>
            <h3 className="font-semibold">{currentProblem.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getDifficultyColor(currentProblem.difficulty)}>
                {currentProblem.difficulty}
              </Badge>
              <span className="text-xs text-muted-foreground">{currentProblem.category}</span>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              Change Problem
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            {problems.map((problem) => (
              <DropdownMenuItem
                key={problem.id}
                onClick={() => onProblemChange(problem)}
                className="flex items-start gap-3 p-3"
              >
                {getCategoryIcon(problem.category)}
                <div className="flex-1">
                  <div className="font-medium text-sm">{problem.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      className={getDifficultyColor(problem.difficulty)}
                    >
                      {problem.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{problem.category}</span>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};