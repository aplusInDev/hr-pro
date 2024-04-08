import React from 'react'

export default function Checkbox({ label }) {
  return (
    <label>
        <input type='checkbox' />
        <span>{label}</span>
    </label>
  )
}
