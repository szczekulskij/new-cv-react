import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  card: {
    background: theme.palette.primary.main,
    flex: '1 1 auto',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'initial',
    },
    maxWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  cardActions: {
    marginTop: 'auto',
  },
  image: {
    margin: '0 auto 10px auto',
    display: 'block !important',
  },
  content: {
    flexGrow: 1,
  },
  button: {
    background: theme.palette.background.default,
    color: theme.palette.getContrastText(theme.palette.background.default),
  }

}));

const Project = ({
  name,
  content,
  photo,
  GHlink,
  technologies,
  secondLink,
  secondLinkCallToAction,
}) => {
  const classes = useStyles();
  let button;
  if (secondLink) {
    button = (
      <Button
        size='small'
        component='a'
        href={secondLink}
        target='_blank'
        rel='noopener'
        disabled={!secondLink}
        color='inherit'
        className={classes.button}
      >
        {secondLinkCallToAction}
      </Button>
    );
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <GatsbyImage className={classes.image} image={photo} alt={name} />
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='overline'>Tech stack: {technologies}</Typography>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          component='a'
          href={GHlink}
          target='_blank'
          rel='noopener'
          disabled={!GHlink}
          color='inherit'
          className={classes.button}
        >
          GitHub
        </Button>
        {button}
      </CardActions>
    </Card>
  );
};

const TopProjects = ({ topProjects }) => {
  const classes = useStyles();
  return (
    <div className={classes.cardContainer}>
      {topProjects.map((project) => (
        <Project
          key={project.frontmatter.name}
          name={project.frontmatter.name}
          content={project.html}
          photo={project.frontmatter.photoName.childImageSharp.gatsbyImageData}
          GHlink={project.frontmatter.GHlink}
          technologies={project.frontmatter.technologies}
          secondLink={project.frontmatter.secondLink}
          secondLinkCallToAction={project.frontmatter.secondLinkCallToAction}
          background={project.frontmatter.background}
          color={project.frontmatter.color}
        />
      ))}
    </div>
  );
};

export default TopProjects;
