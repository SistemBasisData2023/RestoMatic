import React, { Dispatch, useState, SetStateAction, useEffect } from 'react'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'

type Props = {
  rating: number
  resetReview: boolean
  setRating: Dispatch<SetStateAction<number>>
  setResetReview: Dispatch<SetStateAction<boolean>>
}
const InputStarRating = ({
  resetReview,
  setRating,
  setResetReview,
  rating,
}: Props) => {
  const [savedState, setSavedState] = useState({
    width: 0,
    rating: 0,
  })
  const [chosenWidthRating, setChosenWidthRating] = useState<number>(0)
  useEffect(() => {
    setChosenWidthRating(rating * 20)
    if (resetReview) {
      setChosenWidthRating(0)
      setResetReview(false)
    }
  }, [resetReview, rating])

  const handleMouseMove = (event) => {
    setChosenWidthRating(event.clientX - 31)
    const ratingValue = chosenWidthRating / 20 > 5 ? 5 : chosenWidthRating / 20
    setRating(ratingValue)
  }

  const handleOnClick = (event) => {
    const ratingValue = chosenWidthRating / 20 > 5 ? 5 : chosenWidthRating / 20
    setSavedState({
      width: event.clientX - 31,
      rating: ratingValue,
    })
    setChosenWidthRating(event.clientX - 31)
    setRating(ratingValue)
  }
  return (
    <div
      onMouseOver={handleMouseMove}
      onMouseLeave={() => {
        setChosenWidthRating(savedState.width)
        setRating(savedState.rating)
      }}
      onClick={handleOnClick}
      className="flex relative overflow-hidden gap-1 pr-1"
    >
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <div
        className={`flex gap-1 absolute top-0 overflow-hidden transition-all duration-500 stroke-yellow-300`}
        style={{ width: `${chosenWidthRating}%` }}
      >
        <FontAwesomeIcon icon={faStarSolid} color="#FFBC0B" />
        <FontAwesomeIcon icon={faStarSolid} color="#FFBC0B" />
        <FontAwesomeIcon icon={faStarSolid} color="#FFBC0B" />
        <FontAwesomeIcon icon={faStarSolid} color="#FFBC0B" />
        <FontAwesomeIcon icon={faStarSolid} color="#FFBC0B" />
      </div>
    </div>
  )
}

export default InputStarRating
