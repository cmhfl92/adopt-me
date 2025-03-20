import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBreeds, fetchDogs, fetchDogDetails } from '../api/dog-service';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  CardMedia,
} from '@mui/material';

const DogsList = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [ageMin, setAgeMin] = useState(null);
  const [ageMax, setAgeMax] = useState(null);
  const [sortOrder, setSortOrder] = useState('breed:asc');
  const [pageCursor, setPageCursor] = useState(null);
  const pageSize = 10;

  useEffect(() => {
    fetchBreeds().then(setBreeds);
  }, []);

  const {
    data: searchData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'dogs',
      { selectedBreed, zipCode, ageMin, ageMax, sortOrder, pageCursor },
    ],
    queryFn: () =>
      fetchDogs({
        breeds: selectedBreed ? [selectedBreed] : [],
        zipCodes: zipCode ? [zipCode] : [],
        ageMin,
        ageMax,
        size: pageSize,
        from: pageCursor,
        sort: sortOrder,
      }),
    keepPreviousData: true,
  });

  //dog details:
  const { data: dogs, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['dogDetails', searchData?.resultIds],
    queryFn: () => fetchDogDetails(searchData?.resultIds || []),
    enabled: !!searchData?.resultIds,
  });

  return (
    <Container>
      <h1>Browse Available Dogs</h1>

      {/* filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Select
          value={selectedBreed}
          onChange={e => setSelectedBreed(e.target.value)}
          displayEmpty
        >
          <MenuItem value=''>All Breeds</MenuItem>
          {breeds.map(breed => (
            <MenuItem key={breed} value={breed}>
              {breed}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label='Zip Code'
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          variant='outlined'
        />

        <TextField
          label='Min Age'
          type='number'
          value={ageMin ?? ''}
          onChange={e => setAgeMin(Number(e.target.value) || null)}
          variant='outlined'
        />

        <TextField
          label='Max Age'
          type='number'
          value={ageMax ?? ''}
          onChange={e => setAgeMax(Number(e.target.value) || null)}
          variant='outlined'
        />

        <Select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <MenuItem value='breed:asc'>Breed (A-Z)</MenuItem>
          <MenuItem value='breed:desc'>Breed (Z-A)</MenuItem>
          <MenuItem value='age:asc'>Age (Youngest First)</MenuItem>
          <MenuItem value='age:desc'>Age (Oldest First)</MenuItem>
        </Select>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading dogs.</p>}

      {/* dog details */}
      <Grid container spacing={2}>
        {dogs?.map(dog => (
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {/* <Pagination
        count={data?.totalPages || 1}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ marginTop: '20px' }}
      />{' '} */}
    </Container>
  );
};

export default DogsList;
