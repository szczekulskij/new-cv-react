import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: '75px 0',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    marginBottom: 0,
    padding: '0px 0px 50px 0px',
  },
  button: {
    color: '#fff',
    display: 'flex',
    alignItems: 'center',

  },
});

const DownloadCVSection = ({ title, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} {...props}>
      <Typography variant='h4' className={classes.title}>Download my CV here:</Typography>
      <Button className={classes.button} variant="outlined">Outlined</Button>
    </div>
  );
};

export default DownloadCVSection;
