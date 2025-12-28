// import React, { useRef, useEffect, useState } from 'react';
// import { Play, Copy, Download, Trash2 } from 'lucide-react';
// import '../styles/components/SQLEditor.scss';

// const SQLEditor: React.FC = () => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const monacoEditorRef = useRef<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [output, setOutput] = useState('');

//   useEffect(() => {
//     let isSubscribed = true;

//     const initMonaco = async () => {
//       if (!editorRef.current) return;

//       const script = document.createElement('script');
//       script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js';
//       script.async = true;

//       script.onload = () => {
//         (window as any).require.config({
//           paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }
//         });

//         (window as any).require(['vs/editor/editor.main'], () => {
//           if (!isSubscribed || !editorRef.current) return;

//           monacoEditorRef.current = (window as any).monaco.editor.create(editorRef.current, {
//             value: `-- Write your SQL query here\nSELECT * FROM users\nWHERE created_at > '2024-01-01'\nORDER BY id DESC\nLIMIT 10;`,
//             language: 'sql',
//             theme: 'vs-light',
//             automaticLayout: true,
//             fontSize: 14,
//             minimap: { enabled: false },
//             scrollBeyondLastLine: false,
//             lineNumbers: 'on',
//             renderWhitespace: 'selection',
//             tabSize: 2,
//           });

//           setIsLoading(false);
//         });
//       };

//       document.body.appendChild(script);
//     };

//     initMonaco();

//     return () => {
//       isSubscribed = false;
//       if (monacoEditorRef.current) {
//         monacoEditorRef.current.dispose();
//       }
//     };
//   }, []);

//   const handleRun = () => {
//     if (monacoEditorRef.current) {
//       const query = monacoEditorRef.current.getValue();
//       setOutput(`Query executed:\n${query}\n\n(This is a demo - connect to a database to see real results)`);
//     }
//   };

//   const handleCopy = async () => {
//     if (monacoEditorRef.current) {
//       const query = monacoEditorRef.current.getValue();
//       await navigator.clipboard.writeText(query);
//       setOutput('Query copied to clipboard!');
//     }
//   };

//   const handleDownload = () => {
//     if (monacoEditorRef.current) {
//       const query = monacoEditorRef.current.getValue();
//       const blob = new Blob([query], { type: 'text/plain' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'query.sql';
//       a.click();
//       URL.revokeObjectURL(url);
//     }
//   };

//   const handleClear = () => {
//     if (monacoEditorRef.current) {
//       monacoEditorRef.current.setValue('');
//       setOutput('');
//     }
//   };

//   return (
//     <div className="sql-editor-container">
//       <div className="toolbar">
//         <h1>Input</h1>
//         <div className="button-group">
//           <button onClick={handleRun} disabled={isLoading} className="btn-run">
//             <Play size={16} />
//             Run
//           </button>
//           <button onClick={handleCopy} disabled={isLoading} className="btn-copy">
//             <Copy size={16} />
//             Copy
//           </button>
//           <button onClick={handleDownload} disabled={isLoading} className="btn-download">
//             <Download size={16} />
//             Download
//           </button>
//           <button onClick={handleClear} disabled={isLoading} className="btn-clear">
//             <Trash2 size={16} />
//             Clear
//           </button>
//         </div>
//       </div>

//       <div className="content-wrapper">
//         <div className="editor-container">
//           {isLoading && (
//             <div className="loading-overlay">
//               <div>Loading editor...</div>
//             </div>
//           )}
//           <div ref={editorRef} className="editor-wrapper" />
//         </div>

//         {output && (
//           <div className="output-panel">
//             <div className="output-label">Output:</div>
//             <pre>{output}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SQLEditor;

// --------------------------------------------------------------

// import React, { useRef, useEffect, useState } from 'react';
// import { Play, Copy, Download, Trash2, RefreshCw } from 'lucide-react';
// import '../styles/components/SQLEditor.scss';

// // Types for database structure
// interface TableSchema {
//   name: string;
//   columns: {
//     name: string;
//     type: string;
//     primaryKey?: boolean;
//   }[];
//   data: Record<string, any>[];
// }

// interface DatabaseSchema {
//   tables: TableSchema[];
// }

// // Mock API response - Replace this with actual API call
// const fetchDatabaseSchema = async (): Promise<DatabaseSchema> => {
//   // TODO: Replace with actual API call
//   // const response = await fetch('/api/database/schema');
//   // return response.json();

//   return {
//     tables: [
//       {
//         name: 'users',
//         columns: [
//           { name: 'id', type: 'INTEGER', primaryKey: true },
//           { name: 'name', type: 'TEXT' },
//           { name: 'email', type: 'TEXT' },
//           { name: 'created_at', type: 'TEXT' },
//           { name: 'role', type: 'TEXT' },
//         ],
//         data: [
//           { id: 1, name: 'Alice Johnson', email: 'alice@example.com', created_at: '2024-01-15', role: 'admin' },
//           { id: 2, name: 'Bob Smith', email: 'bob@example.com', created_at: '2024-02-20', role: 'user' },
//           { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', created_at: '2024-03-10', role: 'user' },
//           { id: 4, name: 'Diana Prince', email: 'diana@example.com', created_at: '2024-04-05', role: 'moderator' },
//           { id: 5, name: 'Eve Davis', email: 'eve@example.com', created_at: '2024-05-12', role: 'user' },
//         ],
//       },
//       {
//         name: 'orders',
//         columns: [
//           { name: 'id', type: 'INTEGER', primaryKey: true },
//           { name: 'user_id', type: 'INTEGER' },
//           { name: 'product', type: 'TEXT' },
//           { name: 'amount', type: 'INTEGER' },
//           { name: 'order_date', type: 'TEXT' },
//         ],
//         data: [
//           { id: 1, user_id: 1, product: 'Laptop', amount: 1200, order_date: '2024-06-01' },
//           { id: 2, user_id: 2, product: 'Mouse', amount: 25, order_date: '2024-06-05' },
//           { id: 3, user_id: 1, product: 'Keyboard', amount: 75, order_date: '2024-06-10' },
//           { id: 4, user_id: 3, product: 'Monitor', amount: 300, order_date: '2024-06-15' },
//           { id: 5, user_id: 4, product: 'Webcam', amount: 80, order_date: '2024-06-20' },
//         ],
//       },
//     ],
//   };
// };

