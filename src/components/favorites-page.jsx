import { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { fetchDogDetails, fetchMatch } from '../api/dog-service';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from '@mui/material';

const FavoritesPage = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [matchedDog, setMatchedDog] = useState(null);

  const { data: favoriteDogs, isLoading } = useQuery({
    queryKey: ['favoriteDogs', favorites],
    queryFn: () => fetchDogDetails(favorites),
    enabled: favorites.length > 0,
  });

  const handleFindMatch = async () => {
    try {
      const matchData = await fetchMatch(favorites);
      setMatchedDog(matchData[0]);
    } catch (error) {
      alert('Error finding match! Try again.');
    }
  };

  return (
    <Container>
      <h1>My Favorite Dogs</h1>
      {isLoading && <p>Loading...</p>}
      {favoriteDogs?.length === 0 && <p>No favorites yet.</p>}

      <Button
        variant='outlined'
        color='error'
        onClick={clearFavorites}
        disabled={favorites.length === 0}
      >
        Clear Favorites
      </Button>

      <Grid
        container
        spacing={2}
        sx={{
          padding: '10px 0',
        }}
      >
        {favoriteDogs?.map(dog => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <Card>
              <CardMedia
                component='img'
                height='200'
                image={dog.img}
                alt={dog.name}
              />
              <CardContent>
                <Typography variant='h6'>{dog.name}</Typography>
                <Typography>Breed: {dog.breed}</Typography>
                <Typography>Age: {dog.age} years</Typography>
                <Typography>Location: {dog.zip_code}</Typography>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => removeFavorite(dog.id)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant='contained'
        color='primary'
        onClick={handleFindMatch}
        disabled={favorites.length === 0}
      >
        Find My Match
      </Button>

      {matchedDog && (
        <div style={{ marginTop: '20px' }}>
          <h2>Your Match! 🐶</h2>
          <Card>
            <CardMedia
              component='img'
              height='200'
              image={matchedDog.img}
              alt={matchedDog.name}
            />
            <CardContent>
              <Typography variant='h6'>{matchedDog.name}</Typography>
              <Typography>Breed: {matchedDog.breed}</Typography>
              <Typography>Age: {matchedDog.age} years</Typography>
              <Typography>Location: {matchedDog.zip_code}</Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default FavoritesPage;
