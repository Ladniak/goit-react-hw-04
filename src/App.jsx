import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import SearchBar from "./components/SearchBar/SearchBar"
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import './App.css'

function App() {

  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  const onSearch = (value) => {
    setSearchValue(value);
  }

  useEffect(() => {
    if (searchValue === null) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `https://api.unsplash.com/search/photos/?client_id=qLSFnTXSNcWdo-WRETHz-Kj8eWsKPK6tzOx6jYGukQI&query=${searchValue}&per_page=12`
        );
        setImages(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
        setError(null);
      }
    };


    fetchImages();
  }, [searchValue]);


  return (
    <>
      <SearchBar onSearch={onSearch} />
      <ImageGallery images={images} />
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
    </>
  )
}

export default App
