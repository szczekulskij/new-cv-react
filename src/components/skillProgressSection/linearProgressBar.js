import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
      "& .MuiLinearProgress-colorPrimary": {
          backgroundColor: "#e6bc53",
      },
      "& .MuiLinearProgress-barColorPrimary": {
          backgroundColor: "#b58500",
      },
  },
});


export default function LinearProgressBar(props) {
  const classes = useStyles();
  return (
    <Container>
    <Typography variant="body2" color="white">{props.name}</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '88%', mr: 1 }} className={classes.root}>
        <LinearProgress variant="determinate" value={props.progress} sx={{height: 13}}/>
      </Box>
      <Box sx={{ minWidth: 3}}>
        <Typography variant="body2" color="white">{`${Math.round(props.progress,)}%`}</Typography>
      </Box>
    </Box>
    </Container>
  );
}