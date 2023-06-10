import { useUser } from '@context/UserContext'
import { BuildResponse, Post_Review, Reviews_Props } from '@interfaces/index'
import React, { useRef, useState } from 'react'
import { ReviewModal } from './ReviewModal'
import InputStarRating from '@components/Star Rating/InputStarRating'
import { POST_REVIEW } from '@utils/APIs'
import { useRouter } from 'next/router'

type Props = {
  reviews: Reviews_Props[]
}

const RestaurantReview = ({ reviews }: Props) => {
  const { user, currentRestaurant } = useUser()
  const [comment, setComment] = useState<string>('')
  const router = useRouter()
  const [ratingValue, setRatingValue] = useState<number>(0)

  const handleOnClick = async () => {
    const data: Post_Review = {
      customer_id: user.id,
      restaurant_id: currentRestaurant.id,
      comment,
      rating: ratingValue,
    }
    await POST_REVIEW(data)
    router.push(`/restaurant/${currentRestaurant.id}`)
  }
  return (
    <div>
      <div className="flex flex-col gap-1 py-3  border-x-0 border-y border-[#C7C7C7] border-solid ">
        <div className="flex justify-between w-full">
          <h3 className="m-0">{user.username} (You)</h3>
        </div>
        <div className="flex items-center gap-3 ">
          <InputStarRating setRating={setRatingValue} />
          <p className="m-0 pr-1">{ratingValue}</p>
        </div>
        <input
          type="text"
          required={true}
          onChange={(e) => {
            setComment(e.target.value)
          }}
          className="w-full m-0 mt-2 font-normal rounded-[5px] border-[#27374D] p-4 pb-10 border-solid border"
          placeholder="Leave a review"
        />
        <button
          onClick={handleOnClick}
          disabled={comment.length == 0 || ratingValue == 0}
          className={`w-[150px] rounded-md btn-primary mt-2 ${
            (comment.length == 0 || ratingValue == 0) &&
            'opacity-20 cursor-not-allowed'
          }`}
        >
          Add Review
        </button>
      </div>
      {reviews.length !== 0 ? (
        reviews.map((review) => {
          return <ReviewModal key={review.id} userReview={review} />
        })
      ) : (
        <h2 className="text-center ">Reviews are empty</h2>
      )}
    </div>
  )
}

export default RestaurantReview
