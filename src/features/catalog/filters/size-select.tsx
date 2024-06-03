import { useState } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const SizeSelect = (): JSX.Element => {
  const [size, setSize] = useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    setSize(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select id="size-select" label="Age" labelId="size-select-label" onChange={handleChange} value={size}>
          <MenuItem value={'small'}>Small</MenuItem>
          <MenuItem value={'medium'}>Medium</MenuItem>
          <MenuItem value={'big'}>Big</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
