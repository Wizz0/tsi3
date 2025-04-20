import React from "react"

type ButtonProps = {
  size: 'small' | 'medium' | 'large';
  color: 'primary' | 'secondary';
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string; // Добавляем новый пропс
}

export const Button: React.FC<ButtonProps> = ({ 
  size, 
  color, 
  title, 
  onClick,
  children,
  className = '' // Значение по умолчанию
}) => {
  const defaultClass = "flex items-center justify-center px-4 py-2"

  const classes = {
    colors: {
      primary: {
        button: "bg-amber-700 hover:bg-amber-800",
        text: "text-white",
      },
      secondary: {
        button: "bg-red-500 hover:bg-red-600",
        text: "text-white",
      },
    },
    sizes: {
      small: "h-[32px] text-sm rounded-full",
      medium: "h-[40px] text-base rounded-[14px]",
      large: "h-[56px] text-lg rounded-[16px]",
    },
  }

  return (
    <button
      className={
        `${defaultClass} ${classes.sizes[size]} ${classes.colors[color].button} ${className}`
      }
      onClick={onClick}
    >
      {children || <span className={classes.colors[color].text}>{title}</span>}
    </button>
  )
}