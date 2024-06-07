import axios from 'axios';
import { Movie } from '../model/IIndex';

const FAVORITES_URL = process.env.REACT_APP_FAVORITES_URL;

if (!FAVORITES_URL) {
  throw new Error("FAVORITES_URL is not defined in .env");
}

export const addFavorite = async (movie: Movie) => {
  try {
    const response = await axios.get(`${FAVORITES_URL}?id=${movie.id}`);
    if (response.data.length === 0) {
      await axios.post(FAVORITES_URL, movie);
    } else {
      throw new Error('Movie Already in Favorites');
    }
  } catch (error) {
    throw error;
  }
};

export const removeFavorite = async (id: string) => {
  try {
    await axios.delete(`${FAVORITES_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const checkFavorite = async (id: string) => {
  try {
    const response = await axios.get(`${FAVORITES_URL}?id=${id}`);
    return response.data.length > 0;
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};
