import React from 'react';

const SectionHeading = ({ children, className = '', style = {} }) => {
  return (
    <div className="section-heading-container" style={style}>
      <div className="section-heading-line"></div>
      <h2 className={`section-title ${className}`.trim()}>{children}</h2>
    </div>
  );
};

export default SectionHeading;