// const SQLEditor: React.FC = () => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const monacoEditorRef = useRef<any>(null);
//   const dbRef = useRef<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSqlJsLoaded, setIsSqlJsLoaded] = useState(false);
//   const [isLoadingSchema, setIsLoadingSchema] = useState(false);
//   const [output, setOutput] = useState<any>(null);
//   const [error, setError] = useState<string>('');
//   const [databaseSchema, setDatabaseSchema] = useState<DatabaseSchema | null>(null);

//   // Load database schema from API
//   const loadDatabaseSchema = async () => {
//     try {
//       setIsLoadingSchema(true);
//       const schema = await fetchDatabaseSchema();
//       setDatabaseSchema(schema);
//       return schema;
//     } catch (err) {
//       console.error('Failed to load database schema:', err);
//       setError('Failed to load database schema');
//       return null;
//     } finally {
//       setIsLoadingSchema(false);
//     }
//   };

//   // Initialize SQL.js with dynamic schema
//   const initializeSqlDatabase = async (schema: DatabaseSchema) => {
//     try {
//       const SQL = await (window as any).initSqlJs({
//         locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
//       });

//       const db = new SQL.Database();

//       // Create tables and insert data dynamically
//       schema.tables.forEach(table => {
//         // Create table
//         const columns = table.columns
//           .map(col => {
//             let colDef = `${col.name} ${col.type}`;
//             if (col.primaryKey) colDef += ' PRIMARY KEY';
//             return colDef;
//           })
//           .join(', ');

//         db.run(`CREATE TABLE ${table.name} (${columns})`);

//         // Insert data
//         table.data.forEach(row => {
//           const columnNames = Object.keys(row).join(', ');
//           const placeholders = Object.keys(row).map(() => '?').join(', ');
//           const values = Object.values(row);

//           db.run(
//             `INSERT INTO ${table.name} (${columnNames}) VALUES (${placeholders})`,
//             values
//           );
//         });
//       });

//       dbRef.current = db;
//       setIsSqlJsLoaded(true);
//       console.log('SQL.js database initialized with dynamic schema');
//     } catch (err) {
//       console.error('Failed to initialize SQL.js:', err);
//       setError('Failed to initialize SQL.js database');
//     }
//   };

//   // Initialize SQL.js
//   useEffect(() => {
//     const initSqlJs = async () => {
//       try {
//         const script = document.createElement('script');
//         script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
//         script.async = true;

//         script.onload = async () => {
//           // Load schema from API
//           const schema = await loadDatabaseSchema();
//           if (schema) {
//             await initializeSqlDatabase(schema);
//           }
//         };

//         document.body.appendChild(script);
//       } catch (err) {
//         console.error('Failed to load SQL.js:', err);
//         setError('Failed to load SQL.js library');
//       }
//     };

//     initSqlJs();
//   }, []);

//   // Initialize Monaco Editor
//   useEffect(() => {
//     let isSubscribed = true;

//     const initMonaco = async () => {
//       if (!editorRef.current) return;

//       const script = document.createElement('script');
//       script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js';
//       script.async = true;

//       script.onload = () => {
//         (window as any).require.config({
//           paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }
//         });

//         (window as any).require(['vs/editor/editor.main'], () => {
//           if (!isSubscribed || !editorRef.current) return;

//           monacoEditorRef.current = (window as any).monaco.editor.create(editorRef.current, {
//             value: `-- Write your SQL queries here
// -- Tables will be loaded dynamically from the API

// SELECT * FROM users;

// SELECT * FROM users WHERE role = 'admin';

// SELECT u.name, o.product, o.amount
// FROM users u
// JOIN orders o ON u.id = o.user_id;`,
//             language: 'sql',
//             theme: 'vs-light',
//             automaticLayout: true,
//             fontSize: 14,
//             minimap: { enabled: false },
//             scrollBeyondLastLine: false,
//             lineNumbers: 'on',
//             renderWhitespace: 'selection',
//             tabSize: 2,
//           });

//           setIsLoading(false);
//         });
//       };

//       document.body.appendChild(script);
//     };

//     initMonaco();

//     return () => {
//       isSubscribed = false;
//       if (monacoEditorRef.current) {
//         monacoEditorRef.current.dispose();
//       }
//     };
//   }, []);

//   const executeSQL = (query: string) => {
//     if (!dbRef.current) {
//       setError('Database not initialized yet');
//       return;
//     }

//     try {
//       setError('');
//       console.log('Executing query:', query);

//       const results = dbRef.current.exec(query);

//       if (results.length === 0) {
//         // Query executed but returned no results (INSERT, UPDATE, DELETE)
//         setOutput({ type: 'success', message: 'Query executed successfully' });
//       } else {
//         // Query returned results (SELECT)
//         const result = results[0];
//         const columns = result.columns;
//         const values = result.values;

//         const data = values.map((row: any[]) => {
//           const obj: any = {};
//           columns.forEach((col: string, i: number) => {
//             obj[col] = row[i];
//           });
//           return obj;
//         });

//         setOutput({ type: 'select', data });
//       }
//     } catch (err: any) {
//       console.error('SQL Error:', err);
//       setError(err.message || 'Query execution failed');
//       setOutput(null);
//     }
//   };

//   const handleRun = () => {
//     if (!monacoEditorRef.current) return;
//     if (!isSqlJsLoaded) {
//       setError('Database is still loading. Please wait...');
//       return;
//     }

//     const fullText = monacoEditorRef.current.getValue();

//     // Remove SQL comments (-- style)
//     const withoutComments = fullText
//       .split('\n')
//       .map((line: string) => {
//         const commentIndex = line.indexOf('--');
//         return commentIndex >= 0 ? line.substring(0, commentIndex) : line;
//       })
//       .join('\n');

//     // Split by semicolon and find first non-empty query
//     const queries = withoutComments
//       .split(';')
//       .map((q: string) => q.trim())
//       .filter((q: string) => q.length > 0);

//     console.log('All queries found:', queries);

//     if (queries.length > 0) {
//       executeSQL(queries[0]);
//     } else {
//       setError('No valid SQL query found');
//     }
//   };

//   const handleRefresh = async () => {
//     if (isLoadingSchema) return;

//     setOutput(null);
//     setError('');
//     setIsSqlJsLoaded(false);

