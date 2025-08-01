import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Common Button component
 * Props:
 * - to: if provided, renders a <Link>
 * - type: button type (button, submit, etc.)
 * - onClick: click handler
 * - className: additional classes
 * - children: button content
 * - ...rest: any other props
 *
 * Usage:
 * <Button>Text</Button>
 * <Button btnType="primary">Text</Button>
 * <Button to="/route">Go</Button>
 */
const Button = ({
  to,
  type = 'button',
  onClick,
  className = '',
  btnType = 'primary', // 'primary', 'secondary', etc.
  children,
  ...rest
}) => {
  const baseClass = 'btn';
  const typeClass = btnType ? `btn-${btnType}` : '';
  const allClasses = `${baseClass} ${typeClass} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={allClasses} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={allClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;
