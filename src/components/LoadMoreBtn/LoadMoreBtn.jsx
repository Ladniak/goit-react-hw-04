import module from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore }) => {

    const handleClick = () => {
        onLoadMore();
    }

    return (
        <>
            <button className={module.loadBtn} onClick={handleClick} type="button">Load More</button>
        </>
    )
}

export default LoadMoreBtn
