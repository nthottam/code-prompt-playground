import { useState } from "react";
import { Play, Trophy, Users, Zap, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProblemStatement } from "@/components/ProblemStatement";
import { AIPromptInput } from "@/components/AIPromptInput";
import { CodeBlock } from "@/components/CodeBlock";
import { TestCases, TestCase } from "@/components/TestCases";
import { useToast } from "@/hooks/use-toast";

const sampleProblem = {
  title: "Two Sum",
  difficulty: "Easy" as const,
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]"
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]"
    }
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists"
  ]
};

const initialTestCases: TestCase[] = [
  {
    id: 1,
    input: "nums = [2,7,11,15], target = 9",
    expectedOutput: "[0,1]",
    status: 'pending'
  },
  {
    id: 2,
    input: "nums = [3,2,4], target = 6",
    expectedOutput: "[1,2]",
    status: 'pending'
  },
  {
    id: 3,
    input: "nums = [3,3], target = 6",
    expectedOutput: "[0,1]",
    status: 'pending'
  }
];

const Index = () => {
  const [generatedCode, setGeneratedCode] = useState("");
  const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const handleGenerateCode = async (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI code generation
    setTimeout(() => {
      const sampleCode = `function twoSum(nums, target) {
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return [];
}`;
      setGeneratedCode(sampleCode);
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
      const results: TestCase[] = [
        { ...initialTestCases[0], status: 'passed', actualOutput: '[0,1]' },
        { ...initialTestCases[1], status: 'passed', actualOutput: '[1,2]' },
        { ...initialTestCases[2], status: 'passed', actualOutput: '[0,1]' }
      ];
      
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

    toast({
      title: "Solution Submitted!",
      description: "Your solution has been submitted for comparison with others.",
    });
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Problem Statement */}
          <div className="space-y-6">
            <ProblemStatement {...sampleProblem} />
            
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
