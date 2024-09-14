import React, { useEffect } from "react";

function Spinner() {
  useEffect(() => {
    const spinnerTimeout = setTimeout(() => {
      const spinner = document.getElementById('spinner');
      if (spinner) {
        spinner.classList.remove('show');
      }
    }, 500);

    return () => clearTimeout(spinnerTimeout);
  }, []);

  return (
    <div id="spinner" className="show bg-light position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
      <div className="spinner-border text-warning" style={{ width: '4rem', height: '4rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
