import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-wide rounded-full whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-98 cursor-pointer";

  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/10 hover:shadow-slate-900/20",
    secondary:
      "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/10 hover:shadow-blue-600/20",
    outline:
      "border border-slate-200 text-slate-700 hover:bg-slate-50 bg-white shadow-sm",
    ghost:
      "text-slate-650 hover:bg-slate-100 hover:text-slate-900 bg-transparent",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
