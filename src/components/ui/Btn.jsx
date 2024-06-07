import React from 'react'

export default function Btn(props) {
  return (
    <button
      className={`btn ${props.className}`}
      type='button'
      onClick={props.onClick}
    >
      {props.text}
      {props.children}
    </button>
  )
}
