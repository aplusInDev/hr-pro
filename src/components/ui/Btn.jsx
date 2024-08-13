import React from 'react'

export default function Btn(props) {
  const className = ' ' + props.className || ''
  return (
    <button
      className={`btn${className}`}
      type='button'
      onClick={props.onClick}
    >
      {props.text}
      {props.children}
    </button>
  )
}
