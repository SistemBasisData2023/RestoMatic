import StarRating from '@components/Star Rating/StarRating'
import { useUser } from '@context/UserContext'
import { Reviews_Props } from '@interfaces/index'
import { FormatTime } from '@utils/functions'
import React from 'react'
type Props = {
  userReview: Reviews_Props
}
const ReviewModal = ({ userReview }: Props) => {
  const { user } = useUser()
  const { customer_id, customer_username } = userReview

  return (
    <div className="flex flex-col gap-1 py-3  border-x-0 border-y border-[#C7C7C7] border-solid ">
      <div className="flex justify-between w-full">
        <h3 className="m-0">
          {user.id == customer_id
            ? `${customer_username} (You)`
            : customer_username}
        </h3>
        <p className="m-0">{FormatTime(userReview.created_at)}</p>
      </div>
      <div className="flex items-center gap-3 ">
        <StarRating ratingAverage={userReview.rating} />
        <p className="m-0">{userReview.rating}</p>
      </div>
      <p className="w-full m-0 mt-2 font-normal">{userReview.comment}</p>
    </div>
  )
}

export { ReviewModal }
