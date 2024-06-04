import { FilterValues } from './filters';

export const formatFilters = ({ color, size }: FilterValues): { color: string; size: string } => {
  const selectedColors = Object.keys(color)
    .filter((key) => color[key] === true)
    .join('-');
  const result = { color: '', size: '' };
  result.size = size;
  result.color = selectedColors;
  return result;
};
