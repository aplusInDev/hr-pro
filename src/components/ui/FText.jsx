
export default function FText({ fname, obj, onChange, disabled=false }) {

  return (
    <input type='text'
      name={fname}
      placeholder={fname}
      disabled={disabled}
      value={obj[fname]}
      onChange={(e) => {onChange({...obj, [fname]: e.target.value})}}
    />
  );
}
