import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import LinearProgressBar from './linearProgressBar';

const useStyles = makeStyles({
  root: {
    padding: '75px 0',
    color: "#FFFFFF",
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    fontSize: '1.45rem',
    lineHeight: '110%',
    margin: '.82rem 0 .656rem 0',
    fontWeight: 400,
    color: "#FFFFFF",
  }
});

const FrameWorkAndToolsDict = {
    // "name" : progress (int)
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
    // "name" : progress (int)
    "Python" : 95,
    "SQL" : 85,
    "Java" : 80,
    "Shell" : 50,
    "js, css & htlm" : 50,
}





const SkillProgressSection = () => {
  const classes = useStyles();
  return (
    <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography color="#00ff00" variant='h5' className={classes.header}>Frameworks & Tools</Typography>
            <ul className={classes.list} colour="white">
            {Object.entries(FrameWorkAndToolsDict).map(([name, progress]) => (
                <LinearProgressBar progress={progress} name={name}/>
            ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' className={classes.header}>Languages</Typography>
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