import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import './App.css';
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onSearch = (value) => {
    setSearchValue(value);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const onImageClick = (targetImage) => {
    setSelectedImage(targetImage);
    setIsOpen(true);
  };

  useEffect(() => {
    if (searchValue === null) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `https://api.unsplash.com/search/photos/?client_id=qLSFnTXSNcWdo-WRETHz-Kj8eWsKPK6tzOx6jYGukQI&page=${page}&query=${searchValue}&per_page=12`
        );

        setTotalPages(data.total_pages);

        if (page !== 1) {
          setImages((prevState) => [...prevState, ...data.results]);
        } else {
          setImages(data.results);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchValue, page]);


  useEffect(() => {
    if (page > 1 && images.length > 0) {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  }, [images, page]);

  return (
    <>
      <SearchBar onSearch={onSearch} />
      <ImageGallery images={images} onImageClick={onImageClick} />
      {totalPages > page ? <LoadMoreBtn onLoadMore={onLoadMore} /> : null}
      {isLoading && (
        <div className="loadDiv">
          <Loader />
        </div>
      )}
      {error && (
        <div className="loadDiv">
          <ErrorMessage error={error} />
        </div>
      )}
      <ImageModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} selectedImage={selectedImage} />
    </>
  );
}

export default App;