//     const schema = await loadDatabaseSchema();
//     if (schema) {
//       await initializeSqlDatabase(schema);
//     }
//   };

//   const handleCopy = async () => {
//     if (monacoEditorRef.current) {
//       const query = monacoEditorRef.current.getValue();
//       await navigator.clipboard.writeText(query);
//       setOutput({ type: 'info', message: 'Query copied to clipboard!' });
//     }
//   };

//   const handleDownload = () => {
//     if (monacoEditorRef.current) {
//       const query = monacoEditorRef.current.getValue();
//       const blob = new Blob([query], { type: 'text/plain' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'query.sql';
//       a.click();
//       URL.revokeObjectURL(url);
//     }
//   };

//   const handleClear = () => {
//     if (monacoEditorRef.current) {
//       monacoEditorRef.current.setValue('');
//       setOutput(null);
//       setError('');
//     }
//   };

//   return (
//     <div className="sql-editor-container">
//       <div className="toolbar">
//         <h1>SQL Editor</h1>
//         <div className="button-group">
//           <button onClick={handleRun} disabled={isLoading || !isSqlJsLoaded} className="btn-run">
//             <Play size={16} />
//             Run
//           </button>
//           <button onClick={handleRefresh} disabled={isLoadingSchema} className="btn-refresh">
//             <RefreshCw size={16} className={isLoadingSchema ? 'spinning' : ''} />
//             Refresh
//           </button>
//           <button onClick={handleCopy} disabled={isLoading} className="btn-copy">
//             <Copy size={16} />
//             Copy
//           </button>
//           <button onClick={handleDownload} disabled={isLoading} className="btn-download">
//             <Download size={16} />
//             Download
//           </button>
//           <button onClick={handleClear} disabled={isLoading} className="btn-clear">
//             <Trash2 size={16} />
//             Clear
//           </button>
//         </div>
//       </div>

//       <div className="content-wrapper">
//         <div className="editor-section">
//           <div className="editor-container">
//             {isLoading && (
//               <div className="loading-overlay">
//                 <div>Loading editor...</div>
//               </div>
//             )}
//             <div ref={editorRef} className="editor-wrapper" />
//           </div>

//           <div className="output-panel">
//             <div className="output-label">Output:</div>

//             {(!isSqlJsLoaded || isLoadingSchema) && !error && (
//               <div className="success-message">
//                 {isLoadingSchema ? 'Refreshing database...' : 'Loading SQL.js database...'}
//               </div>
//             )}

//             {error && (
//               <div className="error-message">{error}</div>
//             )}

//             {output && output.type === 'select' && output.data.length > 0 && (
//               <>
//                 <table className="result-table">
//                   <thead>
//                     <tr>
//                       {Object.keys(output.data[0]).map((key: string) => (
//                         <th key={key}>{key}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {output.data.map((row: any, i: number) => (
//                       <tr key={i}>
//                         {Object.values(row).map((val: any, j: number) => (
//                           <td key={j}>{String(val)}</td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <div className="result-info">{output.data.length} row(s) returned</div>
//               </>
//             )}

//             {output && output.type === 'select' && output.data.length === 0 && (
//               <div className="result-info">Query returned 0 rows</div>
//             )}

//             {output && output.type === 'success' && (
//               <div className="success-message">{output.message}</div>
//             )}

//             {output && output.type === 'info' && (
//               <div className="success-message">{output.message}</div>
//             )}
//           </div>
//         </div>

//         <div className="schema-panel">
//           <div className="schema-title">Database Schema</div>

//           {isLoadingSchema ? (
//             <div className="loading-message">Loading schema...</div>
//           ) : databaseSchema ? (
//             databaseSchema.tables.map(table => (
//               <div key={table.name} className="table-section">
//                 <div className="table-name">{table.name}</div>
//                 <div className="table-data">
//                   <table>
//                     <thead>
//                       <tr>
//                         {table.columns.map(col => (
//                           <th key={col.name}>
//                             {col.name}
//                             {col.primaryKey && <span className="pk-badge">PK</span>}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {table.data.slice(0, 5).map((row, i) => (
//                         <tr key={i}>
//                           {table.columns.map(col => (
//                             <td key={col.name}>{String(row[col.name])}</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   <div className="row-count">
//                     {table.data.length} rows {table.data.length > 5 && '(showing first 5)'}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="error-message">No schema loaded</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SQLEditor;

// --------------------------------------------------------------

// import React, { useRef, useEffect, useState } from "react";
// import { Play, Trash2 } from "lucide-react";
// import "../styles/components/SQLEditor.scss";

// // Types for database structure
// interface TableSchema {
//   name: string;
//   columns: {
//     name: string;
//     type: string;
//     primaryKey?: boolean;
//   }[];
//   data: Record<string, any>[];
// }

// interface DatabaseSchema {
//   tables: TableSchema[];
// }

