import React from 'react';
import { Movie } from '../model/IIndex';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  favorites: Movie[];
  onAddToFavorite: (movie: Movie) => void;
  onRemoveFromFavorite: (movie: Movie) => void;
  currentCategory: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, favorites, onAddToFavorite, onRemoveFromFavorite, currentCategory }) => {
  return (
    <div className="d-flex flex-wrap justify-content-start">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          favorites={favorites}
          onAddToFavorite={onAddToFavorite}
          onRemoveFromFavorite={onRemoveFromFavorite}
          currentCategory={currentCategory}
        />
      ))}
    </div>
  );
};

export default MovieList;
