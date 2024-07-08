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
    maxWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    margin: 20, // Adjusted for better spacing
    padding: 15, // Padding inside the card
    color: theme.palette.getContrastText(theme.palette.primary.main),
    borderRadius: 8, // Rounded corners
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', // Shadow effect
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for hover effect
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0px 6px 15px rgba(0,0,0,0.2)',
    },
  },
  cardActions: {
    marginTop: 'auto',
    justifyContent: 'center', // Center aligning the buttons
  },
  image: {
    borderRadius: 6, // Rounded corners for images
    margin: '0 auto 10px auto',
    display: 'block !important',
    width: '100%', // Ensuring the image takes full width of the card
    height: 200, // Fixed height for uniformity
    objectFit: 'cover', // Ensures the image covers the area, without distortion
  },
  content: {
    flexGrow: 1,
    padding: '0 10px', // Padding for the content for better alignment
  },
  button: {
    background: theme.palette.background.default,
    color: theme.palette.getContrastText(theme.palette.background.default),
    '&:hover': {
      background: theme.palette.background.light, // Slight change on hover for buttons
    },
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
  blogName, // new prop
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

  // Generate blogLink based on blogName
  const blogLink = blogName ? `/blog/${blogName.replace(/\s+/g, '-')}` : null;

  return (
    <Card className={classes.card}>
      <CardContent>
      <GatsbyImage
        className={classes.image}
        image={photo}
        alt={name}
        // imgStyle={{ height: "100px", width: "500px"}} // This controls the image itself
        style={{ height: "120px", width: "150px" }} // This attempts to control the container of the image
      />
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
        {blogLink && (
          <Button
            size='small'
            component='a'
            href={blogLink}
            target='_blank'
            rel='noopener'
            color='inherit'
            className={classes.button}
          >
            Blog Post
          </Button>
        )}
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
          blogName={project.frontmatter.blogName}
        />
      ))}
    </div>
  );
};

export default TopProjects;