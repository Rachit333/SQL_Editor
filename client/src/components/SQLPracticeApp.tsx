// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, Clock, FileText, Award } from "lucide-react";
// import "../styles/components/sql-practice-app.scss";

// // Types
// interface Assignment {
//   qid: number;
//   title: string;
//   category: string;
//   difficulty: "Beginner" | "Intermediate" | "Advanced";
//   questionCount: number;
//   duration: number;
// }

// interface AssignmentCardProps {
//   assignment: Assignment;
//   onView: (qid: number) => void;
// }

// const mockAssignments: Assignment[] = [
//   {
//     qid: 1,
//     title: "Introduction to SELECT Statements",
//     category: "SQL Basics",
//     difficulty: "Beginner",
//     questionCount: 15,
//     duration: 25,
//   },
//   {
//     qid: 2,
//     title: "Filtering Data with WHERE",
//     category: "SQL Basics",
//     difficulty: "Beginner",
//     questionCount: 20,
//     duration: 30,
//   },
//   {
//     qid: 3,
//     title: "INNER JOIN Fundamentals",
//     category: "Joins",
//     difficulty: "Intermediate",
//     questionCount: 18,
//     duration: 35,
//   },
//   {
//     qid: 4,
//     title: "LEFT and RIGHT JOINS",
//     category: "Joins",
//     difficulty: "Intermediate",
//     questionCount: 16,
//     duration: 30,
//   },
//   {
//     qid: 5,
//     title: "Aggregate Functions Mastery",
//     category: "Advanced SQL",
//     difficulty: "Intermediate",
//     questionCount: 22,
//     duration: 40,
//   },
//   {
//     qid: 6,
//     title: "GROUP BY and HAVING",
//     category: "Advanced SQL",
//     difficulty: "Intermediate",
//     questionCount: 19,
//     duration: 35,
//   },
//   {
//     qid: 7,
//     title: "Subqueries Basics",
//     category: "Subqueries",
//     difficulty: "Intermediate",
//     questionCount: 17,
//     duration: 35,
//   },
//   {
//     qid: 8,
//     title: "Correlated Subqueries",
//     category: "Subqueries",
//     difficulty: "Advanced",
//     questionCount: 14,
//     duration: 40,
//   },
//   {
//     qid: 9,
//     title: "Window Functions Introduction",
//     category: "Advanced SQL",
//     difficulty: "Advanced",
//     questionCount: 20,
//     duration: 45,
//   },
//   {
//     qid: 10,
//     title: "Complex JOIN Scenarios",
//     category: "Joins",
//     difficulty: "Advanced",
//     questionCount: 15,
//     duration: 40,
//   },
//   {
//     qid: 11,
//     title: "CTEs and Recursive Queries",
//     category: "Advanced SQL",
//     difficulty: "Advanced",
//     questionCount: 12,
//     duration: 45,
//   },
//   {
//     qid: 12,
//     title: "Data Manipulation with INSERT, UPDATE, DELETE",
//     category: "SQL Basics",
//     difficulty: "Beginner",
//     questionCount: 18,
//     duration: 30,
//   },
// ];

// // API service structure - ready for real implementation
// const assignmentService = {
//   // Future: Replace with axios.get('/api/assignments')
//   fetchAssignments: async (): Promise<Assignment[]> => {
//     return new Promise((resolve) => {
//       setTimeout(() => resolve(mockAssignments), 300);
//     });
//   },
// };

// const AssignmentCard: React.FC<AssignmentCardProps> = ({
//   assignment,
//   onView,
// }) => {
//   const categoryClass = assignment.category.toLowerCase().replace(/\s+/g, "-");
//   const difficultyClass = assignment.difficulty.toLowerCase();

//   return (
//     <div className={`assignment-card assignment-card--${categoryClass}`}>
//       <div className="assignment-card__header">
//         <span
//           className={`assignment-card__difficulty assignment-card__difficulty--${difficultyClass}`}
//         >
//           {assignment.difficulty}
//         </span>
//         <Award className="assignment-card__icon" />
//       </div>

//       <h3 className="assignment-card__title">{assignment.title}</h3>

