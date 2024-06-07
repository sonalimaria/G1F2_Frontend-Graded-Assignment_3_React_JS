import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import NavigationBar from './components/NavigationBar';
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Movie } from './model/IIndex';
import { addFavorite, removeFavorite } from './services/favoriteService';

const FAVORITES_URL = process.env.REACT_APP_FAVORITES_URL;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!FAVORITES_URL) {
  throw new Error("FAVORITES_URL is not defined in .env");
}

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in .env");
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [currentCategory, setCurrentCategory] = useState('movies-in-theaters');
  const [currentTitle, setCurrentTitle] = useState('On the Screen');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}${currentCategory}`);
        const updatedMovies = await Promise.all(response.data.map(async (movie: any) => {
          try {
            await axios.get(movie.posterurl);
            return { ...movie, posterurl: movie.posterurl };
          } catch (error) {
            const localUrl = movie.posterurl.replace('https://images-na.ssl-images-amazon.com/images/M/', `${API_BASE_URL}images/`);
            return { ...movie, posterurl: localUrl };
          }
        }));
        setMovies(updatedMovies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (currentCategory !== 'favourite') {
      fetchMovies();
    }
  }, [currentCategory]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(FAVORITES_URL!); // Use assertion to ensure type correctness
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  const filteredMovies = searchTerm.length > 0
    ? (currentCategory === 'favourite'
      ? favorites.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
      : movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase())))
    : (currentCategory === 'favourite' ? favorites : movies);

  useEffect(() => {
    if (searchTerm && filteredMovies.length === 0) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [filteredMovies.length, searchTerm]);

  const handleAddToFavorite = async (movie: Movie) => {
    try {
      await addFavorite(movie);
      setFavorites([...favorites, movie]);
    } catch (error) {
      if (error instanceof Error && error.message === 'Movie Already in Favorites') {
        // Tooltip logic is handled in MovieCard
      } else {
        console.error('Error adding to favorite:', error);
      }
    }
  };

  const handleRemoveFromFavorite = async (movie: Movie) => {
    try {
      await removeFavorite(movie.id);
      setFavorites(favorites.filter(fav => fav.id !== movie.id));
    } catch (error) {
      console.error('Error removing from favorite:', error);
    }
  };

  return (
    <Router>
      <NavigationBar
        setCurrentCategory={setCurrentCategory}
        setCurrentTitle={setCurrentTitle}
        setSearchTerm={setSearchTerm}
        currentCategory={currentCategory}
        currentTitle={currentTitle}
        searchTerm={searchTerm}
        target={target}
      />
      <div className="container mt-5 pt-4">
        <Routes>
          <Route path="/" element={
            <div>
              <MovieList
                key={currentCategory}
                movies={filteredMovies}
                favorites={favorites}
                onAddToFavorite={handleAddToFavorite}
                onRemoveFromFavorite={handleRemoveFromFavorite}
                currentCategory={currentCategory}
              />
              <Overlay target={target.current} show={showTooltip} placement="bottom">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    Search not found
                  </Tooltip>
                )}
              </Overlay>
            </div>
          } />
          <Route path="/movie/:id" element={<MovieDetail key={currentCategory} movies={filteredMovies} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
