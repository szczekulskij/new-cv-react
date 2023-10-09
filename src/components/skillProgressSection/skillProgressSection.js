import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import LinearProgressBar from './linearProgressBar';

const useStyles = makeStyles({
  smallHeader: {
    fontSize: '1.65rem',
    lineHeight: '110%',
    margin: '.82rem 0 .656rem 0',
    fontWeight: 400,
    color: "#000000",
  },
  // bigHeader: {
  //   lineHeight: '110%',
  //   margin: '.82rem 0 .656rem 0',
  //   fontWeight: 400,
  //   color: "#000000",
  //   textAlign: 'center', 
  //   m: 1,
  //   paddingBottom: "20px"
  // },
  list: {
    color: "#000000",
  }
});

const FrameWorkAndToolsDict = {
    // name(string) : progress(int)
    "Git" : 90,
    "Pandas, numpy, matplotlib" : 85,
    "Docker" : 70,
    "PyTorch, Tensorflow" : 70,
    "Jenkins & GH actions" : 70,
    "Springboot" : 60,
    "React, Angular" : 50,
    "Kubernetes" : 50,
}


const LanguagesDict = {
    // name(string) : progress(int)
    "Python" : 95,
    "SQL" : 85,
    "Java" : 80,
    "Shell" : 50,
    "Javascript, CSS & HTML" : 50,
    "C++" : 30,
}





const SkillProgressSection = () => {
  const classes = useStyles();
  return (
    <Container>
      {/* <Typography variant='h3' className={classes.bigHeader}>My expertise</Typography> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h1' className={classes.smallHeader}>Frameworks & Tools</Typography>
            <ul className={classes.list}>
              {Object.entries(FrameWorkAndToolsDict).map(([name, progress]) => (
                  <LinearProgressBar progress={progress} name={name}/>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h1' className={classes.smallHeader}>Languages</Typography>
            <ul className={classes.list}>
              {Object.entries(LanguagesDict).map(([name, progress]) => (
                  <LinearProgressBar progress={progress} name={name}/>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Container>
  );
};

export default SkillProgressSection;