import MainApp from "../../../src/App";

export default function Preview({ onDocsClick }: { onDocsClick: () => void }) {
  return <MainApp onDocsClick={onDocsClick} />;
}
