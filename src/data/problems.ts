export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  category: string;
  topics: string[];
  solution: {
    code: string;
    timeComplexity: string;
    spaceComplexity: string;
    dataStructures: Array<{
      name: string;
      reason: string;
    }>;
    logicExplanation: string;
    improvements: string[];
  };
  testCases: Array<{
    id: number;
    input: string;
    expectedOutput: string;
    status: 'pending' | 'passed' | 'failed' | 'running';
  }>;
}

export const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
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
    ],
    category: "Array",
    topics: ["Hash Table", "Array"],
    solution: {
      code: `function twoSum(nums, target) {
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return [];
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      dataStructures: [
        {
          name: "Hash Map (Map)",
          reason: "Provides O(1) average lookup time for checking if complement exists and storing value-index pairs. This is crucial for achieving linear time complexity instead of nested loops."
        }
      ],
      logicExplanation: "Single-pass hash table approach: For each element, calculate its complement (target - current). If complement exists in map, we found our pair. Otherwise, store current element and its index for future lookups.",
      improvements: [
        "Consider edge cases like duplicate values",
        "Add input validation for null/undefined arrays",
        "Use early return pattern for cleaner code",
        "Consider using object instead of Map for simpler syntax in some environments"
      ]
    },
    testCases: [
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
    ]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets in the correct order.",
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    category: "String",
    topics: ["Stack", "String"],
    solution: {
      code: `function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in map) {
            const topElement = stack.length === 0 ? '#' : stack.pop();
            if (map[char] !== topElement) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      dataStructures: [
        {
          name: "Stack (Array)",
          reason: "Stack's LIFO (Last In, First Out) property perfectly matches the nested structure of valid parentheses. Each opening bracket waits for its corresponding closing bracket."
        },
        {
          name: "Hash Map (Object)",
          reason: "Provides O(1) lookup for matching closing brackets to their corresponding opening brackets, making the code clean and efficient."
        }
      ],
      logicExplanation: "Use stack to track opening brackets. When encountering closing bracket, check if it matches the most recent opening bracket (stack top). Valid string has all brackets properly matched and stack empty at end.",
      improvements: [
        "Early termination when string length is odd",
        "Use array methods like push/pop for clearer intent",
        "Consider using Set for opening brackets check",
        "Add input validation for non-bracket characters"
      ]
    },
    testCases: [
      {
        id: 1,
        input: 's = "()"',
        expectedOutput: "true",
        status: 'pending'
      },
      {
        id: 2,
        input: 's = "()[]{}"',
        expectedOutput: "true",
        status: 'pending'
      },
      {
        id: 3,
        input: 's = "(]"',
        expectedOutput: "false",
        status: 'pending'
      }
    ]
  },
  {
    id: 3,
    title: "Reverse Linked List",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]"
      },
      {
        input: "head = [1,2]",
        output: "[2,1]"
      },
      {
        input: "head = []",
        output: "[]"
      }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    category: "Linked List",
    topics: ["Linked List", "Recursion"],
    solution: {
      code: `function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        let nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      dataStructures: [
        {
          name: "Three Pointers",
          reason: "Use prev, current, and next pointers to iteratively reverse links. This approach uses constant space compared to recursive solutions."
        }
      ],
      logicExplanation: "Iterative approach: Maintain three pointers (prev, current, next). For each node, save next node, reverse current's link to point to prev, then advance all pointers. Continue until current becomes null.",
      improvements: [
        "Consider recursive solution for elegance (trades space for readability)",
        "Add null check at function start",
        "Use descriptive variable names like nextNode instead of nextTemp",
        "Consider edge cases like single node or empty list"
      ]
    },
    testCases: [
      {
        id: 1,
        input: "head = [1,2,3,4,5]",
        expectedOutput: "[5,4,3,2,1]",
        status: 'pending'
      },
      {
        id: 2,
        input: "head = [1,2]",
        expectedOutput: "[2,1]",
        status: 'pending'
      },
      {
        id: 3,
        input: "head = []",
        expectedOutput: "[]",
        status: 'pending'
      }
    ]
  }
];