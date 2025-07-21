import { Clock, Zap, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface RuntimeAnalysisProps {
  executionTime: number; // in milliseconds
  memoryUsage: number; // in MB
  timeComplexity: string;
  spaceComplexity: string;
  comparison: {
    betterThan: number; // percentage
    rank: string;
  };
}

export const RuntimeAnalysis = ({ 
  executionTime, 
  memoryUsage, 
  timeComplexity, 
  spaceComplexity, 
  comparison 
}: RuntimeAnalysisProps) => {
  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 90) return { label: "Excellent", variant: "bg-success text-success-foreground" as const };
    if (percentage >= 75) return { label: "Good", variant: "bg-warning text-warning-foreground" as const };
    if (percentage >= 50) return { label: "Average", variant: "bg-secondary text-secondary-foreground" as const };
    return { label: "Needs Improvement", variant: "bg-destructive text-destructive-foreground" as const };
  };

  const performanceBadge = getPerformanceBadge(comparison.betterThan);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Runtime Analysis</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Execution Time */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Execution Time</div>
              <div className="text-lg font-semibold">{executionTime}ms</div>
              <div className="text-xs text-muted-foreground mt-1">
                Time Complexity: <code className="bg-code-bg px-1 rounded">{timeComplexity}</code>
              </div>
            </div>
          </div>
        </Card>

        {/* Memory Usage */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <Zap className="h-4 w-4 text-secondary" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Memory Usage</div>
              <div className="text-lg font-semibold">{memoryUsage.toFixed(2)} MB</div>
              <div className="text-xs text-muted-foreground mt-1">
                Space Complexity: <code className="bg-code-bg px-1 rounded">{spaceComplexity}</code>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Comparison */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-warning" />
              <span className="font-semibold">Performance Ranking</span>
            </div>
            <Badge className={performanceBadge.variant}>
              {performanceBadge.label}
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Beats {comparison.betterThan}% of submissions</span>
              <span className={`font-medium ${getPerformanceColor(comparison.betterThan)}`}>
                {comparison.rank}
              </span>
            </div>
            <Progress value={comparison.betterThan} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Runtime</div>
              <div className={`text-sm font-medium ${getPerformanceColor(comparison.betterThan)}`}>
                {comparison.betterThan >= 80 ? 'Fast' : comparison.betterThan >= 60 ? 'Average' : 'Slow'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Memory</div>
              <div className={`text-sm font-medium ${getPerformanceColor(comparison.betterThan)}`}>
                {comparison.betterThan >= 75 ? 'Efficient' : comparison.betterThan >= 50 ? 'Average' : 'Heavy'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Overall</div>
              <div className={`text-sm font-medium ${getPerformanceColor(comparison.betterThan)}`}>
                {performanceBadge.label}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};