//       <div className="assignment-card__category">
//         <span className="assignment-card__category-badge">
//           {assignment.category}
//         </span>
//       </div>

//       <div className="assignment-card__meta">
//         <div className="assignment-card__meta-item">
//           <FileText className="assignment-card__meta-icon" />
//           <span>{assignment.questionCount} questions</span>
//         </div>
//         <div className="assignment-card__meta-item">
//           <Clock className="assignment-card__meta-icon" />
//           <span>{assignment.duration} min</span>
//         </div>
//       </div>

//       <button
//         onClick={() => onView(assignment.qid)}
//         className="assignment-card__button"
//       >
//         Start Practice
//       </button>
//     </div>
//   );
// };

// const SQLPracticeApp: React.FC = () => {
//   const navigate = useNavigate();
//   const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");
//   const [loading, setLoading] = useState<boolean>(false);

//   React.useEffect(() => {
//     loadAssignments();
//   }, []);

//   const loadAssignments = async () => {
//     setLoading(true);
//     try {
//       const data = await assignmentService.fetchAssignments();
//       setAssignments(data);
//     } catch (error) {
//       console.error("Failed to load assignments:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const categories = ["All", ...new Set(assignments.map((a) => a.category))];

//   const filteredAssignments = useMemo(() => {
//     return assignments.filter((assignment) => {
//       const matchesSearch =
//         assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         assignment.category.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesCategory =
//         selectedCategory === "All" || assignment.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     });
//   }, [assignments, searchQuery, selectedCategory]);

//   const handleView = (qid: number) => {
//     console.log("Starting assignment:", qid);
//     navigate(`/assignment/${qid}`);
//   };

//   return (
//     <div className="practice-app">
//       <div className="practice-app__container">
//         <header className="practice-app__header">
//           <h1 className="practice-app__title">SQL Practice Hub</h1>
//           <p className="practice-app__subtitle">
//             Master SQL through hands-on practice assignments
//           </p>
//         </header>

//         <div className="practice-app__search">
//           <div className="search-bar">
//             <Search className="search-bar__icon" />
//             <input
//               type="text"
//               placeholder="Search assignments..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-bar__input"
//             />
//           </div>
//         </div>

//         <div className="practice-app__filters">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`filter-button ${
//                 selectedCategory === category ? "filter-button--active" : ""
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         <div className="practice-app__stats">
//           <p>
//             <span className="practice-app__count">
//               {filteredAssignments.length}
//             </span>{" "}
//             assignments available
//           </p>
//         </div>

//         {loading ? (
//           <div className="practice-app__loading">
//             <div className="spinner"></div>
//           </div>
//         ) : filteredAssignments.length === 0 ? (
//           <div className="practice-app__empty">
//             <p>No assignments found matching your criteria</p>
//           </div>
//         ) : (
//           <div className="assignments-grid">
//             {filteredAssignments.map((assignment) => (
//               <AssignmentCard
//                 key={assignment.qid}
//                 assignment={assignment}
//                 onView={handleView}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SQLPracticeApp;

// ------------------------------------------------

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, FileText, Award } from "lucide-react";

// Types matching new API structure
interface Column {
  columnName: string;
  dataType: string;
}

interface SampleTable {
  tableName: string;
  columns: Column[];
  rows: Record<string, any>[];
}

interface ExpectedOutput {
  type: string;
  value: Record<string, any>[];
}

interface Question {
  title: string;
  description: string;
  question: string;
  sampleTables: SampleTable[];
  expectedOutput: ExpectedOutput;
  createdAt: string;
  updatedAt: string;
}

// UI Display types
interface Assignment {
  qid: number;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questionCount: number;
  duration: number;
  rawQuestion?: Question;
}

interface AssignmentCardProps {
  assignment: Assignment;
  onView: (qid: number) => void;
}

