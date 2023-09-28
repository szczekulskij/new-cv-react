import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(2),
    boxShadow: theme.shadows[2],
    '& a': {
      color: '#00acff',
      textDecoration: 'none',
    },
  },
  header: {
    fontSize: '1.45rem',
    lineHeight: '110%',
    margin: '.82rem 0 .656rem 0',
    fontWeight: 400,
  },
  lightText: {
    fontWeight: 300,
  },
  list: {
    listStyleType: 'none',
    marginLeft: 0,
  },
  credits: {
    background: theme.palette.primary.dark,
    padding: `${theme.spacing(1)}px 0`,
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  creditsText: {
    fontWeight: 300,
    fontSize: '0.80rem',
  },
  sitemapLink: {
    padding: '4px 0',
    color: 'red',
  },
}));

const Footer = ({ homepage }) => {
  var classes = useStyles();
  return (
    <footer className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' className={classes.header}>
              Contact me
            </Typography>
            <ul className={classes.list}>
              <Typography variant='body2' component='li'>
                Personal Email:{' '}
                <span className={classes.lightText}>
                  <a href='mailto:szczekulskij@gmail.com' data-umami-event='mail-social-footer'>
                    szczekulskij@gmail.com
                  </a>
                </span>
              </Typography>
              <Typography variant='body2' component='li'>
                University Email:{' '}
                <span className={classes.lightText}>
                  <a href='mailto:jszczekulski@ucsd.edu' data-umami-event='mail2-social-footer'>
                    jszczekulski@ucsd.edu
                  </a>
                </span>
              </Typography>
              <Typography variant='body2' component='li'>
                Linkedin:{' '}
                <span className={classes.lightText}>
                  <a
                    href='https://www.linkedin.com/in/jan-szczekulski-272ab615a/'
                    data-umami-event='linkedin-social-footer'
                  >
                    linkedin
                  </a>
                </span>
              </Typography>
            </ul>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.credits}>
        <Container className={classes.footerBottom}>
          <Typography variant='body2' className={classes.creditsText}>
            © 2023-{new Date().getFullYear()} Jan Szczekulski
          </Typography>
          <Typography variant='body2'>
            <a
              href='https://github.com/szczekulskij/new-cv-react'
              rel='noopener noreferrer'
              target='_blank'
              data-umami-event='source-code-footer'
            >
              Website Source Code
            </a>
          </Typography>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
