import { useState } from "react";
import {
  UserBubble, AIResponse, AIActions, Composer,
  StatusPill, Card, CardHeader, Divider, ListItem, TabToggle,
  colors,
} from "../../../src/lib";

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="docs-section">
      <div className="docs-section-title">{title}</div>
      {desc && <p className="docs-section-desc">{desc}</p>}
      <div className="docs-demo-box">{children}</div>
    </div>
  );
}

export default function Chat() {
  const [composerValue, setComposerValue] = useState("");
  const [submitted, setSubmitted] = useState<string[]>([]);

  function handleSubmit() {
    if (composerValue.trim()) {
      setSubmitted(prev => [...prev, composerValue.trim()]);
      setComposerValue("");
    }
  }

  return (
    <div>
      <h1 className="docs-page-title">Chat</h1>
      <p className="docs-page-subtitle">
        Conversational UI components for AI-powered financial assistants.
      </p>

      <Section title="UserBubble" desc="Right-aligned message bubble for user messages.">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <UserBubble>Am I paying for subscriptions I don't need?</UserBubble>
          <UserBubble>How much did I spend on dining last month?</UserBubble>
          <UserBubble>Show me my investment performance YTD.</UserBubble>
        </div>
      </Section>

      <Section title="AIResponse" desc="Left-aligned AI response container — accepts any React children.">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <AIResponse>
            <StatusPill>Reviewing subscriptions</StatusPill>
            <p style={{ marginTop: 16, marginBottom: 0 }}>
              I can see you're paying for <strong>4 fitness memberships</strong> across three providers — about <strong>$537/month</strong> total.
            </p>
          </AIResponse>
          <AIResponse>
            <p style={{ margin: 0 }}>
              Canceling your yoga and pilates memberships would save <strong>$329/month</strong> — about <strong>$3,948/year</strong>.
            </p>
          </AIResponse>
        </div>
      </Section>

      <Section title="AIActions" desc="Feedback and utility action bar below an AI response.">
        <AIActions
          onCopy={() => alert("Copied!")}
          onLike={() => {}}
          onDislike={() => {}}
          onRegenerate={() => {}}
          onShare={() => {}}
        />
      </Section>

      <Section title="Composer" desc="Multi-line textarea + submit button for user input.">
        <Composer
          placeholder="Ask anything about your finances…"
          value={composerValue}
          onValueChange={setComposerValue}
          onSubmit={handleSubmit}
        />
        {submitted.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div className="docs-label">Submitted messages</div>
            {submitted.map((msg, i) => (
              <div key={i} style={{ fontSize: 14, color: "#374151", padding: "6px 0", borderBottom: "1px solid #f3f4f6" }}>{msg}</div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Full conversation example" desc="A complete chat thread with embedded components.">
        <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 24 }}>
          <UserBubble>Am I paying for subscriptions I don't need?</UserBubble>

          <AIResponse>
            <StatusPill>Reviewing subscriptions</StatusPill>
            <p style={{ marginTop: 16, marginBottom: 0 }}>
              I can see you're paying for <strong>4 fitness memberships</strong> across three providers — about <strong>$537/month</strong> total.
            </p>
          </AIResponse>

          <Card variant="compact">
            <CardHeader
              title="Subscriptions"
              amount="$630"
              right={
                <div style={{ marginTop: 8 }}>
                  <TabToggle options={["Monthly", "Annual"]} value="Monthly" onChange={() => {}} />
                </div>
              }
            />
            <Divider />
            <ListItem icon="PP" iconBg="#0A0A0A"         name="Pilates Pirates"       meta="Monthly · June 4"  amount="$200.00" />
            <ListItem icon="L"  iconBg={colors.data[500]} name="Luke's Local Gym"      meta="Monthly · June 10" amount="$33.00" />
            <ListItem icon="🌸" iconBg="#F8BBD0" iconColor={colors.text.primary} name="Go-Go Yoga" meta="Monthly · June 10" amount="$129.00" />
            <ListItem icon="B"  iconBg="#7E57C2"          name="Bend & Snap Studios"   meta="Monthly · June 10" amount="$175.00" />
          </Card>

          <AIResponse>
            <p style={{ margin: 0 }}>
              Canceling your yoga and pilates memberships would save <strong>$329/month</strong> — about <strong>$3,948/year</strong>.
            </p>
          </AIResponse>

          <AIActions onCopy={() => {}} onLike={() => {}} onDislike={() => {}} onRegenerate={() => {}} onShare={() => {}} />

          <Composer
            placeholder="Ask anything about your finances…"
            value={composerValue}
            onValueChange={setComposerValue}
            onSubmit={handleSubmit}
          />
        </div>
      </Section>
    </div>
  );
}
