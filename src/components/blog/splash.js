import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000',
    padding: theme.spacing(8, 0, 6),
  },
  header: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    color: '#fff',
  },
  subheader: {
    color: '#fff',
  },
}));

const BlogSplash = ({ header }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h2" align="center" className={classes.header}>
          {header}
        </Typography>
        <Typography variant="h5" align="center" paragraph className={classes.subheader}>
          Welcome to my blog. Here you'll find articles on a variety of topics. Enjoy your read!
        </Typography>
      </Container>
    </div>
  );
};

export default BlogSplash;