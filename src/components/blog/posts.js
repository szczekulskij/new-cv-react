import React from 'react';
import { Link } from 'gatsby';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { format } from 'date-fns';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

const BlogPosts = ({ blogPosts }) => {
  const classes = useStyles();

  return (
    <Box>
      {blogPosts.map((post) => (
        <Box key={post.frontmatter.title} my={4}>
          <Link to={`/blog/${post.frontmatter.title}`} className={classes.link}>
            <Typography variant="h2">{post.frontmatter.title}</Typography>
            <Typography variant="body1">{format(new Date(post.frontmatter.date), 'yyyy-MM-dd')}</Typography>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default BlogPosts;