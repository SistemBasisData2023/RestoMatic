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
      className={`rounded-[18px] border-none font-bold bg-primary-100 p-2 cursor-pointer text-white  bg-inherit hover:bg-primary-120 hover:text-white  transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  )
}

export { Button }
