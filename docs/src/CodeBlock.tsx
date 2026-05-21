export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="docs-code-block"><code>{code.trim()}</code></pre>
  );
}
