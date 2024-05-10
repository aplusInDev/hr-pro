import React, { useState, useEffect } from 'react';

const TemporaryComponent = ({ duration }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isVisible ? <div>Your Component</div> : null;
};

export default TemporaryComponent

// Usage
//<TemporaryComponent duration={5000} /> // The component will be visible for 5 seconds
