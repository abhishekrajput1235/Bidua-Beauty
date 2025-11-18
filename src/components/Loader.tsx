import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
      <span>Processing...</span>
    </div>
  );
};

export default Loader;
