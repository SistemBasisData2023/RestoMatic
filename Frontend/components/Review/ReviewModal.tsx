import { SuccessErrorModal } from '@components/Pop up/SuccessErrorModal'
import StarRating from '@components/Star Rating/StarRating'
import { useUser } from '@context/UserContext'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Reviews_Props } from '@interfaces/index'
import { DELETE_REVIEW } from '@utils/APIs'
import { FormatTime } from '@utils/functions'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
type Props = {
  userReview: Reviews_Props
}
const ReviewModal = ({ userReview }: Props) => {
  const { user, currentRestaurant } = useUser()
  const router = useRouter()
  const { customer_id, customer_username, id } = userReview

  const [responseMessage, setResponseMessage] = useState<string>('')
  const [showSuccessErrorModal, setShowSuccessErrorModal] =
    useState<boolean>(false)
  const [successOrError, setSuccessOrError] = useState<
    'success' | 'error' | null
  >()

  const handleOnClickDelete = async () => {
    const res = await DELETE_REVIEW(id)
    if (res.error == false) {
      setResponseMessage('Successfuly delete a review')
      setSuccessOrError('success')
    } else {
      setResponseMessage('Failed delete a review')
      setSuccessOrError('error')
    }
    setShowSuccessErrorModal(true)
    router.push(`/restaurant/${currentRestaurant.id}`)
  }
  return (
    <div className="flex flex-col gap-1 py-3  border-x-0 border-y border-[#C7C7C7] border-solid ">
      {customer_id == user.id && (
        <button
          onClick={handleOnClickDelete}
          className="self-end mb-1 text-error-120 bg-transparent border border-solid cursor-pointer rounded-sm p-1 px-2 border-error-120 hover:text-white hover:bg-error-120"
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      )}
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

export { ReviewModal }
