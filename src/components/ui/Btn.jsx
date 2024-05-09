import React from 'react'

export default function Btn(props) {
  return (
    <button
      className='btn'
      type='button'
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}
