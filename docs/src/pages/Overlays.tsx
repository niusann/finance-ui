import { useState } from "react";
import {
  Modal, BottomSheet,
  Button, Field, TextInput, CurrencyInput,
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

export default function Overlays() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [addAccountSheetOpen, setAddAccountSheetOpen] = useState(false);

  return (
    <div>
      <h1 className="docs-page-title">Overlays</h1>
      <p className="docs-page-subtitle">
        Modal dialogs and bottom sheets for confirmations, forms, and contextual actions.
      </p>

      <Section title="Modal" desc="Centered dialog overlay with title, body, and footer action area.">
        <div className="docs-row">
          <Button onClick={() => setModalOpen(true)}>Cancel subscription</Button>
          <Button variant="secondary" onClick={() => setConfirmOpen(true)}>Transfer funds</Button>
        </div>

        <Modal
          open={modalOpen}
          title="Cancel subscription"
          onClose={() => setModalOpen(false)}
          footer={
            <>
              <Button variant="tertiary" onClick={() => setModalOpen(false)}>Keep it</Button>
              <Button onClick={() => setModalOpen(false)}>Cancel anyway</Button>
            </>
          }
        >
          You'll lose access at the end of the current billing cycle (Jun 30). Future renewals won't be charged.
        </Modal>

        <Modal
          open={confirmOpen}
          title="Confirm transfer"
          onClose={() => setConfirmOpen(false)}
          footer={
            <>
              <Button variant="tertiary" onClick={() => setConfirmOpen(false)}>Go back</Button>
              <Button variant="data" onClick={() => setConfirmOpen(false)}>Confirm transfer</Button>
            </>
          }
        >
          <p style={{ margin: "0 0 16px" }}>You are about to transfer:</p>
          <div style={{ background: "#f9fafb", borderRadius: 8, padding: "16px", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#6b7280", fontSize: 14 }}>Amount</span>
              <strong>$2,500.00</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: 14 }}>From</span>
              <span style={{ fontSize: 14 }}>Chase Checking •• 4521</span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
            Funds arrive in 1–2 business days.
          </p>
        </Modal>
      </Section>

      <Section title="BottomSheet" desc="Sheet that slides up from the bottom — ideal for mobile actions.">
        <div className="docs-row">
          <Button variant="secondary" onClick={() => setSheetOpen(true)}>Add to budget</Button>
          <Button variant="secondary" onClick={() => setAddAccountSheetOpen(true)}>Link account</Button>
        </div>

        <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: 16 }}>Add to budget</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Category">
              <TextInput defaultValue="Dining" />
            </Field>
            <Field label="Limit">
              <CurrencyInput defaultValue="600" suffix="/mo" />
            </Field>
            <Button block onClick={() => setSheetOpen(false)}>Save</Button>
          </div>
        </BottomSheet>

        <BottomSheet open={addAccountSheetOpen} onClose={() => setAddAccountSheetOpen(false)}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: 4 }}>Link a bank account</h3>
          <p style={{ fontSize: 14, color: "#6b7280", marginTop: 0, marginBottom: 20 }}>
            Securely connect via Plaid. We never store your credentials.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Button block>Connect with Plaid</Button>
            <Button block variant="secondary" onClick={() => setAddAccountSheetOpen(false)}>Cancel</Button>
          </div>
        </BottomSheet>
      </Section>
    </div>
  );
}
