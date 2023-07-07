import React from 'react';
import './TextArea.css';

/**
 * Description
 * @param {JSX.IntrinsicElements['textarea'] & {errorMessage: string}} props
 * @returns {JSX.Element}
 */
function TextArea(props, ref) {
  const { label, id, children, errorMessage, ...attrs } = props;

  return (
    <div className="TextArea flex flex-col gap-[20px]">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...attrs} ref={ref}>
        {children}
      </textarea>
      {errorMessage && <p className="text-error py-1">{errorMessage}</p>}
    </div>
  );
}

export default React.forwardRef(TextArea);
