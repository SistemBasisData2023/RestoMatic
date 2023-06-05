import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
  className?: string
  placeholder?: string
}

const SearchBar = ({ className = null, placeholder = null }: Props) => {
  return (
    <div className={`relative flex items-center ${className} `}>
      <FontAwesomeIcon className="absolute pl-2 " icon={faMagnifyingGlass} />
      <input
        type="text"
        placeholder={placeholder}
        className="border-gray-600 border-solid outline-none  rounded-[14px] py-2 pl-8 h-[2.5rem] w-[20rem]"
      />
    </div>
  )
}

export default SearchBar
