import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@material-ui/core';

export default function LinearProgressBar(props) {
  return (
    <Container>
    <Typography variant="body2" color="white">{props.name}</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '88%', mr: 1 }}>
        <LinearProgress variant="determinate" value={props.progress} color='secondary'/>
      </Box>
      <Box sx={{ minWidth: 3}}>
        <Typography variant="body2" color="white">{`${Math.round(props.progress,)}%`}</Typography>
      </Box>
    </Box>
    </Container>
  );
}