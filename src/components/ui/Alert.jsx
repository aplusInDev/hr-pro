import React from 'react'
import '../../assets/css/Alert.css';

export default function Alert({ title, body }) {
  return (
    <div className='alert-card'>
      <h1>{title}</h1>
      <span>{body}</span>
    </div>
  )
}
