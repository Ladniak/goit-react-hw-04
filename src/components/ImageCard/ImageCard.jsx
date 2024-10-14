import module from './ImageCard.module.css'

const ImageCard = ({ item }) => {
    return (
        <div>
            <img className={module.cardImg} src={item.urls.small} alt={item.description || "Image"} />
        </div>
    )
}

export default ImageCard