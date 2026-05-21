interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export function ApiTable({ props }: { props: Prop[] }) {
  return (
    <table className="docs-api-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((p) => (
          <tr key={p.name}>
            <td><code>{p.name}{p.required ? ' *' : ''}</code></td>
            <td><code>{p.type}</code></td>
            <td>{p.default ? <code>{p.default}</code> : <span className="docs-muted">—</span>}</td>
            <td>{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
