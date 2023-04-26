

// function extractFunctionInfo(fileContent: string, language: string): { name: string; startLine: number; endLine: number }[] {
//     const functionInfo: { name: string; startLine: number; endLine: number }[] = [];
//     const lines = fileContent.split('\n');

//     let regex;
//     let openBracket: string;
//     let closeBracket: string;
//     switch (language) {
//         case 'c':
//         case 'cpp':
//             regex = /^(?:\w+\s+)?(\w+)\s*\(([\w\s,*]*)\)\s*(?:\w+)?\s*\{/;
//             openBracket = '{';
//             closeBracket = '}';
//             break;
//         case 'python':
//             regex = /^def\s+(\w+)\s*\(([\w\s,=]*)\)\s*:/;
//             openBracket = ':';
//             closeBracket = 'UNDEFINED';
//             break;
//         case 'go':
//             regex = /^func\s+(\w+)\s*\(([\w\s,*]*)\)\s*(?:\((?:[\w\s,*]*)\))?\s*\{/;
//             openBracket = '{';
//             closeBracket = '}';
//             break;
//         default:
//             return functionInfo;
//     }

//     for (let startLine = 0; startLine < lines.length; startLine++) {
//         const line = lines[startLine];
//         const match = line.match(regex);

//         if (match) {
//             const functionName = match[1];

//             let endLine = startLine;
//             let bracketCount = language === 'python' ? 0 : 1;
//             if (language !== 'python') {
//                 endLine++;
//             }

//             for (; endLine < lines.length; endLine++) {
//                 const endLineContent = lines[endLine];

//                 if (language === 'python' && endLineContent.trim() === '' && bracketCount === 0) {
//                     break;
//                 }

//                 if (endLineContent.includes(openBracket)) {
//                     bracketCount++;
//                 }

//                 if (endLineContent.includes(closeBracket)) {
//                     bracketCount--;
//                 }

//                 if (bracketCount === 0) {
//                     break;
//                 }
//             }

//             functionInfo.push({ name: functionName, startLine, endLine });
//         }
//     }

//     return functionInfo;
// }


// function insertComment(fileContent: string, comment: string, lineNumber: number): string {
//     const lines = fileContent.split('\n');
//     const formattedComment = formatComment(comment);

//     lines.splice(lineNumber, 0, formattedComment);
//     return lines.join('\n');
// }

// function formatComment(comment: string): string {
//     return `// ${comment}`;
// }
