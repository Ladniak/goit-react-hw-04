import ImageCard from "../ImageCard/ImageCard"
import module from './ImageGallery.module.css'

export const ImageGallery = ({ images, onImageClick }) => {

    return (
        <ul className={module.imageList}>
            {Array.isArray(images) && images.map((item) => {
                return (<li key={item.id}>
                    <ImageCard item={item} onImageClick={onImageClick} />
                </li>)
            })}

        </ul>

    )
}

export default ImageGallery