import { useState } from "react";
import {
  EmptyState, Skeleton, Toast, Stepper,
  Button, Card,
} from "../../../src/lib";
import { ApiTable } from "../ApiTable";
import { CodeBlock } from "../CodeBlock";

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="docs-section">
      <div className="docs-section-title">{title}</div>
      {desc && <p className="docs-section-desc">{desc}</p>}
      <div className="docs-demo-box">{children}</div>
    </div>
  );
}

export default function Feedback() {
  const [stepperCurrent, setStepperCurrent] = useState(1);
  const [toastVisible, setToastVisible] = useState(true);
  const [warnVisible, setWarnVisible] = useState(true);

  return (
    <div>
      <h1 className="docs-page-title">Feedback</h1>
      <p className="docs-page-subtitle">
        Loading skeletons, empty states, toasts, and step indicators.
      </p>

      <Section title="EmptyState" desc="Zero-state placeholder with title, body, and optional CTA.">
        <div className="docs-grid-2">
          <EmptyState
            title="No transactions yet"
            body="Connect an account to start seeing your money flow in real time."
            action={<Button>Connect account</Button>}
          />
          <EmptyState
            title="No investments found"
            body="Link a brokerage to track your portfolio performance and holdings."
            action={<Button variant="secondary">Add brokerage</Button>}
          />
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "title", type: "ReactNode", required: true, description: "Main heading for the empty state." },
        { name: "icon", type: "ReactNode", default: '"✦"', description: "Icon or emoji shown above the title." },
        { name: "body", type: "ReactNode", description: "Supporting description text." },
        { name: "action", type: "ReactNode", description: "CTA button or link element." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<EmptyState
  icon="📊"
  title="No transactions yet"
  body="Connect an account to start tracking your spending."
  action={<Button>Connect account</Button>}
/>`} />

      <Section title="Skeleton" desc="Loading placeholder shapes for content that is still fetching.">
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <Skeleton variant="circle" />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <Skeleton variant="line-lg" width="60%" />
              <Skeleton variant="line" width="40%" />
            </div>
          </div>
          <Skeleton variant="line-lg" width="80%" />
          <div style={{ marginTop: 8 }}><Skeleton variant="line" width="100%" /></div>
          <div style={{ marginTop: 8 }}><Skeleton variant="line" width="70%" /></div>
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <Skeleton variant="circle" />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <Skeleton variant="line" width="50%" />
                <Skeleton variant="line" width="30%" />
              </div>
              <Skeleton variant="line" width={60} />
            </div>
          </div>
        </Card>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "variant", type: '"line" | "line-lg" | "circle"', default: '"line"', description: "Shape of the skeleton placeholder." },
        { name: "width", type: "string | number", description: "CSS width (e.g. '60%', 120). Overrides the default variant width." },
        { name: "height", type: "string | number", description: "CSS height override." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`{isLoading ? (
  <>
    <Skeleton variant="circle" />
    <Skeleton variant="line-lg" width="60%" />
    <Skeleton variant="line" width="40%" />
  </>
) : <UserProfile user={user} />}`} />

      <Section title="Toast" desc="Inline notification banner with close button. Two variants: default and warning.">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {toastVisible && (
            <Toast onClose={() => setToastVisible(false)}>
              Account connected successfully.
            </Toast>
          )}
          {warnVisible && (
            <Toast type="warning" onClose={() => setWarnVisible(false)}>
              Sync paused — reconnect required.
            </Toast>
          )}
          {(!toastVisible || !warnVisible) && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => { setToastVisible(true); setWarnVisible(true); }}
            >
              Reset toasts
            </Button>
          )}
          <div style={{ marginTop: 8 }}>
            <div className="docs-label">Static examples</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Toast onClose={() => {}}>Transfer completed.</Toast>
              <Toast type="warning" onClose={() => {}}>Daily limit reached.</Toast>
            </div>
          </div>
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "children", type: "ReactNode", required: true, description: "Toast message content." },
        { name: "type", type: '"success" | "warning"', default: '"success"', description: "Visual style: success shows a checkmark, warning shows an exclamation." },
        { name: "onClose", type: "() => void", description: "When provided, renders a close (×) button." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<Toast onClose={() => setVisible(false)}>
  Account connected successfully.
</Toast>

<Toast type="warning" onClose={() => setVisible(false)}>
  Sync paused — reconnect required.
</Toast>`} />

      <Section title="Stepper" desc="Horizontal step progress indicator for multi-step flows.">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Stepper
            steps={["Connect accounts", "Pick goals", "Set budget", "Review"]}
            current={stepperCurrent}
          />
          <div className="docs-row">
            <Button size="sm" variant="secondary" onClick={() => setStepperCurrent(s => Math.max(0, s - 1))}>
              ← Previous
            </Button>
            <span style={{ fontSize: 14, color: "#6b7280" }}>Step {stepperCurrent + 1} of 4</span>
            <Button size="sm" onClick={() => setStepperCurrent(s => Math.min(3, s + 1))}>
              Next →
            </Button>
          </div>

          <div>
            <div className="docs-label">Onboarding example</div>
            <Stepper
              steps={["Create account", "Verify identity", "Link bank", "Go live"]}
              current={2}
            />
          </div>
        </div>
      </Section>
      <div className="docs-subsection-label">Props</div>
      <ApiTable props={[
        { name: "steps", type: "ReactNode[]", required: true, description: "Array of step labels." },
        { name: "current", type: "number", required: true, description: "0-indexed current step. Steps before current are marked done." },
        { name: "className", type: "string", description: "Optional additional CSS class names." },
      ]} />
      <div className="docs-subsection-label">Usage</div>
      <CodeBlock code={`<Stepper
  steps={["Connect accounts", "Pick goals", "Set budget", "Review"]}
  current={step}
/>`} />
    </div>
  );
}
