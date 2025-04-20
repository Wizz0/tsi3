import React from "react"

type InputProps = {
  type: string;
  name?: string;
  value?: string;
  placeholder?: string;
  color: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ 
  type,
  name,
  value,
  placeholder,
  color,
  size,
  onChange,
  className = ''
}) => {
  const defaultClass = "border rounded-2 px-3 py-2 w-full"

  const classes = {
    colors: {
      primary: "border-amber-700 focus:border-amber-700 focus:ring-amber-700",
      secondary: "border-red-500 focus:border-red-500 focus:ring-red-500",
    },
    sizes: {
      small: "text-sm h-[32px]",
      medium: "text-base h-[40px]",
      large: "text-lg h-[48px]",
    },
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`${defaultClass} ${classes.colors[color]} ${classes.sizes[size]} ${className}`}
    />
  )
}