
export const LoadMoreBtn = ({ onLoadMore }) => {

    const handleClick = () => {
        onLoadMore();
    }
    return (
        <>
            <button onClick={handleClick} type="button">Load More</button>
        </>
    )
}
