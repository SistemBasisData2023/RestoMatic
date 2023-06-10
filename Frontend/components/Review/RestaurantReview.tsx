import { useUser } from '@context/UserContext'
import { Post_Review, Reviews_Props } from '@interfaces/index'
import React, { useEffect, useState } from 'react'
import { ReviewModal } from './ReviewModal'
import InputStarRating from '@components/Star Rating/InputStarRating'
import { POST_REVIEW } from '@utils/APIs'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { Button } from '..'

type Props = {
  reviews: Reviews_Props[]
}

const RestaurantReview = ({ reviews }: Props) => {
  const { user, currentRestaurant } = useUser()
  const [comment, setComment] = useState<string>('')
  const router = useRouter()
  const [filter, setFilter] = useState<
    'highest' | 'lowest' | 'latest' | 'oldest'
  >('oldest')
  const [reviewsData, setReviewsData] = useState<Reviews_Props[]>(reviews)
  const [ratingValue, setRatingValue] = useState<number>(0)

  useEffect(() => {
    HandleSortOldest()
    setReviewsData(reviews)
  }, [reviews])

  const handleOnClick = async () => {
    const data: Post_Review = {
      customer_id: user.id,
      restaurant_id: currentRestaurant.id,
      comment,
      rating: ratingValue,
    }
    await POST_REVIEW(data)
    setRatingValue(0)
    setComment('')
    router.push(`/restaurant/${currentRestaurant.id}`)
  }

  const HandleSortRatingAsc = () => {
    const sorted = [...reviews].sort((a, b) => {
      return a.rating - b.rating
    })
    setReviewsData(sorted)
    setFilter('lowest')
  }

  const HandleSortRatingDesc = () => {
    const sorted = [...reviews].sort((a, b) => {
      return b.rating - a.rating
    })
    setReviewsData(sorted)
    setFilter('highest')
  }

  const HandleSortOldest = () => {
    const sorted = [...reviews].sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at)
    })

    setReviewsData(sorted)
    setFilter('oldest')
  }

  const HandleSortLatest = () => {
    const sorted = [...reviews].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    })
    setReviewsData(sorted)
    setFilter('latest')
  }

  return (
    <div>
      {reviewsData.length != 0 && (
        <div className="flex items-center gap-8 justify-end mb-3">
          <div className="flex flex-col gap-2 items-center  ">
            <div className="flex gap-3">
              <Button
                onClick={HandleSortRatingDesc}
                className={`${
                  filter != 'highest' && 'bg-[#CBCBCB] text-[#646464]'
                }  px-3 rounded-md`}
              >
                Highest Rating
              </Button>
              <Button
                onClick={HandleSortRatingAsc}
                className={`${
                  filter != 'lowest' && 'bg-[#CBCBCB] text-[#646464]'
                }  px-3 rounded-md`}
              >
                Lowest Rating
              </Button>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={HandleSortLatest}
                className={`${
                  filter != 'latest' && 'bg-[#CBCBCB] text-[#646464]'
                }  px-3 rounded-md`}
              >
                Latest
              </Button>
              <Button
                onClick={HandleSortOldest}
                className={`${
                  filter != 'oldest' && 'bg-[#CBCBCB] text-[#646464]'
                }  px-3 rounded-md`}
              >
                Oldest
              </Button>
            </div>
          </div>

          <FontAwesomeIcon
            className="text-gray-700 "
            icon={faFilter}
            size="lg"
          />
        </div>
      )}
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
          value={comment}
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
      {reviewsData.length !== 0 ? (
        reviewsData.map((review) => {
          return <ReviewModal key={review.id} userReview={review} />
        })
      ) : (
        <h2 className="text-center ">Reviews are empty</h2>
      )}
    </div>
  )
}

export default RestaurantReview
