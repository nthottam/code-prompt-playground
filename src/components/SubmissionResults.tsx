import { CheckCircle, Trophy, BarChart3, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RuntimeAnalysis } from "@/components/RuntimeAnalysis";
import { OptimalSolution } from "@/components/OptimalSolution";
import { Problem } from "@/data/problems";

interface SubmissionResultsProps {
  problem: Problem;
  submissionData: {
    allTestsPassed: boolean;
    executionTime: number;
    memoryUsage: number;
    userComplexity: {
      time: string;
      space: string;
    };
    comparison: {
      betterThan: number;
      rank: string;
    };
  };
  onTryAnother: () => void;
}

export const SubmissionResults = ({ 
  problem, 
  submissionData, 
  onTryAnother 
}: SubmissionResultsProps) => {
  const { allTestsPassed, executionTime, memoryUsage, userComplexity, comparison } = submissionData;

  if (!allTestsPassed) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <Card className="p-6 bg-success/5 border-success/20">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-success/20">
            <CheckCircle className="h-6 w-6 text-success" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-success">Solution Accepted!</h2>
            <p className="text-muted-foreground mt-1">
              Your solution has been submitted and passed all test cases.
            </p>
          </div>
          <Button 
            onClick={onTryAnother}
            variant="outline"
            className="gap-2"
          >
            <Trophy className="h-4 w-4" />
            Try Another Problem
          </Button>
        </div>
      </Card>

      {/* Analysis Tabs */}
      <Tabs defaultValue="runtime" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="runtime" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Runtime Analysis
          </TabsTrigger>
          <TabsTrigger value="optimal" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Optimal Solution
          </TabsTrigger>
        </TabsList>

        <TabsContent value="runtime">
          <RuntimeAnalysis
            executionTime={executionTime}
            memoryUsage={memoryUsage}
            timeComplexity={userComplexity.time}
            spaceComplexity={userComplexity.space}
            comparison={comparison}
          />
        </TabsContent>

        <TabsContent value="optimal">
          <OptimalSolution
            problem={problem}
            userComplexity={userComplexity}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};