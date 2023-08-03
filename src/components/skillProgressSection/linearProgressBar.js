import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  typography: {
      marginBottom: "0px",
      paddingBottom: "0px",
      color: "#000000",
  },
  bar: { // not used anywhere, but would come in handy if we were changing bar's colours
    // "& .MuiLinearProgress-colorPrimary": { backgroundColor: "#e6bc53",},
    // "& .MuiLinearProgress-barColorPrimary": { backgroundColor: "#b58500",},
  },
});


export default function LinearProgressBar(props) {
  const classes = useStyles();
  return (
    <Container>
    <Typography className={classes.typography} variant="body2"  >{props.name}</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom:"11px"}}>
      <Box sx={{ width: '88%', mr: 1 }}>
        <LinearProgress className={classes.bar} variant="determinate" value={props.progress} sx={{height: 10}}/>
      </Box>
      <Box sx={{ minWidth: 3}}>
        <Typography className={classes.typography} variant="body2" > {`${Math.round(props.progress,)}%`}</Typography>
      </Box>
    </Box>
    </Container>
  );
}