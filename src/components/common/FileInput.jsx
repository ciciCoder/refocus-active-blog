import React from 'react';

/**
 * Description
 * @param {JSX.IntrinsicElements['input']} props
 * @returns {any}
 */
function FileInput(props, ref) {
  const { children, id, ...attrs } = props;
  return (
    <div>
      <input id={id} {...attrs} type="file" hidden ref={ref} />
      <label
        htmlFor={id}
        className="btn-rect btn-hover relative cursor-pointer"
      >
        {children}
      </label>
    </div>
  );
}

export default React.forwardRef(FileInput);