// // Question bank with sample tables
// const questionBank = [
//   {
//     qid: 1,
//     title: "Find High Salary Employees",
//     description: "Easy",
//     question: "List all employees earning more than 50,000",
//     expectedOutput: {
//       type: "table",
//       value: [
//         { id: 2, name: "Bob", salary: 60000, department: "Engineering" },
//         { id: 3, name: "Charlie", salary: 75000, department: "Engineering" },
//       ],
//     },
//     sampleTables: [
//       {
//         tableName: "employees",
//         columns: [
//           { columnName: "id", dataType: "INTEGER" },
//           { columnName: "name", dataType: "TEXT" },
//           { columnName: "salary", dataType: "INTEGER" },
//           { columnName: "department", dataType: "TEXT" },
//         ],
//         rows: [
//           { id: 1, name: "Alice", salary: 45000, department: "HR" },
//           { id: 2, name: "Bob", salary: 60000, department: "Engineering" },
//           { id: 3, name: "Charlie", salary: 75000, department: "Engineering" },
//           { id: 4, name: "Diana", salary: 48000, department: "Sales" },
//         ],
//       },
//     ],
//   },
//   {
//     qid: 2,
//     title: "Department-wise Employee Count",
//     description: "Medium",
//     question: "Find the number of employees in each department",
//     expectedOutput: {
//       type: "table",
//       value: [
//         { department: "HR", count: 1 },
//         { department: "Engineering", count: 2 },
//         { department: "Sales", count: 2 },
//       ],
//     },
//     sampleTables: [
//       {
//         tableName: "employees",
//         columns: [
//           { columnName: "id", dataType: "INTEGER" },
//           { columnName: "name", dataType: "TEXT" },
//           { columnName: "department", dataType: "TEXT" },
//         ],
//         rows: [
//           { id: 1, name: "Alice", department: "HR" },
//           { id: 2, name: "Bob", department: "Engineering" },
//           { id: 3, name: "Charlie", department: "Engineering" },
//           { id: 4, name: "Diana", department: "Sales" },
//           { id: 5, name: "Eve", department: "Sales" },
//         ],
//       },
//     ],
//   },
//   {
//     qid: 3,
//     title: "Total Order Value per Customer",
//     description: "Medium",
//     question: "Find total order value for each customer",
//     expectedOutput: {
//       type: "table",
//       value: [
//         { name: "Aman", total_amount: 2000.5 },
//         { name: "Saurabh", total_amount: 1500.0 },
//       ],
//     },
//     sampleTables: [
//       {
//         tableName: "customers",
//         columns: [
//           { columnName: "id", dataType: "INTEGER" },
//           { columnName: "name", dataType: "TEXT" },
//         ],
//         rows: [
//           { id: 1, name: "Aman" },
//           { id: 2, name: "Saurabh" },
//         ],
//       },
//       {
//         tableName: "orders",
//         columns: [
//           { columnName: "id", dataType: "INTEGER" },
//           { columnName: "customer_id", dataType: "INTEGER" },
//           { columnName: "amount", dataType: "REAL" },
//         ],
//         rows: [
//           { id: 1, customer_id: 1, amount: 1200.5 },
//           { id: 2, customer_id: 1, amount: 800.0 },
//           { id: 3, customer_id: 2, amount: 1500.0 },
//         ],
//       },
//     ],
//   },
//   {
//     qid: 4,
//     title: "Highest Paid Employee",
//     description: "Hard",
//     question: "Find the employee(s) with the highest salary",
//     expectedOutput: {
//       type: "table",
//       value: [
//         { id: 2, name: "Bob", salary: 85000 },
//         { id: 3, name: "Charlie", salary: 85000 },
//       ],
//     },
//     sampleTables: [
//       {
//         tableName: "employees",
//         columns: [
//           { columnName: "id", dataType: "INTEGER" },
//           { columnName: "name", dataType: "TEXT" },
//           { columnName: "salary", dataType: "INTEGER" },
//         ],
//         rows: [
//           { id: 1, name: "Alice", salary: 70000 },
//           { id: 2, name: "Bob", salary: 85000 },
//           { id: 3, name: "Charlie", salary: 85000 },
//         ],
//       },
//     ],
//   },
// ];

// // Convert question bank format to DatabaseSchema format
// const convertToDatabaseSchema = (questionData: any): DatabaseSchema => {
//   const tables: TableSchema[] = questionData.sampleTables.map((table: any) => {
//     return {
//       name: table.tableName,
//       columns: table.columns.map((col: any) => ({
//         name: col.columnName,
//         type: col.dataType,
//         primaryKey: col.columnName === "id",
//       })),
//       data: table.rows,
//     };
//   });

//   return { tables };
// };

// // Fetch database schema based on QID
// const fetchDatabaseSchemaByQID = async (
//   qid: number
// ): Promise<DatabaseSchema> => {
//   // In production, this would be: const response = await fetch(`/api/questions/${qid}`);
//   // For now, we'll use the mock data
//   const questionData = questionBank.find((q) => q.qid === qid);

//   if (!questionData) {
//     throw new Error(`Question with QID ${qid} not found`);
//   }

//   return convertToDatabaseSchema(questionData);
// };

// const SQLEditor: React.FC = () => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const monacoEditorRef = useRef<any>(null);
//   const dbRef = useRef<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSqlJsLoaded, setIsSqlJsLoaded] = useState(false);
//   const [isLoadingSchema, setIsLoadingSchema] = useState(false);
//   const [output, setOutput] = useState<any>(null);
//   const [error, setError] = useState<string>("");
//   const [databaseSchema, setDatabaseSchema] = useState<DatabaseSchema | null>(
//     null
//   );
//   const [currentQID, setCurrentQID] = useState<number>(1);
//   const [currentQuestion, setCurrentQuestion] = useState<any>(null);

//   // Load database schema from API based on QID
//   const loadDatabaseSchema = async (qid: number) => {
//     try {
//       setIsLoadingSchema(true);
//       const schema = await fetchDatabaseSchemaByQID(qid);
//       setDatabaseSchema(schema);

//       // Get question details
//       const questionData = questionBank.find((q) => q.qid === qid);
//       setCurrentQuestion(questionData || null);

//       return schema;
//     } catch (err) {
//       console.error("Failed to load database schema:", err);
//       setError("Failed to load database schema");
//       return null;
//     } finally {
//       setIsLoadingSchema(false);
//     }
//   };

//   // Initialize SQL.js with dynamic schema
//   const initializeSqlDatabase = async (schema: DatabaseSchema) => {
//     try {
//       const SQL = await (window as any).initSqlJs({
//         locateFile: (file: string) =>
//           `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
//       });

//       const db = new SQL.Database();

//       // Create tables and insert data dynamically
//       schema.tables.forEach((table) => {
//         // Create table
//         const columns = table.columns
//           .map((col) => {
//             let colDef = `${col.name} ${col.type}`;
//             if (col.primaryKey) colDef += " PRIMARY KEY";
//             return colDef;
//           })
//           .join(", ");

//         db.run(`CREATE TABLE ${table.name} (${columns})`);

//         // Insert data
//         table.data.forEach((row) => {
//           const columnNames = Object.keys(row).join(", ");
//           const placeholders = Object.keys(row)
//             .map(() => "?")
//             .join(", ");
//           const values = Object.values(row);

//           db.run(
//             `INSERT INTO ${table.name} (${columnNames}) VALUES (${placeholders})`,
//             values
//           );
//         });
//       });

//       dbRef.current = db;
//       setIsSqlJsLoaded(true);
//       console.log("SQL.js database initialized with dynamic schema");
//     } catch (err) {
//       console.error("Failed to initialize SQL.js:", err);
//       setError("Failed to initialize SQL.js database");
//     }
//   };

