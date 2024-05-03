
export default function FIsRequired({ obj, onChange, disabled=false }) {

  return (
    <input type='checkbox'
      disabled={disabled}
      checked={obj.is_required}
      onChange={(e) => onChange({...obj, is_required: e.target.checked})}
    />
  )
}
