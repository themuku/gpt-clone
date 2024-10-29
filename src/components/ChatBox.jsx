import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark, darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "lucide-react";

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
            <CopyToClipboard text={res}>
              <CopyIcon size={16} />
            </CopyToClipboard>
          </div>
          <Markdown
            rehypePlugins={[rehypeKatex]}
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={darcula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
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
