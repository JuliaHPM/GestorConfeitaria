import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner({ size, color, ...rest }) {
  return (
    <CircularProgress size={size} sx={{ color: color ? color : '#6d6d6d' }} {...rest} />
  );
}