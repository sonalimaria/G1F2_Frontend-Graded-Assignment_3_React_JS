// NavigationBar.tsx
import React, { RefObject } from 'react';
import { Navbar, Nav, Form, FormControl, Container } from 'react-bootstrap';

interface NavigationBarProps {
  setCurrentCategory: (category: string) => void;
  setCurrentTitle: (title: string) => void;
  setSearchTerm: (searchValue: string) => void;
  currentCategory: string;
  currentTitle: string;
  searchTerm: string;
  target: RefObject<HTMLInputElement>;  // Include the ref type for the target prop
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  setCurrentCategory,
  setCurrentTitle,
  setSearchTerm,
  currentCategory,
  currentTitle,
  searchTerm,
  target  // Accepting the ref as a prop
}) => {
  const handleCategoryChange = (category: string, title: string) => {
    setCurrentCategory(category);
    setCurrentTitle(title);
    setSearchTerm('');  // Reset search term whenever category changes
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{ zIndex: 1030 }}>
        <Container fluid>
          <Navbar.Brand>MovieApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => handleCategoryChange('movies-in-theaters', 'On the Screen')} active={currentCategory === 'movies-in-theaters'}>Movies in Theaters</Nav.Link>
              <Nav.Link onClick={() => handleCategoryChange('movies-coming', 'At Censor')} active={currentCategory === 'movies-coming'}>Coming Soon</Nav.Link>
              <Nav.Link onClick={() => handleCategoryChange('top-rated-india', 'Bollywood Hits')} active={currentCategory === 'top-rated-india'}>Top Rated Indian</Nav.Link>
              <Nav.Link onClick={() => handleCategoryChange('top-rated-movies', 'The Famous')} active={currentCategory === 'top-rated-movies'}>Top Rated Movies</Nav.Link>
              <Nav.Link onClick={() => handleCategoryChange('favourite', 'Favorites')} active={currentCategory === 'favorites'}>Favorites</Nav.Link>
            </Nav>

            <Form className="d-flex ms-auto">
              <FormControl
                ref={target}  // Apply the ref to the search input
                type="text"
                placeholder="Search Movies"
                className="me-sm-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar bg="secondary" variant="light" fixed="top" style={{ top: '56px', zIndex: 1029, color: 'white', padding: '10px 15px' }}>
        <Container>
          <h4 style={{ color: 'white', margin: 0 }}>{currentTitle}</h4>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
