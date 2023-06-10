import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  className?: string
  placeholder?: string
  constantData?: Array<any>
  setState?: Dispatch<SetStateAction<any>>
}

const SearchBar = ({
  className = null,
  placeholder = null,
  constantData = [],
  setState = null,
}: Props) => {
  const HandleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value
    if (searchString === '') {
      setState(constantData)
    }

    const filteredSearchData: typeof constantData = constantData.filter(
      ({ name }) => {
        return name.toLowerCase().includes(searchString)
      }
    )
    setState(filteredSearchData)
  }
  return (
    <div className={`relative flex items-center ${className} `}>
      <FontAwesomeIcon className="absolute pl-2 " icon={faMagnifyingGlass} />
      <input
        type="search"
        onChange={setState && HandleSearch}
        placeholder={placeholder}
        className="border-gray-600 pr-2 border-solid outline-none  rounded-[14px] py-2 pl-8 h-[2.5rem] w-[20rem]"
      />
    </div>
  )
}

export default SearchBar
