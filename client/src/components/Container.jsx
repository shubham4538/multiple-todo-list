import React from 'react';

function Container({children}) {
  const container = {
    minHeight:'100vh',
  }
  return (
    <div style={container} className="flex flex-col items-center p-8 bg-gray-900">
      {children}
    </div>
  );
}
export default Container;