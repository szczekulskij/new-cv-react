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
      marginBottom: "0px",
      paddingBottom: "0px"
  },
});


export default function LinearProgressBar(props) {
  const classes = useStyles();
  return (
    <Container>
    <Typography variant="overline" color="white" >{props.name}</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom:"6px", paddingTop:"0px", marginTop:"0px"}}>
      <Box sx={{ width: '88%', mr: 1 }}>
        <LinearProgress variant="determinate" value={props.progress} sx={{height: 7}}/>
      </Box>
      <Box sx={{ minWidth: 3}}>
        <Typography variant="body2" color="white">{`${Math.round(props.progress,)}%`}</Typography>
      </Box>
    </Box>
    </Container>
  );
}