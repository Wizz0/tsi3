import React from "react"

type TextProps = {
  color: 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

export const Text: React.FC<TextProps> = ({ color, size, children }) => {
  const defaultClass = "font-sans"

  const classes = {
    colors: {
      primary: "text-amber-700",
      secondary: "text-red-500",
    },
    sizes: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
  }

  return (
    <p className={`${defaultClass} ${classes.colors[color]} ${classes.sizes[size]}`}>
      {children}
    </p>
  )
}