//   // Initialize SQL.js
//   useEffect(() => {
//     const initSqlJs = async () => {
//       try {
//         const script = document.createElement("script");
//         script.src =
//           "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js";
//         script.async = true;

//         script.onload = async () => {
//           const schema = await loadDatabaseSchema(currentQID);
//           if (schema) {
//             await initializeSqlDatabase(schema);
//           }
//         };

//         document.body.appendChild(script);
//       } catch (err) {
//         console.error("Failed to load SQL.js:", err);
//         setError("Failed to load SQL.js library");
//       }
//     };

//     initSqlJs();
//   }, []);

//   // Initialize Monaco Editor
//   useEffect(() => {
//     let isSubscribed = true;

//     const initMonaco = async () => {
//       if (!editorRef.current) return;

//       const script = document.createElement("script");
//       script.src =
//         "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js";
//       script.async = true;

//       script.onload = () => {
//         (window as any).require.config({
//           paths: {
//             vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs",
//           },
//         });

//         (window as any).require(["vs/editor/editor.main"], () => {
//           if (!isSubscribed || !editorRef.current) return;

//           monacoEditorRef.current = (window as any).monaco.editor.create(
//             editorRef.current,
//             {
//               value: `-- Write your SQL query here
// -- Tables will be loaded based on the selected assignment

// SELECT * FROM employees;`,
//               language: "sql",
//               theme: "vs-light",
//               automaticLayout: true,
//               fontSize: 14,
//               minimap: { enabled: false },
//               scrollBeyondLastLine: false,
//               lineNumbers: "on",
//               renderWhitespace: "selection",
//               tabSize: 2,
//             }
//           );

//           setIsLoading(false);
//         });
//       };

//       document.body.appendChild(script);
//     };

//     initMonaco();

//     return () => {
//       isSubscribed = false;
//       if (monacoEditorRef.current) {
//         monacoEditorRef.current.dispose();
//       }
//     };
//   }, []);

//   const executeSQL = (query: string) => {
//     if (!dbRef.current) {
//       setError("Database not initialized yet");
//       return;
//     }

//     try {
//       setError("");
//       console.log("Executing query:", query);

//       const results = dbRef.current.exec(query);

//       if (results.length === 0) {
//         setOutput({ type: "success", message: "Query executed successfully" });
//       } else {
//         const result = results[0];
//         const columns = result.columns;
//         const values = result.values;

//         const data = values.map((row: any[]) => {
//           const obj: any = {};
//           columns.forEach((col: string, i: number) => {
//             obj[col] = row[i];
//           });
//           return obj;
//         });

//         setOutput({ type: "select", data });
//       }
//     } catch (err: any) {
//       console.error("SQL Error:", err);
//       setError(err.message || "Query execution failed");
//       setOutput(null);
//     }
//   };

//   const handleRun = () => {
//     if (!monacoEditorRef.current) return;
//     if (!isSqlJsLoaded) {
//       setError("Database is still loading. Please wait...");
//       return;
//     }

//     const fullText = monacoEditorRef.current.getValue();

//     const withoutComments = fullText
//       .split("\n")
//       .map((line: string) => {
//         const commentIndex = line.indexOf("--");
//         return commentIndex >= 0 ? line.substring(0, commentIndex) : line;
//       })
//       .join("\n");

//     const queries = withoutComments
//       .split(";")
//       .map((q: string) => q.trim())
//       .filter((q: string) => q.length > 0);

//     if (queries.length > 0) {
//       executeSQL(queries[0]);
//     } else {
//       setError("No valid SQL query found");
//     }
//   };

//   const handleQIDChange = async (qid: number) => {
//     setCurrentQID(qid);
//     setOutput(null);
//     setError("");
//     setIsSqlJsLoaded(false);

//     const schema = await loadDatabaseSchema(qid);
//     if (schema) {
//       await initializeSqlDatabase(schema);
//     }
//   };

//   const handleClear = () => {
//     if (monacoEditorRef.current) {
//       monacoEditorRef.current.setValue("");
//       setOutput(null);
//       setError("");
//     }
//   };

//   return (
//     <div className="sql-editor-container">
//       {/* <div className="toolbar">
//         <div className="toolbar-right">
//           <div className="assignment-selector">
//             <label>Assignment:</label>
//             <select 
//               value={currentQID} 
//               onChange={(e) => handleQIDChange(Number(e.target.value))}
//             >
//               {questionBank.map(question => (
//                 <option key={question.qid} value={question.qid}>
//                   QID {question.qid}: {question.title}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div> */}

//       {currentQuestion && (
//         <div className="question-banner">
//           <div className="question-info">
//             <h3>{currentQuestion.title}</h3>
//             <p className="difficulty">
//               <span className="label">Difficulty:</span>{" "}
//               {currentQuestion.description}
//             </p>
//             <p className="task">
//               <span className="label">Task:</span> {currentQuestion.question}
//             </p>
//           </div>
//           <div className="schema-panel">
//             <div className="schema-title">Available Tables</div>

//             {isLoadingSchema ? (
//               <div className="loading-message">Loading schema...</div>
//             ) : databaseSchema ? (
//               databaseSchema.tables.map((table) => (
//                 <div key={table.name} className="table-section">
//                   <div className="table-name">{table.name}</div>
//                   <div className="table-data">
//                     <table>
//                       <thead>
//                         <tr>
//                           {table.columns.map((col) => (
//                             <th key={col.name}>
//                               {col.name}
//                               {col.primaryKey && (
//                                 <span className="pk-badge">PK</span>
//                               )}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {table.data.slice(0, 5).map((row, i) => (
//                           <tr key={i}>
//                             {table.columns.map((col) => (
//                               <td key={col.name}>{String(row[col.name])}</td>
//                             ))}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                     <div className="row-count">
//                       {table.data.length} rows{" "}
//                       {table.data.length > 5 && "(showing first 5)"}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="error-message">No schema loaded</div>
//             )}
//           </div>
//           <div className="expected-output">
//             <h4>Expected Output:</h4>
//             {currentQuestion.expectedOutput &&
//               currentQuestion.expectedOutput.type === "table" && (
//                 <div className="expected-table-wrapper">
//                   <table className="expected-table">
//                     <thead>
//                       <tr>
//                         {Object.keys(
//                           currentQuestion.expectedOutput.value[0] || {}
//                         ).map((key: string) => (
//                           <th key={key}>{key}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentQuestion.expectedOutput.value.map(
//                         (row: any, i: number) => (
//                           <tr key={i}>
//                             {Object.values(row).map((val: any, j: number) => (
//                               <td key={j}>{String(val)}</td>
//                             ))}
//                           </tr>
//                         )
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//           </div>
//         </div>
//       )}