// Mock data in new format
const mockQuestionsData: Question[] = [
  {
    "title": "Find High Salary Employees",
    "description": "Easy",
    "question": "List all employees earning more than 50,000",
    "sampleTables": [
      {
        "tableName": "employees",
        "columns": [
          { "columnName": "id", "dataType": "INTEGER" },
          { "columnName": "name", "dataType": "TEXT" },
          { "columnName": "salary", "dataType": "INTEGER" },
          { "columnName": "department", "dataType": "TEXT" }
        ],
        "rows": [
          { "id": 1, "name": "Alice", "salary": 45000, "department": "HR" },
          { "id": 2, "name": "Bob", "salary": 60000, "department": "Engineering" },
          { "id": 3, "name": "Charlie", "salary": 75000, "department": "Engineering" },
          { "id": 4, "name": "Diana", "salary": 48000, "department": "Sales" }
        ]
      }
    ],
    "expectedOutput": {
      "type": "table",
      "value": [
        { "id": 2, "name": "Bob", "salary": 60000, "department": "Engineering" },
        { "id": 3, "name": "Charlie", "salary": 75000, "department": "Engineering" }
      ]
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  {
    "title": "Department-wise Employee Count",
    "description": "Medium",
    "question": "Find the number of employees in each department",
    "sampleTables": [
      {
        "tableName": "employees",
        "columns": [
          { "columnName": "id", "dataType": "INTEGER" },
          { "columnName": "name", "dataType": "TEXT" },
          { "columnName": "department", "dataType": "TEXT" }
        ],
        "rows": [
          { "id": 1, "name": "Alice", "department": "HR" },
          { "id": 2, "name": "Bob", "department": "Engineering" },
          { "id": 3, "name": "Charlie", "department": "Engineering" },
          { "id": 4, "name": "Diana", "department": "Sales" },
          { "id": 5, "name": "Eve", "department": "Sales" }
        ]
      }
    ],
    "expectedOutput": {
      "type": "table",
      "value": [
        { "department": "HR", "count": 1 },
        { "department": "Engineering", "count": 2 },
        { "department": "Sales", "count": 2 }
      ]
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  {
    "title": "Total Order Value per Customer",
    "description": "Medium",
    "question": "Find total order value for each customer",
    "sampleTables": [
      {
        "tableName": "customers",
        "columns": [
          { "columnName": "id", "dataType": "INTEGER" },
          { "columnName": "name", "dataType": "TEXT" }
        ],
        "rows": [
          { "id": 1, "name": "Aman" },
          { "id": 2, "name": "Saurabh" }
        ]
      },
      {
        "tableName": "orders",
        "columns": [
          { "columnName": "id", "dataType": "INTEGER" },
          { "columnName": "customer_id", "dataType": "INTEGER" },
          { "columnName": "amount", "dataType": "REAL" }
        ],
        "rows": [
          { "id": 1, "customer_id": 1, "amount": 1200.5 },
          { "id": 2, "customer_id": 1, "amount": 800.0 },
          { "id": 3, "customer_id": 2, "amount": 1500.0 }
        ]
      }
    ],
    "expectedOutput": {
      "type": "table",
      "value": [
        { "name": "Aman", "total_amount": 2000.5 },
        { "name": "Saurabh", "total_amount": 1500.0 }
      ]
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  {
    "title": "Highest Paid Employee",
    "description": "Hard",
    "question": "Find the employee(s) with the highest salary",
    "sampleTables": [
      {
        "tableName": "employees",
        "columns": [
          { "columnName": "id", "dataType": "INTEGER" },
          { "columnName": "name", "dataType": "TEXT" },
          { "columnName": "salary", "dataType": "INTEGER" }
        ],
        "rows": [
          { "id": 1, "name": "Alice", "salary": 70000 },
          { "id": 2, "name": "Bob", "salary": 85000 },
          { "id": 3, "name": "Charlie", "salary": 85000 }
        ]
      }
    ],
    "expectedOutput": {
      "type": "table",
      "value": [
        { "id": 2, "name": "Bob", "salary": 85000 },
        { "id": 3, "name": "Charlie", "salary": 85000 }
      ]
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
];

// Transform new API format to UI format
const transformQuestionToAssignment = (question: Question, index: number): Assignment => {
  const difficultyMap: Record<string, "Beginner" | "Intermediate" | "Advanced"> = {
    "Easy": "Beginner",
    "Medium": "Intermediate",
    "Hard": "Advanced"
  };

  // Categorize based on question content
  const categorizeQuestion = (q: Question): string => {
    const title = q.title.toLowerCase();
    const questionText = q.question.toLowerCase();
    
    if (title.includes("join") || questionText.includes("join")) return "Joins";
    if (title.includes("aggregate") || title.includes("count") || title.includes("sum") || 
        questionText.includes("group by") || questionText.includes("count")) return "Advanced SQL";
    if (title.includes("subquery") || questionText.includes("subquery")) return "Subqueries";
    if (title.includes("window")) return "Advanced SQL";
    return "SQL Basics";
  };

  // Estimate duration based on difficulty
  const estimateDuration = (difficulty: string): number => {
    const durations = { "Easy": 20, "Medium": 30, "Hard": 40 };
    return durations[difficulty as keyof typeof durations] || 25;
  };

  return {
    qid: index + 1,
    title: question.title,
    category: categorizeQuestion(question),
    difficulty: difficultyMap[question.description] || "Beginner",
    questionCount: 1,
    duration: estimateDuration(question.description),
    rawQuestion: question
  };
};

// API service structure
const assignmentService = {
  fetchAssignments: async (): Promise<Assignment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignments = mockQuestionsData.map((q, idx) => 
          transformQuestionToAssignment(q, idx)
        );
        resolve(assignments);
      }, 300);
    });
  },
  
  // Future: Replace with axios.get('/api/questions')
  // fetchQuestions: async (): Promise<Question[]> => {
  //   const response = await axios.get('/api/questions');
  //   return response.data;
  // }
};

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onView,
}) => {
  const categoryClass = assignment.category.toLowerCase().replace(/\s+/g, "-");
  const difficultyClass = assignment.difficulty.toLowerCase();

  return (
    <div 
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '2px solid #e5e7eb',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span
          style={{
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            background: difficultyClass === 'beginner' ? '#dcfce7' : difficultyClass === 'intermediate' ? '#fef3c7' : '#fee2e2',
            color: difficultyClass === 'beginner' ? '#166534' : difficultyClass === 'intermediate' ? '#92400e' : '#991b1b'
          }}
        >
          {assignment.difficulty}
        </span>
        <Award size={20} style={{ color: '#9ca3af' }} />
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: '#111827' }}>
        {assignment.title}
      </h3>

      <div style={{ marginBottom: '16px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            background: '#f3f4f6',
            color: '#4b5563'
          }}
        >
          {assignment.category}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', color: '#6b7280', fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FileText size={16} />
          <span>{assignment.questionCount} question{assignment.questionCount !== 1 ? 's' : ''}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={16} />
          <span>{assignment.duration} min</span>
        </div>
      </div>

      <button
        onClick={() => onView(assignment.qid)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          background: '#3b82f6',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
        onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
      >
        Start Practice
      </button>
    </div>
  );
};

