import { useState } from 'react';

export default function useCustomState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => setValue(e.target.value);
  return [value, handleChange];
}
