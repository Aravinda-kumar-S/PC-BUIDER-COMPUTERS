import React from 'react';

const SectionHeading = ({ children, className = '', style = {}, containerClassName = '' }) => {
  return (
    <div className={`section-heading-container ${containerClassName}`.trim()} style={style}>
      <div className="section-heading-line"></div>
      <h2 className={`section-title ${className}`.trim()}>{children}</h2>
    </div>
  );
};

export default SectionHeading;
