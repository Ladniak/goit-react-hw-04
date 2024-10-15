import module from './ImageCard.module.css'

const ImageCard = ({ item, onImageClick }) => {
    return (
        <div>
            <img onClick={() => onImageClick(item)} className={module.cardImg} src={item.urls.small} alt={item.description || "Image"} />
        </div>
    )
}

export default ImageCard