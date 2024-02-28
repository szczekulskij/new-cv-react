import React from 'react';
import { graphql } from 'gatsby';
import { Typography, makeStyles } from '@material-ui/core';
import { format } from 'date-fns';

const useStyles = makeStyles({
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  title: {
    textAlign: 'center',
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  date: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  content: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
  },
});

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
      fields {
        slug
      }
    }
  }
`;

const BlogPost = ({ data }) => {
  const classes = useStyles();
  const post = data.markdownRemark;

  return (
    <div className={classes.container}>
      <Typography variant="h2" className={classes.title}>{post.frontmatter.title}</Typography>
      <Typography variant="body1" className={classes.date}>{format(new Date(post.frontmatter.date), 'yyyy-MM-dd')}</Typography>
      <div dangerouslySetInnerHTML={{ __html: post.html }} className={classes.content} />
    </div>
  );
};

export default BlogPost;