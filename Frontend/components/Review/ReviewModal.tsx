import StarRating from '@components/Star Rating/StarRating'
import { Customer_Props, Reviews_Props } from '@interfaces/index'
import React, { ReactNode } from 'react'
type Props = {
  userReview: Reviews_Props
}
const ReviewModal = ({ userReview }: Props) => {
  const date = new Date(userReview.created_at)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hourCycle: 'h24',
    hour: '2-digit',
    minute: '2-digit',
  }
  const year = date.getFullYear()
  const month = date.toLocaleString('en-US', { month: 'short' })
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  console.log(``)
  //console.log(date.toLocaleDateString('en-US', options))
  // console.log(
  //   new Intl.DateTimeFormat('en-US', {
  //     day: '2-digit',
  //     month: 'short',
  //     year: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //   }).format(date)
  // )
  return (
    <div className="flex flex-col gap-1 py-3  border-x-0 border-y border-[#C7C7C7] border-solid ">
      <div className="w-full flex justify-between">
        <h3 className="m-0">{userReview.customer_id}</h3>
        <p className="m-0">
          {' '}
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(date)}
        </p>
      </div>
      <div className="flex items-center gap-3 ">
        <StarRating ratingAverage={userReview.rating} />
        <p className="m-0">{userReview.rating}</p>
      </div>
      <p className="m-0 mt-2 font-normal w-full">{userReview.comment}</p>
    </div>
  )
}

export { ReviewModal }
