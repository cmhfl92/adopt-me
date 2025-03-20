import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBreeds, fetchDogs } from '../api/dog-service';
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

  const { data, isLoading, error } = useQuery({
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

  console.log('data', data);

  return (
    <Container>
      <h1>Browse Available Dogs</h1>

      {/* Filters */}
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

        <Button variant='contained' onClick={() => setPageCursor(null)}>
          Apply
        </Button>
      </div>

      {/* Loading and Error Handling */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading dogs.</p>}

      {/* Dog Cards */}
      <Grid container spacing={2}>
        {data?.resultIds.map(id => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card>
              <CardContent>
                <Typography variant='h6'>Dog ID: {id}</Typography>
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
