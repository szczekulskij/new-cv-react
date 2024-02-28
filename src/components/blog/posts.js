import React from 'react';
import { Link } from 'gatsby';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { format } from 'date-fns';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      color: '#ff4081',
    },
  },
  body1: {
    fontSize: '0.875rem',
  },
  postMeta: {
    display: 'flex',
    marginBottom: '1rem', // Added this line
  },
  date: {
    marginRight: '1rem',
    fontWeight: 'bold', // Added this line
  },
  minRead: {
    fontWeight: 'bold', // Added this line
  },
  tags: {
    display: 'flex',
    gap: '0.5rem',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.5rem',
  },
});

const BlogPost = ({ blogPost }) => {
  const classes = useStyles();

  return (
    <Box my={4}>
      <Link to={`/blog/${blogPost.frontmatter.title}`} className={classes.link}>
        <Typography variant="h4">{blogPost.frontmatter.title}</Typography>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: blogPost.html }} />
      <div className={classes.postMeta}>
        <Typography variant="body1" className={classes.date}>{format(new Date(blogPost.frontmatter.date), 'yyyy-MM-dd')}</Typography>
        <Typography variant="body1" className={classes.minRead}>{Math.ceil(blogPost.html.length / 1000)} min read</Typography>
      </div>
      <div className={classes.tags}>
        {blogPost.frontmatter.tags.map((tag) => (
          <span key={tag} className={classes.tag}>{tag}</span>
        ))}
      </div>
    </Box>
  );
};

export default BlogPost;