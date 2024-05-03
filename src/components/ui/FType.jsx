
export default function FType({ obj, onChange, disabled=false }) {
  const options = types.map((type, index) => {
    return <option key={index} value={type}>{type}</option>
  });

  return (
    <select
      disabled={disabled}
      value={obj.type}
      onChange={(e) => onChange({...obj, type: e.target.value})}
    >
      {options}
    </select>
  );
}

const types = [
  "text", "number", "tel",
  "email", "password", "date",
  "checkbox", "select", "texterea",
  "file", "radio"
]
