import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white border border-slate-100/80 rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.03),0_5px_15px_rgba(0,0,0,0.02)] transition-all duration-300 ${
        hoverEffect ? "hover:-translate-y-0.5 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] hover:border-slate-200" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return <div className={`flex flex-col gap-1.5 mb-6 ${className}`} {...props}>{children}</div>;
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <h3
      className={`text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <p
      className={`text-sm sm:text-base text-zinc-500 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return <div className={`flex-1 ${className}`} {...props}>{children}</div>;
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return <div className={`flex items-center gap-4 mt-6 ${className}`} {...props}>{children}</div>;
};
