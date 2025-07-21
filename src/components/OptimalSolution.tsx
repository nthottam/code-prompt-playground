import { Target, BookOpen, Lightbulb, Code2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CodeBlock } from "@/components/CodeBlock";
import { Problem } from "@/data/problems";

interface OptimalSolutionProps {
  problem: Problem;
  userComplexity: {
    time: string;
    space: string;
  };
}

export const OptimalSolution = ({ problem, userComplexity }: OptimalSolutionProps) => {
  const isOptimal = userComplexity.time === problem.solution.timeComplexity && 
                   userComplexity.space === problem.solution.spaceComplexity;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Optimal Solution Analysis</h3>
        {isOptimal && (
          <Badge className="bg-success text-success-foreground ml-2">
            Your solution is optimal!
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complexity Comparison */}
        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Complexity Comparison
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Time Complexity</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="bg-code-bg px-2 py-1 rounded text-sm">
                  Your: {userComplexity.time}
                </code>
                <span className="text-muted-foreground">vs</span>
                <code className="bg-success/10 text-success px-2 py-1 rounded text-sm">
                  Optimal: {problem.solution.timeComplexity}
                </code>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Space Complexity</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="bg-code-bg px-2 py-1 rounded text-sm">
                  Your: {userComplexity.space}
                </code>
                <span className="text-muted-foreground">vs</span>
                <code className="bg-success/10 text-success px-2 py-1 rounded text-sm">
                  Optimal: {problem.solution.spaceComplexity}
                </code>
              </div>
            </div>
          </div>
        </Card>

        {/* Key Insights */}
        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Key Insights
          </h4>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Data Structures Used:</div>
              {problem.solution.dataStructures.map((ds, index) => (
                <div key={index} className="text-sm">
                  <code className="bg-primary/10 text-primary px-2 py-1 rounded mr-2">
                    {ds.name}
                  </code>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Algorithm Pattern:</div>
              <div className="text-sm text-muted-foreground">
                {problem.solution.logicExplanation}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Detailed Analysis
        </h4>
        
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="optimal-code">
            <AccordionTrigger>Optimal Solution Code</AccordionTrigger>
            <AccordionContent>
              <CodeBlock
                code={problem.solution.code}
                title="JavaScript"
                editable={false}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-structures">
            <AccordionTrigger>Data Structures Deep Dive</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {problem.solution.dataStructures.map((ds, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">{ds.name}</h5>
                    <p className="text-sm text-muted-foreground">{ds.reason}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="algorithm-logic">
            <AccordionTrigger>Algorithm Logic Breakdown</AccordionTrigger>
            <AccordionContent>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {problem.solution.logicExplanation}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="improvements">
            <AccordionTrigger>Potential Improvements</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {problem.solution.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm text-muted-foreground">{improvement}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};