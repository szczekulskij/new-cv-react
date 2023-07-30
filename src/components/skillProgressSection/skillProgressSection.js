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

const SkillProgressSection = () => {
  const classes = useStyles();
  return (
    <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography color="#00ff00" variant='h5' className={classes.header}>Frameworks & Tools</Typography>
            <ul className={classes.list}>

              {/* <Typography variant='body2' component='li'>
                Email:{' '}
                <span className={classes.lightText}>
                  <a href='mailto:szczekulskij@gmail.com' data-umami-event='mail-social-footer'>szczekulskij@gmail.com</a>
                </span>
              </Typography> */}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' className={classes.header}>Languages</Typography>
            <ul className={classes.list}>
              {/* <Typography variant='body2' component='li' className={classes.sitemapLink}>
                {homepage ? (
                  <AnchorLink offset='64' href='#aboutme'>
                    About me
                  </AnchorLink>
                ) : (
                  <Link to='/#aboutme'>About me</Link>
                )}
              </Typography>
              <Typography variant='body2' component='li' className={classes.sitemapLink}>
                {homepage ? (
                  <AnchorLink offset='64' href='#portfolio'>
                    Portfolio
                  </AnchorLink>
                ) : (
                  <Link to='/#portfolio'>Portfolio</Link>
                )}
              </Typography>
              <Typography variant='body2' component='li' className={classes.sitemapLink}>
                <Link to='/impossiblelist'>Impossible List</Link>
              </Typography> */}
            </ul>
          </Grid>
        </Grid>
      </Container>
  );
};

export default SkillProgressSection;