import React, { useState, useEffect } from 'react';
import '../../assets/css/Alert.css';

export default function Alert({ title, body }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2*1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`alert-card ${isVisible? 'show' : 'hide'}`}>
      <h1>{title}</h1>
      <span>{body}</span>
    </div>
  );
}