const SQLPracticeApp: React.FC = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false);

  React.useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    setLoading(true);
    try {
      const data = await assignmentService.fetchAssignments();
      setAssignments(data);
    } catch (error) {
      console.error("Failed to load assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(assignments.map((a) => a.category))];

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || assignment.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [assignments, searchQuery, selectedCategory]);

  const handleView = (qid: number) => {
    console.log("Starting assignment:", qid);
    navigate(`/assignment/${qid}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
            SQL Practice Hub
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Master SQL through hands-on practice assignments
          </p>
        </header>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '16px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#9ca3af' 
              }} 
            />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 48px',
                borderRadius: '10px',
                border: '2px solid #e5e7eb',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                border: selectedCategory === category ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                background: selectedCategory === category ? '#eff6ff' : 'white',
                color: selectedCategory === category ? '#3b82f6' : '#6b7280',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ color: '#6b7280' }}>
            <span style={{ fontWeight: '700', color: '#3b82f6', fontSize: '18px' }}>
              {filteredAssignments.length}
            </span>{" "}
            assignments available
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid #e5e7eb',
                borderTop: '4px solid #3b82f6',
                borderRadius: '50%',
                margin: '0 auto',
                animation: 'spin 1s linear infinite'
              }}
            />
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9ca3af' }}>
            <p>No assignments found matching your criteria</p>
          </div>
        ) : (
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '24px' 
            }}
          >
            {filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.qid}
                assignment={assignment}
                onView={handleView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SQLPracticeApp;