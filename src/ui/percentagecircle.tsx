import React from 'react';
import { Box, Typography, styled } from '@mui/material';

interface RoundedPercentageProps {
  value: number;
}

const Circle = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 50,
  height: 50,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: bgcolor,
  color: '#fff',
  margin : '0 auto',
}));

const PercentageCircle: React.FC<RoundedPercentageProps> = ({ value }) => {
  const roundedValue = Math.round(value);
  let color = '';

  // Define colors based on the rounded value
  if (roundedValue >= 8) {
    color = 'green';
  } else if (roundedValue >= 5) {
    color = 'orange';
  } else {
    color = 'red';
  }

  return (
    <Circle bgcolor={color}>
      <Typography>
        {roundedValue}%
      </Typography>
    </Circle>
  );
};

export default PercentageCircle;
