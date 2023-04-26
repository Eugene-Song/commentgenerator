import * as vscode from 'vscode';
import axios from 'axios';

const CHATGPT_API_KEY = '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';
const CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions';


// const { extractFunctionInfo } = require('util.ts');

// const configuration = new Configuration({
//   organization: "org-rSQbSBbz1Kz6mVKzNC35AkAn",
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai


async function generateComment(functionName: string, functionContent: string, language: string): Promise<string> {
    const prompt = `Generate a comment for the following ${language} function: ${functionName}\n\n${functionContent}\n\n`;
    const currentMessages = [];
    currentMessages.push({ role: "user", content: prompt });
    const response = await axios.post(CHATGPT_API_URL, {
        model: "gpt-3.5-turbo",
        messages: currentMessages,
    }, {
        headers: {
            'Authorization': `Bearer ${CHATGPT_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    const generatedComment = response.data.choices[0]?.message.content;
    console.log(generatedComment);
    return generatedComment || '';
}


// async function generateComment(functionName: string, functionContent: string, language: string) {
//   try {
//     // Make a request to your own API to get the required data
//     const yourApiResponse = await axios.post('https://your-api-url.com/endpoint', {
//       functionName,
//       functionContent,
//       language,
//     });

//     // Process the data from your API as needed
//     const dataForChatGPT = yourApiResponse.data;

//     // Make a request to the ChatGPT API
//     const chatGptApiKey = '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';
//     const chatGptResponse = await axios.post(
//       'https://api.openai.com/v1/engines/davinci-codex/completions',
//       {
//         prompt: `Generate a comment for the following ${language} function:\nFunction name: ${functionName}\nFunction content: ${functionContent}\n`,
//         max_tokens: 50,
//         n: 1,
//         stop: null,
//         temperature: 0.5,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${chatGptApiKey}`,
//         },
//       }
//     );

//     // Extract the generated comment from the ChatGPT response
//     const generatedComment = chatGptResponse.data.choices[0].text.trim();

//     return generatedComment;
//   } catch (error) {
//     console.error('Error generating comment:', error);
//     throw error;
//   }
// }

async function generateCommentsForFile(fileContent: string, language: string): Promise<string> {
    // Replace the following line with a function that extracts function names and their starting line numbers for the specified language.
    const functionInfo = extractFunctionInfo(fileContent, language);

    let newContent = fileContent;
    for (const { name, startLine, endLine } of functionInfo) {
        const content = newContent.split('\n').slice(startLine, endLine).join('\n');
        const comment = await generateComment(name, content, language);
        console.log("!!!!!!!!!comment is ", comment);

        newContent = insertComment(newContent, comment, startLine);
        console.log("!!!!!!!!!!!!newcontent is ", newContent);
    }

    return newContent;
}

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.autoCommentGenerator', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const language = document.languageId;
        const fileContent = document.getText();

        const newContent = await generateCommentsForFile(fileContent, language);

        const firstLine = document.lineAt(0);
        const lastLine = document.lineAt(document.lineCount - 1);
        const entireRange = new vscode.Range(0, firstLine.range.start.character, document.lineCount - 1, lastLine.range.end.character);

        editor.edit(editBuilder => {
            editBuilder.replace(entireRange, newContent);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}




function extractFunctionInfo(fileContent: string, language: string): { name: string; startLine: number; endLine: number }[] {
  const functionInfo: { name: string; startLine: number; endLine: number }[] = [];
  const lines = fileContent.split('\n');

  let regex;
  let openBracket: string;
  let closeBracket: string;
  switch (language) {
      case 'c':
      case 'cpp':
          regex = /^(?:\w+\s+)?(\w+)\s*\(([\w\s,*]*)\)\s*(?:\w+)?\s*\{/;
          openBracket = '{';
          closeBracket = '}';
          break;
      case 'python':
          regex = /^def\s+(\w+)\s*\(([\w\s,=]*)\)\s*:/;
          openBracket = ':';
          closeBracket = 'UNDEFINED';
          break;
      case 'go':
          regex = /^func [^\n]*/;      
          openBracket = '{';
          closeBracket = '}';
          break;
      default:
          return functionInfo;
  }

  for (let startLine = 0; startLine < lines.length; startLine++) {
      const line = lines[startLine];
      const match = line.match(regex);

      if (match) {
          const functionName = match[1];

          let endLine = startLine;
          let bracketCount = language === 'python' ? 0 : 1;
          if (language !== 'python') {
              endLine++;
          }

          for (; endLine < lines.length; endLine++) {
              const endLineContent = lines[endLine];

              if (language === 'python' && endLineContent.trim() === '' && bracketCount === 0) {
                  break;
              }

              if (endLineContent.includes(openBracket)) {
                  bracketCount++;
              }

              if (endLineContent.includes(closeBracket)) {
                  bracketCount--;
              }

              if (bracketCount === 0) {
                  break;
              }
          }

          functionInfo.push({ name: functionName, startLine, endLine });
      }
  }

  return functionInfo;
}


function insertComment(fileContent: string, comment: string, lineNumber: number): string {
  const lines = fileContent.split('\n');
  const formattedComment = formatComment(comment);

  lines.splice(lineNumber, 0, formattedComment);
  return lines.join('\n');
}

function formatComment(comment: string): string {
  return `// ${comment}`;
}