//       <div className="button-group">
//         <button
//           onClick={handleRun}
//           disabled={isLoading || !isSqlJsLoaded}
//           className="btn-run"
//         >
//           <Play size={16} />
//           Run
//         </button>
//         <button
//           onClick={handleClear}
//           disabled={isLoading}
//           className="btn-clear"
//         >
//           <Trash2 size={16} />
//           Clear
//         </button>
//       </div>

//       <div className="content-wrapper">
//         <div className="editor-section">
//           <div className="editor-container">
//             {isLoading && (
//               <div className="loading-overlay">
//                 <div>Loading editor...</div>
//               </div>
//             )}
//             <div ref={editorRef} className="editor-wrapper" />
//           </div>

//           <div className="output-panel">
//             <div className="output-label">Output:</div>

//             {(!isSqlJsLoaded || isLoadingSchema) && !error && (
//               <div className="success-message">
//                 {isLoadingSchema
//                   ? "Refreshing database..."
//                   : "Loading SQL.js database..."}
//               </div>
//             )}

//             {error && <div className="error-message">{error}</div>}

//             {output && output.type === "select" && output.data.length > 0 && (
//               <>
//                 <table className="result-table">
//                   <thead>
//                     <tr>
//                       {Object.keys(output.data[0]).map((key: string) => (
//                         <th key={key}>{key}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {output.data.map((row: any, i: number) => (
//                       <tr key={i}>
//                         {Object.values(row).map((val: any, j: number) => (
//                           <td key={j}>{String(val)}</td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <div className="result-info">
//                   {output.data.length} row(s) returned
//                 </div>
//               </>
//             )}

//             {output && output.type === "select" && output.data.length === 0 && (
//               <div className="result-info">Query returned 0 rows</div>
//             )}

//             {output && output.type === "success" && (
//               <div className="success-message">{output.message}</div>
//             )}

//             {output && output.type === "info" && (
//               <div className="success-message">{output.message}</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SQLEditor;

// --------------------------------------------------------------

import React, { useRef, useEffect, useState } from "react";
import { Play, Trash2 } from "lucide-react";
import "../styles/components/SQLEditor.scss";

interface TableSchema {
  name: string;
  columns: {
    name: string;
    type: string;
    primaryKey?: boolean;
  }[];
  data: Record<string, any>[];
}

interface DatabaseSchema {
  tables: TableSchema[];
}

const questionBank = [
  {
    qid: 1,
    title: "Find High Salary Employees",
    description: "Easy",
    question: "List all employees earning more than 50,000",
    expectedOutput: {
      type: "table",
      value: [
        { id: 2, name: "Bob", salary: 60000, department: "Engineering" },
        { id: 3, name: "Charlie", salary: 75000, department: "Engineering" },
      ],
    },
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "TEXT" },
          { columnName: "salary", dataType: "INTEGER" },
          { columnName: "department", dataType: "TEXT" },
        ],
        rows: [
          { id: 1, name: "Alice", salary: 45000, department: "HR" },
          { id: 2, name: "Bob", salary: 60000, department: "Engineering" },
          { id: 3, name: "Charlie", salary: 75000, department: "Engineering" },
          { id: 4, name: "Diana", salary: 48000, department: "Sales" },
        ],
      },
    ],
  },
  {
    qid: 2,
    title: "Department-wise Employee Count",
    description: "Medium",
    question: "Find the number of employees in each department",
    expectedOutput: {
      type: "table",
      value: [
        { department: "HR", count: 1 },
        { department: "Engineering", count: 2 },
        { department: "Sales", count: 2 },
      ],
    },
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "TEXT" },
          { columnName: "department", dataType: "TEXT" },
        ],
        rows: [
          { id: 1, name: "Alice", department: "HR" },
          { id: 2, name: "Bob", department: "Engineering" },
          { id: 3, name: "Charlie", department: "Engineering" },
          { id: 4, name: "Diana", department: "Sales" },
          { id: 5, name: "Eve", department: "Sales" },
        ],
      },
    ],
  },
  {
    qid: 3,
    title: "Total Order Value per Customer",
    description: "Medium",
    question: "Find total order value for each customer",
    expectedOutput: {
      type: "table",
      value: [
        { name: "Aman", total_amount: 2000.5 },
        { name: "Saurabh", total_amount: 1500.0 },
      ],
    },
    sampleTables: [
      {
        tableName: "customers",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "TEXT" },
        ],
        rows: [
          { id: 1, name: "Aman" },
          { id: 2, name: "Saurabh" },
        ],
      },
      {
        tableName: "orders",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "customer_id", dataType: "INTEGER" },
          { columnName: "amount", dataType: "REAL" },
        ],
        rows: [
          { id: 1, customer_id: 1, amount: 1200.5 },
          { id: 2, customer_id: 1, amount: 800.0 },
          { id: 3, customer_id: 2, amount: 1500.0 },
        ],
      },
    ],
  },
  {
    qid: 4,
    title: "Highest Paid Employee",
    description: "Hard",
    question: "Find the employee(s) with the highest salary",
    expectedOutput: {
      type: "table",
      value: [
        { id: 2, name: "Bob", salary: 85000 },
        { id: 3, name: "Charlie", salary: 85000 },
      ],
    },
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "TEXT" },
          { columnName: "salary", dataType: "INTEGER" },
        ],
        rows: [
          { id: 1, name: "Alice", salary: 70000 },
          { id: 2, name: "Bob", salary: 85000 },
          { id: 3, name: "Charlie", salary: 85000 },
        ],
      },
    ],
  },
];

const convertToDatabaseSchema = (questionData: any): DatabaseSchema => {
  const tables: TableSchema[] = questionData.sampleTables.map((table: any) => {
    return {
      name: table.tableName,
      columns: table.columns.map((col: any) => ({
        name: col.columnName,
        type: col.dataType,
        primaryKey: col.columnName === "id",
      })),
      data: table.rows,
    };
  });

  return { tables };
};

