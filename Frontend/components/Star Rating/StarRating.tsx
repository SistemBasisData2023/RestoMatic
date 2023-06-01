import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'

type Props = {
  ratingAverage: number
}

const StarRating = ({ ratingAverage }: Props) => {
  return (
    <div className="flex relative gap-1">
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <div
        className={`flex gap-1 absolute top-0 overflow-hidden transition-all duration-500 stroke-yellow-300`}
        style={{ width: `${ratingAverage * 20}%` }}
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

export default StarRating
