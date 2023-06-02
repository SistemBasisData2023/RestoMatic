import React, { ReactNode } from 'react'

type Button_Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
}

const Button = ({ children, className, onClick }: Button_Props) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-[18px] font-bold border-green-800 text-green-800    p-2 cursor-pointer hover:bg-green-800 hover:text-white  border-solid transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  )
}

export { Button }