// Fetch database schema based on QID
const fetchDatabaseSchemaByQID = async (
  qid: number
): Promise<DatabaseSchema> => {
  // In production, this would be: const response = await fetch(`/api/questions/${qid}`);
  // For now, we'll use the mock data
  const questionData = questionBank.find((q) => q.qid === qid);

  if (!questionData) {
    throw new Error(`Question with QID ${qid} not found`);
  }

  return convertToDatabaseSchema(questionData);
};

const SQLEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditorRef = useRef<any>(null);
  const dbRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSqlJsLoaded, setIsSqlJsLoaded] = useState(false);
  const [isLoadingSchema, setIsLoadingSchema] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [databaseSchema, setDatabaseSchema] = useState<DatabaseSchema | null>(
    null
  );
  const [currentQID, setCurrentQID] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  // Load database schema from API based on QID
  const loadDatabaseSchema = async (qid: number) => {
    try {
      setIsLoadingSchema(true);
      const schema = await fetchDatabaseSchemaByQID(qid);
      setDatabaseSchema(schema);

      // Get question details
      const questionData = questionBank.find((q) => q.qid === qid);
      setCurrentQuestion(questionData || null);

      return schema;
    } catch (err) {
      console.error("Failed to load database schema:", err);
      setError("Failed to load database schema");
      return null;
    } finally {
      setIsLoadingSchema(false);
    }
  };

  // Initialize SQL.js with dynamic schema
  const initializeSqlDatabase = async (schema: DatabaseSchema) => {
    try {
      const SQL = await (window as any).initSqlJs({
        locateFile: (file: string) =>
          `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
      });

      const db = new SQL.Database();

      // Create tables and insert data dynamically
      schema.tables.forEach((table) => {
        // Create table
        const columns = table.columns
          .map((col) => {
            let colDef = `${col.name} ${col.type}`;
            if (col.primaryKey) colDef += " PRIMARY KEY";
            return colDef;
          })
          .join(", ");

        db.run(`CREATE TABLE ${table.name} (${columns})`);

        // Insert data
        table.data.forEach((row) => {
          const columnNames = Object.keys(row).join(", ");
          const placeholders = Object.keys(row)
            .map(() => "?")
            .join(", ");
          const values = Object.values(row);

          db.run(
            `INSERT INTO ${table.name} (${columnNames}) VALUES (${placeholders})`,
            values
          );
        });
      });

      dbRef.current = db;
      setIsSqlJsLoaded(true);
      console.log("SQL.js database initialized with dynamic schema");
    } catch (err) {
      console.error("Failed to initialize SQL.js:", err);
      setError("Failed to initialize SQL.js database");
    }
  };

  // Initialize SQL.js
  useEffect(() => {
    const initSqlJs = async () => {
      try {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js";
        script.async = true;

        script.onload = async () => {
          const schema = await loadDatabaseSchema(currentQID);
          if (schema) {
            await initializeSqlDatabase(schema);
          }
        };

        document.body.appendChild(script);
      } catch (err) {
        console.error("Failed to load SQL.js:", err);
        setError("Failed to load SQL.js library");
      }
    };

    initSqlJs();
  }, []);

  // Initialize Monaco Editor
  useEffect(() => {
    let isSubscribed = true;

    const initMonaco = async () => {
      if (!editorRef.current) return;

      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js";
      script.async = true;

      script.onload = () => {
        (window as any).require.config({
          paths: {
            vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs",
          },
        });

        (window as any).require(["vs/editor/editor.main"], () => {
          if (!isSubscribed || !editorRef.current) return;

          monacoEditorRef.current = (window as any).monaco.editor.create(
            editorRef.current,
            {
              value: `-- Write your SQL query here
-- Tables will be loaded based on the selected assignment

SELECT * FROM employees;`,
              language: "sql",
              theme: "vs-light",
              automaticLayout: true,
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "on",
              renderWhitespace: "selection",
              tabSize: 2,
            }
          );

          setIsLoading(false);
        });
      };

      document.body.appendChild(script);
    };

    initMonaco();

    return () => {
      isSubscribed = false;
      if (monacoEditorRef.current) {
        monacoEditorRef.current.dispose();
      }
    };
  }, []);

  const executeSQL = (query: string) => {
    if (!dbRef.current) {
      setError("Database not initialized yet");
      return;
    }

    try {
      setError("");
      console.log("Executing query:", query);

      const results = dbRef.current.exec(query);

      if (results.length === 0) {
        setOutput({ type: "success", message: "Query executed successfully" });
      } else {
        const result = results[0];
        const columns = result.columns;
        const values = result.values;

        const data = values.map((row: any[]) => {
          const obj: any = {};
          columns.forEach((col: string, i: number) => {
            obj[col] = row[i];
          });
          return obj;
        });

        setOutput({ type: "select", data });
      }
    } catch (err: any) {
      console.error("SQL Error:", err);
      setError(err.message || "Query execution failed");
      setOutput(null);
    }
  };

  const handleRun = () => {
    if (!monacoEditorRef.current) return;
    if (!isSqlJsLoaded) {
      setError("Database is still loading. Please wait...");
      return;
    }

    const fullText = monacoEditorRef.current.getValue();

    const withoutComments = fullText
      .split("\n")
      .map((line: string) => {
        const commentIndex = line.indexOf("--");
        return commentIndex >= 0 ? line.substring(0, commentIndex) : line;
      })
      .join("\n");

    const queries = withoutComments
      .split(";")
      .map((q: string) => q.trim())
      .filter((q: string) => q.length > 0);

    if (queries.length > 0) {
      executeSQL(queries[0]);
    } else {
      setError("No valid SQL query found");
    }
  };

  const handleQIDChange = async (qid: number) => {
    setCurrentQID(qid);
    setOutput(null);
    setError("");
    setIsSqlJsLoaded(false);

    const schema = await loadDatabaseSchema(qid);
    if (schema) {
      await initializeSqlDatabase(schema);
    }
  };

  const handleClear = () => {
    if (monacoEditorRef.current) {
      monacoEditorRef.current.setValue("");
      setOutput(null);
      setError("");
    }
  };

  return (
    <div className="sql-editor-container">
      <div className="button-group">
        <button
          onClick={handleRun}
          disabled={isLoading || !isSqlJsLoaded}
          className="btn-run"
        >
          <Play size={16} />
          Run
        </button>
        <button
          onClick={handleClear}
          disabled={isLoading}
          className="btn-clear"
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>

      {/* Question Brief - Shows on mobile only */}
      {currentQuestion && (
        <div className="question-banner mobile-only">
          <div className="question-info">
            <h3>{currentQuestion.title}</h3>
            <p className="difficulty">
              <span className="label">Difficulty:</span>{" "}
              {currentQuestion.description}
            </p>
            <p className="task">
              <span className="label">Task:</span> {currentQuestion.question}
            </p>
          </div>
        </div>
      )}

      <div className="main-layout">
        {/* Left Sidebar - Desktop Only */}
        <div className="left-sidebar">
          {currentQuestion && (
            <>
              {/* Question Brief */}
              <div className="question-banner">
                <div className="question-info">
                  <h3>{currentQuestion.title}</h3>
                  <p className="difficulty">
                    <span className="label">Difficulty:</span>{" "}
                    {currentQuestion.description}
                  </p>
                  <p className="task">
                    <span className="label">Task:</span> {currentQuestion.question}
                  </p>
                </div>
              </div>

              {/* Schema Panel */}
              <div className="schema-panel">
                <div className="schema-title">Available Tables</div>
                {isLoadingSchema ? (
                  <div className="loading-message">Loading schema...</div>
                ) : databaseSchema ? (
                  databaseSchema.tables.map((table) => (
                    <div key={table.name} className="table-section">
                      <div className="table-name">{table.name}</div>
                      <div className="table-data">
                        <table>
                          <thead>
                            <tr>
                              {table.columns.map((col) => (
                                <th key={col.name}>
                                  {col.name}
                                  {col.primaryKey && (
                                    <span className="pk-badge">PK</span>
                                  )}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {table.data.slice(0, 5).map((row, i) => (
                              <tr key={i}>
                                {table.columns.map((col) => (
                                  <td key={col.name}>{String(row[col.name])}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="row-count">
                          {table.data.length} rows{" "}
                          {table.data.length > 5 && "(showing first 5)"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="error-message">No schema loaded</div>
                )}
              </div>

              {/* Expected Output */}
              <div className="expected-output">
                <h4>Expected Output:</h4>
                {currentQuestion.expectedOutput &&
                  currentQuestion.expectedOutput.type === "table" && (
                    <div className="expected-table-wrapper">
                      <table className="expected-table">
                        <thead>
                          <tr>
                            {Object.keys(
                              currentQuestion.expectedOutput.value[0] || {}
                            ).map((key: string) => (
                              <th key={key}>{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {currentQuestion.expectedOutput.value.map(
                            (row: any, i: number) => (
                              <tr key={i}>
                                {Object.values(row).map((val: any, j: number) => (
                                  <td key={j}>{String(val)}</td>
                                ))}
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
              </div>
            </>
          )}
        </div>

        {/* Right Content */}
        <div className="right-content">
          <div className="content-wrapper">
            <div className="editor-section">
              <div className="editor-container">
                {isLoading && (
                  <div className="loading-overlay">
                    <div>Loading editor...</div>
                  </div>
                )}
                <div ref={editorRef} className="editor-wrapper" />
              </div>

              <div className="output-panel">
                <div className="output-label">Output:</div>

                {(!isSqlJsLoaded || isLoadingSchema) && !error && (
                  <div className="success-message">
                    {isLoadingSchema
                      ? "Refreshing database..."
                      : "Loading SQL.js database..."}
                  </div>
                )}

                {error && <div className="error-message">{error}</div>}

                {output && output.type === "select" && output.data.length > 0 && (
                  <>
                    <table className="result-table">
                      <thead>
                        <tr>
                          {Object.keys(output.data[0]).map((key: string) => (
                            <th key={key}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {output.data.map((row: any, i: number) => (
                          <tr key={i}>
                            {Object.values(row).map((val: any, j: number) => (
                              <td key={j}>{String(val)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="result-info">
                      {output.data.length} row(s) returned
                    </div>
                  </>
                )}

                {output && output.type === "select" && output.data.length === 0 && (
                  <div className="result-info">Query returned 0 rows</div>
                )}

                {output && output.type === "success" && (
                  <div className="success-message">{output.message}</div>
                )}

                {output && output.type === "info" && (
                  <div className="success-message">{output.message}</div>
                )}
              </div>
            </div>
          </div>

          {/* Combined Info Panel - Mobile Only */}
          {currentQuestion && (
            <div className="combined-info-panel">
              {/* Schema Panel */}
              <div className="schema-panel">
                <div className="schema-title">Available Tables</div>
                {isLoadingSchema ? (
                  <div className="loading-message">Loading schema...</div>
                ) : databaseSchema ? (
                  databaseSchema.tables.map((table) => (
                    <div key={table.name} className="table-section">
                      <div className="table-name">{table.name}</div>
                      <div className="table-data">
                        <table>
                          <thead>
                            <tr>
                              {table.columns.map((col) => (
                                <th key={col.name}>
                                  {col.name}
                                  {col.primaryKey && (
                                    <span className="pk-badge">PK</span>
                                  )}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {table.data.slice(0, 5).map((row, i) => (
                              <tr key={i}>
                                {table.columns.map((col) => (
                                  <td key={col.name}>{String(row[col.name])}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="row-count">
                          {table.data.length} rows{" "}
                          {table.data.length > 5 && "(showing first 5)"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="error-message">No schema loaded</div>
                )}
              </div>

              {/* Expected Output */}
              <div className="expected-output">
                <h4>Expected Output:</h4>
                {currentQuestion.expectedOutput &&
                  currentQuestion.expectedOutput.type === "table" && (
                    <div className="expected-table-wrapper">
                      <table className="expected-table">
                        <thead>
                          <tr>
                            {Object.keys(
                              currentQuestion.expectedOutput.value[0] || {}
                            ).map((key: string) => (
                              <th key={key}>{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {currentQuestion.expectedOutput.value.map(
                            (row: any, i: number) => (
                              <tr key={i}>
                                {Object.values(row).map((val: any, j: number) => (
                                  <td key={j}>{String(val)}</td>
                                ))}
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SQLEditor;