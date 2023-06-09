import React, { ReactNode } from 'react'

type Button_Props = {
  children: ReactNode
  disabled?: boolean
  className?: string
  type?: 'submit' | 'reset' | 'button' | undefined
  onClick?: () => void
}

const Button = ({
  children,
  disabled = false,
  className,
  type = 'button',
  onClick,
}: Button_Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${className} btn-primary `}
    >
      {children}
    </button>
  )
}

export { Button }
