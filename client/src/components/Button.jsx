import React from 'react';
import {Link} from "react-router-dom"

function Button({text, color, to}) {
  return (
    <Link to={to}>
      <button 
        className={`outline-none text-lg p-1 px-3 bg-[${color}] text-white rounded-md`}
      >{text}</button>
    </Link>
  );
}
export default Button;