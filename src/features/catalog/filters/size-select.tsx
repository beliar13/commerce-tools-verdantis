import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const SizeSelect = (): JSX.Element => {
  const [size, setSize] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: SelectChangeEvent): void => {
    setSize(event.target.value);
    searchParams.set('size', event.target.value);
    setSearchParams(searchParams);
  };
  // apply the same for color and categories setSearchParams logic
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="size-select-label">Size</InputLabel>
        <Select id="size-select" label="Size" labelId="size-select-label" onChange={handleChange} value={size}>
          <MenuItem value={'small'}>Small</MenuItem>
          <MenuItem value={'medium'}>Medium</MenuItem>
          <MenuItem value={'big'}>Big</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
