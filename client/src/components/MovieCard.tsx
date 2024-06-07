// import React, { useState, useRef } from 'react';
// import { Card, Button, Overlay, Tooltip } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { Movie } from '../model/IIndex';

// interface MovieCardProps {
//   movie: Movie;
//   favorites: Movie[];
//   onAddToFavorite: (movie: Movie) => void;
//   onRemoveFromFavorite: (movie: Movie) => void;
//   currentCategory: string;
// }

// const MovieCard: React.FC<MovieCardProps> = ({ movie, favorites, onAddToFavorite, onRemoveFromFavorite, currentCategory }) => {
//   let navigate = useNavigate();
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [tooltipMessage, setTooltipMessage] = useState('');
//   const target = useRef(null);

//   const isFavorite = favorites.some(fav => fav.id === movie.id);

//   const handleCardClick = () => {
//     navigate(`/movie/${movie.id}`);
//   };

//   const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     event.stopPropagation();
//     if (currentCategory === 'favourite') {
//       onRemoveFromFavorite(movie);
//       setTooltipMessage('Removed from Favorites');
//       setShowTooltip(true);
//       setTimeout(() => setShowTooltip(false), 2000);
//     } else if (isFavorite) {
//       setTooltipMessage('Movie Already in Favorites');
//       setShowTooltip(true);
//       setTimeout(() => setShowTooltip(false), 2000);
//     } else {
//       onAddToFavorite(movie);
//       setTooltipMessage('Success. Added to Favorite');
//       setShowTooltip(true);
//       setTimeout(() => setShowTooltip(false), 2000);
//     }
//   };

//   const cardImageStyle: React.CSSProperties = {
//     height: '250px',
//     objectFit: 'contain',
//     width: '100%',
//     background: '#f0f0f0'
//   };

//   const buttonStyle: React.CSSProperties = {
//     fontSize: '0.75rem', // Smaller font size for the button
//     padding: '5px 5px' // Reduced padding to make the button smaller
//   };

//   return (
//     <Card style={{ width: '15rem', height: '350px', marginBottom: '5px', marginRight: '10px', marginTop: '50px', overflow: 'hidden' }} onClick={handleCardClick}>
//       <Card.Img variant="top" src={movie.posterurl} style={cardImageStyle} />
//       <Card.Body>
//         <Card.Title className="text-center">{movie.title}</Card.Title>
//         <Button
//           ref={target}
//           variant={currentCategory === 'favourite' ? 'danger' : 'success'}
//           onClick={handleFavoriteClick}
//           className="w-100"
//           style={buttonStyle}
//         >
//           {currentCategory === 'favourite' ? (
//             <>
//               Remove from Favorites <i className="fas fa-heart-broken"></i>
//             </>
//           ) : (
//             <>
//               Add to Favorites <i className="fas fa-heart"></i>
//             </>
//           )}
//         </Button>
//         <Overlay target={target.current} show={showTooltip} placement="bottom">
//           {(props) => (
//             <Tooltip id="overlay-tooltip" {...props}>
//               {tooltipMessage}
//             </Tooltip>
//           )}
//         </Overlay>
//       </Card.Body>
//     </Card>
//   );
// };

// export default MovieCard;


import React, { useState, useRef } from 'react';
import { Card, Button, Overlay, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../model/IIndex';

interface MovieCardProps {
  movie: Movie;
  favorites: Movie[];
  onAddToFavorite: (movie: Movie) => void;
  onRemoveFromFavorite: (movie: Movie) => void;
  currentCategory: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, favorites, onAddToFavorite, onRemoveFromFavorite, currentCategory }) => {
  let navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const target = useRef(null);

  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (currentCategory === 'favourite') {
      onRemoveFromFavorite(movie);
      setTooltipMessage('Removed from Favorites');
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } else if (isFavorite) {
      setTooltipMessage('Movie Already in Favorites');
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } else {
      onAddToFavorite(movie);
      setTooltipMessage('Success. Added to Favorite');
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  const cardImageStyle: React.CSSProperties = {
    height: '250px',
    objectFit: 'contain',
    width: '100%',
    background: '#f0f0f0'
  };

  const buttonStyle: React.CSSProperties = {
    fontSize: '0.75rem', // Smaller font size for the button
    padding: '5px 5px' // Reduced padding to make the button smaller
  };

  return (
    <Card style={{ width: '15rem', height: '100%', marginBottom: '10px', marginTop: '50px', marginRight: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} onClick={handleCardClick}>
      <Card.Img variant="top" src={movie.posterurl} style={cardImageStyle} />
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Card.Title className="text-center">{movie.title}</Card.Title>
        <div>
          <Button
            ref={target}
            variant={currentCategory === 'favourite' ? 'danger' : 'success'}
            onClick={handleFavoriteClick}
            className="w-100"
            style={buttonStyle}
          >
            {currentCategory === 'favourite' ? (
              <>
                Remove from Favorites <i className="fas fa-heart-broken"></i>
              </>
            ) : (
              <>
                Add to Favorites <i className="fas fa-heart"></i>
              </>
            )}
          </Button>
          <Overlay target={target.current} show={showTooltip} placement="bottom">
            {(props) => (
              <Tooltip id="overlay-tooltip" {...props}>
                {tooltipMessage}
              </Tooltip>
            )}
          </Overlay>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
