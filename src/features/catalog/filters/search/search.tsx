import { ChangeEvent, FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

import { filtersStyles } from '../filters-constants';

const searchButtonsStyles = {
  ':hover': { backgroundColor: 'primary.light', transition: '2s' },
  transition: '2s',
};

export const Search: FC = () => {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };
  const handleSearch = (): void => {
    searchParams.set('q', search);
    setSearchParams(searchParams);
  };
  const handleResetSearch = (): void => {
    setSearch('');
    searchParams.set('q', '');
    setSearchParams(searchParams);
  };

  return (
    <Box sx={{ width: { lg: '50%', md: '65%', sm: '80%', xs: '90%' } }}>
      <FormControl className="w-full flex-row justify-evenly gap-1 p-0" sx={{ maxHeight: '30px' }}>
        <TextField
          className="w-full"
          component="input"
          id="search"
          label="Search"
          onChange={handleChange}
          sx={{ ...filtersStyles, maxHeight: '30px' }}
          value={search}
        />
        <Button onClick={handleSearch} sx={searchButtonsStyles} variant="contained">
          <SearchIcon />
        </Button>
        <Button onClick={handleResetSearch} sx={searchButtonsStyles} variant="contained">
          <ClearIcon />
        </Button>
      </FormControl>
    </Box>
  );
};
