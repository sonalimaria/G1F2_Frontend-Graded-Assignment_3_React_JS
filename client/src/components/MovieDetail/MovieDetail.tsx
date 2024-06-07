import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { Movie } from '../../model/IIndex';
import './MovieDetail.css';  //  styles are in this CSS file

interface MovieDetailProps {
  movies: Movie[];
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movies }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id.toString() === id);

  if (!movie) return <Container><h1>Movie not found</h1></Container>;

  return (
    <div className="movie-detail-container">
      <Button variant="primary" className="back-to-list" onClick={() => navigate(-1)}>Back to List</Button>
      <Container className="mt-5">  
        <Row>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Img variant="top" src={movie.posterurl} alt={movie.title} style={{ height: '100%', objectFit: 'cover' }} />
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title><h3>{movie.title} ({new Date(movie.releaseDate).getFullYear()})</h3></Card.Title>
                <Card.Text><strong>IMDb Rating:</strong> {movie.imdbRating}</Card.Text>
                <Card.Text><strong>Duration:</strong> {movie.duration}</Card.Text>
                <Card.Text><strong>Genres:</strong> {movie.genres?.join(', ')}</Card.Text>
                <Card.Text><strong>Actors:</strong> {movie.actors?.join(', ')}</Card.Text>
                <Card.Text><strong>Storyline:</strong> {movie.storyline}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetail;
