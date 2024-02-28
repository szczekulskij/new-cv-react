import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import BlogPosts from '../components/blog/posts'; // Assuming you have a BlogPosts component
import Splash from '../components/blog/splash'; // Assuming you have a Splash component for the blog
import Seo from '../components/seo';
import { format } from 'date-fns';


const useStyles = makeStyles((theme) => ({
  section: {
    background: theme.palette.background.default,
    paddingTop: 50,
    paddingBottom: 24,
    boxShadow: theme.shadows[2],
  },
}));

const BlogPage = ({ data }) => {
  const classes = useStyles();
  return (
    <Layout>
      <Seo title='Blog' />
      <Splash />
      <Box className={classes.section}>
        <Container>
          <BlogPosts blogPosts={data.blogPosts.nodes} />
        </Container>
      </Box>
    </Layout>
  );
};

export const query = graphql`
  query {
    blogPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/blogposts/" }
        internal: { type: { eq: "MarkdownRemark" } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        html
        frontmatter {
          title
          date
        }
      }
    }
  }
`;

export default BlogPage;