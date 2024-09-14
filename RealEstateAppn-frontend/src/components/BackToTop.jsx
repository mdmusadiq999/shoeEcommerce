import React, { useEffect } from 'react';

function BackToTop() {
  useEffect(() => {
    const handleScroll = () => {
      const backToTop = document.querySelector('.back-to-top');
      if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      className="back-to-top" 
      onClick={handleClick} 
      style={{ 
        display: "inline-block",
        backgroundColor: "#FF4500", // Changed to a vibrant orange
        width: '50px',
        height: '50px',
        textAlign: 'center',
        borderRadius: '50px',
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        transition: 'background-color 0.3s, opacity 0.5s, visibility 0.5s',
        opacity: '0',
        visibility: 'hidden',
        zIndex: '1000'
      }}>
      <i style={{color:"#fff"}} className="bi bi-arrow-up"></i>
    </button>
  );
}

export default BackToTop;
