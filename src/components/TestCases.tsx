import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  status: 'pending' | 'passed' | 'failed' | 'running';
}

interface TestCasesProps {
  testCases: TestCase[];
}

export const TestCases = ({ testCases }: TestCasesProps) => {
  const getStatusIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'running':
        return <Clock className="h-4 w-4 text-secondary animate-spin" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-muted" />;
    }
  };

  const getStatusColor = (status: TestCase['status']) => {
    switch (status) {
      case 'passed':
        return 'border-success bg-success/10';
      case 'failed':
        return 'border-destructive bg-destructive/10';
      case 'running':
        return 'border-secondary bg-secondary/10';
      default:
        return 'border-border bg-card';
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Test Cases</h3>
      {testCases.map((testCase) => (
        <Card key={testCase.id} className={`p-4 transition-all ${getStatusColor(testCase.status)}`}>
          <div className="flex items-start gap-3">
            {getStatusIcon(testCase.status)}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Test Case {testCase.id}</span>
                {testCase.status !== 'pending' && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    testCase.status === 'passed' ? 'bg-success text-success-foreground' :
                    testCase.status === 'failed' ? 'bg-destructive text-destructive-foreground' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {testCase.status.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-muted-foreground">Input:</span>
                  <code className="ml-2 px-2 py-1 bg-code-bg rounded text-foreground font-mono">
                    {testCase.input}
                  </code>
                </div>
                <div>
                  <span className="text-muted-foreground">Expected:</span>
                  <code className="ml-2 px-2 py-1 bg-code-bg rounded text-foreground font-mono">
                    {testCase.expectedOutput}
                  </code>
                </div>
                {testCase.actualOutput !== undefined && (
                  <div>
                    <span className="text-muted-foreground">Actual:</span>
                    <code className={`ml-2 px-2 py-1 bg-code-bg rounded font-mono ${
                      testCase.status === 'passed' ? 'text-success' : 'text-destructive'
                    }`}>
                      {testCase.actualOutput}
                    </code>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};