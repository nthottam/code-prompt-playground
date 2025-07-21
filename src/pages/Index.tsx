import { useState } from "react";
import { Play, Trophy, Users, Zap, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProblemStatement } from "@/components/ProblemStatement";
import { AIPromptInput } from "@/components/AIPromptInput";
import { CodeBlock } from "@/components/CodeBlock";
import { TestCases, TestCase } from "@/components/TestCases";
import { ProblemSelector } from "@/components/ProblemSelector";
import { SubmissionResults } from "@/components/SubmissionResults";
import { useToast } from "@/hooks/use-toast";
import { problems, Problem } from "@/data/problems";


const Index = () => {
  const [currentProblem, setCurrentProblem] = useState<Problem>(problems[0]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [testCases, setTestCases] = useState<TestCase[]>(problems[0].testCases);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<any>(null);
  const { toast } = useToast();

  const handleProblemChange = (problem: Problem) => {
    setCurrentProblem(problem);
    setTestCases(problem.testCases);
    setGeneratedCode("");
    setIsSubmitted(false);
    setSubmissionData(null);
    toast({
      title: "Problem Changed",
      description: `Switched to: ${problem.title}`,
    });
  };

  const handleGenerateCode = async (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI code generation
    setTimeout(() => {
      setGeneratedCode(currentProblem.solution.code);
      setIsGenerating(false);
      toast({
        title: "Code Generated!",
        description: "AI has generated a solution based on your prompt.",
      });
    }, 2000);
  };

  const handleRunTests = async () => {
    if (!generatedCode.trim()) {
      toast({
        title: "No Code to Test",
        description: "Please generate code first before running tests.",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    
    // Reset test cases
    setTestCases(prev => prev.map(tc => ({ ...tc, status: 'running' as const, actualOutput: undefined })));

    // Simulate test execution
    setTimeout(() => {
      const results: TestCase[] = currentProblem.testCases.map((tc, index) => ({
        ...tc,
        status: 'passed' as const,
        actualOutput: tc.expectedOutput
      }));
      
      setTestCases(results);
      setIsRunning(false);
      
      const allPassed = results.every(tc => tc.status === 'passed');
      toast({
        title: allPassed ? "All Tests Passed!" : "Some Tests Failed",
        description: allPassed 
          ? "Great! Your solution passes all test cases." 
          : "Check the failing test cases and try again.",
        variant: allPassed ? "default" : "destructive"
      });
    }, 3000);
  };

  const handleSubmit = () => {
    const allPassed = testCases.every(tc => tc.status === 'passed');
    if (!allPassed) {
      toast({
        title: "Cannot Submit",
        description: "All test cases must pass before submission.",
        variant: "destructive"
      });
      return;
    }

    // Generate mock submission data
    const mockSubmissionData = {
      allTestsPassed: true,
      executionTime: Math.floor(Math.random() * 50) + 10, // 10-60ms
      memoryUsage: Math.random() * 5 + 12, // 12-17MB
      userComplexity: {
        time: currentProblem.solution.timeComplexity,
        space: currentProblem.solution.spaceComplexity
      },
      comparison: {
        betterThan: Math.floor(Math.random() * 40) + 60, // 60-100%
        rank: Math.random() > 0.5 ? "Top 25%" : "Top 50%"
      }
    };

    setSubmissionData(mockSubmissionData);
    setIsSubmitted(true);
    
    toast({
      title: "Solution Submitted!",
      description: "Your solution has been analyzed. Check the results below.",
    });
  };

  const handleTryAnother = () => {
    const nextProblemIndex = (problems.findIndex(p => p.id === currentProblem.id) + 1) % problems.length;
    handleProblemChange(problems[nextProblemIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI LeetCode</h1>
              <p className="text-xs text-muted-foreground">Solve coding problems with AI prompts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3" />
              Beta
            </Badge>
            <Button variant="ghost" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Master Coding Problems with AI
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Instead of writing code directly, describe your solution approach and let AI generate the implementation. 
              Perfect for learning algorithms and problem-solving patterns.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-8 pt-8">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              <span className="text-sm">1,000+ Problems</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" />
              <span className="text-sm">10,000+ Developers</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm">AI-Powered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Problem Interface */}
      <section className="container mx-auto px-4 pb-12">
        <div className="space-y-6">
          {/* Problem Selector */}
          <ProblemSelector
            problems={problems}
            currentProblem={currentProblem}
            onProblemChange={handleProblemChange}
          />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Problem Statement */}
            <div className="space-y-6">
              <ProblemStatement
                title={currentProblem.title}
                difficulty={currentProblem.difficulty}
                description={currentProblem.description}
                examples={currentProblem.examples}
                constraints={currentProblem.constraints}
              />
              
              <AIPromptInput 
                onSubmit={handleGenerateCode}
                isLoading={isGenerating}
              />
            </div>

          {/* Right Column - Code and Tests */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Generated Solution</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRunTests}
                    disabled={isRunning || !generatedCode.trim()}
                    className="gap-2"
                  >
                    <Play className="h-4 w-4" />
                    {isRunning ? "Running..." : "Run Tests"}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSubmit}
                    disabled={!testCases.every(tc => tc.status === 'passed')}
                    className="gap-2"
                  >
                    <Trophy className="h-4 w-4" />
                    Submit
                  </Button>
                </div>
              </div>
              
              <CodeBlock
                code={generatedCode || "// Generated code will appear here..."}
                title="JavaScript"
                editable={true}
                onChange={setGeneratedCode}
              />
            </Card>

            <TestCases testCases={testCases} />
          </div>
        </div>
        
        {/* Submission Results */}
        {isSubmitted && submissionData && (
          <div className="mt-12">
            <SubmissionResults
              problem={currentProblem}
              submissionData={submissionData}
              onTryAnother={handleTryAnother}
            />
          </div>
        )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            Built with React, TypeScript, and Tailwind CSS • Powered by AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
