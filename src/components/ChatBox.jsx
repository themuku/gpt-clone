import { useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CopyIcon, CheckIcon } from "lucide-react";

// Create a separate CodeBlock component to handle copying functionality
const CodeBlock = ({ language, value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="code-block-container relative">
      <button 
        onClick={handleCopy}
        className="copy-code-button absolute top-2 right-2 p-1.5 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        {isCopied ? (
          <CheckIcon size={16} className="text-green-400" />
        ) : (
          <CopyIcon size={16} className="text-gray-300" />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={darcula}
        PreTag="div"
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default function ChatBox({ req, res, time }) {
  return (
    <>
      <p className="request chat-box">
        {req}
        <span className="date">{time}</span>
      </p>
      <div className="response-text chat-box">
        <div className="markdown-container">
          <div className="copy-button-container">
            <button
              onClick={() => navigator.clipboard.writeText(res)}
              className="copy-button"
            >
              <CopyIcon size={16} />
            </button>
          </div>
          <Markdown
            rehypePlugins={[rehypeKatex]}
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const value = String(children).replace(/\n$/, "");
                
                if (!inline && match) {
                  return (
                    <CodeBlock 
                      language={match[1]} 
                      value={value}
                    />
                  );
                }
                
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
            className="markdown"
          >
            {res}
          </Markdown>
        </div>
        <span className="date">{time}</span>
      </div>
    </>
  );
}