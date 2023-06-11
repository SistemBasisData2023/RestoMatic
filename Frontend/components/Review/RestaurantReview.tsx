import { useUser } from '@context/UserContext'
import { Post_Review, Reviews_Props } from '@interfaces/index'
import React, { useEffect, useState } from 'react'
import { ReviewModal } from './ReviewModal'
import InputStarRating from '@components/Star Rating/InputStarRating'
import { GET_RESTAURANTREVIEW, POST_REVIEW } from '@utils/APIs'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { Button } from '..'
import { SuccessErrorModal } from '@components/Pop up/SuccessErrorModal'

type Props = {
  reviews: Reviews_Props[]
}

const RestaurantReview = ({ reviews = [] }: Props) => {
  const { user, currentRestaurant } = useUser()
  const [comment, setComment] = useState<string>('')
  const router = useRouter()
  const [filter, setFilter] = useState<
    'highest' | 'lowest' | 'latest' | 'oldest'
  >('latest')
  const [resetReview, setResetReview] = useState<boolean>(false)
  const [reviewsData, setReviewsData] = useState<Reviews_Props[]>(reviews)
  const [ratingValue, setRatingValue] = useState<number>(0)
  const [responseMessage, setResponseMessage] = useState<string>(null)
  const [showSuccessErrorModal, setShowSuccessErrorModal] =
    useState<boolean>(false)
  const [successOrError, setSuccessOrError] = useState<
    'success' | 'error' | null
  >()
  useEffect(() => {
    HandleSortLatest()
  }, [reviews])

  const handleOnClick = async () => {
    const data: Post_Review = {
      customer_id: user.id,
      restaurant_id: currentRestaurant.id,
      comment,
      rating: ratingValue,
    }
    const res = await POST_REVIEW(data)

    if (res.error == false) {
      setResponseMessage('Successfully post a review')
      setSuccessOrError('success')
    } else {
      setResponseMessage('Failed post a review')
      setSuccessOrError('error')
    }
    setShowSuccessErrorModal(true)
    setResetReview(true)
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
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    })

    setReviewsData(sorted)
    setFilter('oldest')
  }

  const HandleSortLatest = () => {
    const sorted = [...reviews].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
    setReviewsData(sorted)
    setFilter('latest')
  }

  return (
    <div>
      {reviewsData.length != 0 && (
        <div className="flex items-center flex-col-reverse justify-center mt-4 gap-5 sm:mt-0 sm:gap-8 sm:flex-row sm:justify-end mb-3">
          <div className="flex flex-col gap-2 items-center  ">
            <div className="flex gap-3 justify-between w-full">
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
            <div className="flex justify-between gap-3 w-full">
              <Button
                onClick={HandleSortLatest}
                className={`${
                  filter != 'latest' && 'bg-[#CBCBCB] text-[#646464]'
                }  px-3 rounded-md w-full`}
              >
                Latest
              </Button>
              <Button
                onClick={HandleSortOldest}
                className={`${
                  filter != 'oldest' && 'bg-[#CBCBCB] text-[#646464]'
                }  px-3 rounded-md w-full`}
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
        <div className="flex items-center gap-1  ">
          <InputStarRating
            rating={ratingValue}
            setRating={setRatingValue}
            resetReview={resetReview}
            setResetReview={setResetReview}
          />
          <input
            type="number"
            min={0}
            max={5}
            className="m-0 pt-1 outline-none  bg-transparent border-none w-[60px]  text-[16px]  "
            step="0.1"
            value={ratingValue}
            onChange={(e) => {
              const value = Math.max(0, Math.min(5, parseFloat(e.target.value)))
              setRatingValue(value)
            }}
          />
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
      {showSuccessErrorModal && (
        <SuccessErrorModal
          showModal={setShowSuccessErrorModal}
          type={successOrError}
          message={responseMessage}
        />
      )}
    </div>
  )
}

export default RestaurantReview
