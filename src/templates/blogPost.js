import React from 'react';
import { graphql } from 'gatsby';
import { Typography } from '@material-ui/core';
import { format } from 'date-fns';

export const query = graphql`
  query($title: String!) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`;

const BlogPost = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <div>
      <Typography variant="h2">{post.frontmatter.title}</Typography>
      <Typography variant="body1">{format(new Date(post.frontmatter.date), 'yyyy-MM-dd')}</Typography>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export default BlogPost;