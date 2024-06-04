// take object
//{"color":{"blue":false,"green":false,"pink":false,"white":false,"yellow":false}, "size":""}
//  make pairs -
// size, ''
// color, `${selectedColor}-${selectedColor}-${selectedColor}`

import { FilterValues } from './filters';

// parse color param and put into request with &filter=variants.attributes.color("selectedColor") for each selected color

export const formatFilters = ({ color, size }: FilterValues): { color: string; size: string } => {
  console.log('AAAA', color);
  const selectedColors = Object.keys(color)
    .filter((key) => color[key] === true)
    .join('-');
  const result = { color: '', size: '' };
  result.size = size;
  result.color = selectedColors;
  return result;
};

console.log(
  formatFilters({ color: { blue: false, green: false, pink: false, white: false, yellow: false }, size: 'small' }),
);
