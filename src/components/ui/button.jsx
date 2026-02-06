import React from "react";
import { Button } from "./ui/button";
export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
