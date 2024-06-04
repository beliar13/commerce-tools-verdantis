import { ChangeEvent, FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

export const Search: FC = () => {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
    searchParams.set('search', event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <TextField className="w-36" id="search" label="Search" onChange={handleChange} value={search}></TextField>
      </FormControl>
    </Box>
  );
};
