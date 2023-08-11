import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

const useStylesProject = makeStyles((theme) => ({
  root: (props) => ({
    flex: '1 1 auto',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'initial',
    },
    maxWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    backgroundColor: props.background,
    color: theme.palette.getContrastText(props.background),
  }),
  image: {
    margin: '0 auto 10px auto',
    display: 'block !important',
  },
  content: {
    flexGrow: 1,
  },
}));

const Project = ({ name, content, photo, GHlink, technologies, secondLink, secondLinkCallToAction, background, color }) => {
  const classes = useStylesProject({ background, color });
  let button
  if (secondLink) {
    button = <Button
                size='small'
                component='a'
                href={secondLink}
                target='_blank'
                rel='noopener'
                disabled={!secondLink}
                color='inherit'
              >
                {secondLinkCallToAction}
              </Button>
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <GatsbyImage className={classes.image} image={photo} alt={name} />
        <Typography variant='h6'>{name}</Typography>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Typography variant='text'>{technologies}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          component='a'
          href={GHlink}
          target='_blank'
          rel='noopener'
          disabled={!GHlink}
          color='inherit'
        >
          GitHub
        </Button>
        {button}
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
}));

const TopProjects = ({ topProjects }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
