import { ChangeEvent, FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

export const Search: FC = () => {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
    searchParams.set('q', event.target.value);
    searchParams.set('size', '');
    searchParams.set('color', '');
    searchParams.set('sort', '');
    setSearchParams(searchParams);
  };
  const handleResetSearch = (): void => {
    setSearch('');
    searchParams.set('q', '');
    setSearchParams(searchParams);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <TextField
          className="w-36"
          id="search"
          label="Search"
          onChange={handleChange}
          sx={{ ':hover': { bgcolor: 'primary.light', transition: '2s' }, backgroundColor: 'primary.contrastText' }}
          value={search}
        ></TextField>
        <Button
          onClick={handleResetSearch}
          sx={{ ':hover': { backgroundColor: 'primary.light', transition: '2s' }, transition: '2s' }}
          variant="contained"
        >
          Clear search
        </Button>
      </FormControl>
    </Box>
  );
};
