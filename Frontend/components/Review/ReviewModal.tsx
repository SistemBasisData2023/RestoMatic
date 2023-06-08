import StarRating from '@components/Star Rating/StarRating'
import { Customer_Props } from '@interfaces/index'
import React, { ReactNode } from 'react'
type Props = {
  userReview: Customer_Props
}
const ReviewModal = ({ userReview }: Props) => {
  return (
    <div className="flex flex-col gap-1 py-3  border-x-0 border-y border-[#C7C7C7] border-solid ">
      <h3 className="m-0">USERNAME</h3>
      <div className="flex items-center gap-3 ">
        <StarRating ratingAverage={3} />
        <p className="m-0">{3}</p>
      </div>
      <p className="m-0 mt-2 font-normal w-full">deskripsi review</p>
    </div>
  )
}

export { ReviewModal }
