import { Box, Container, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import BlogPosts from '../components/blog/posts';
import Splash from '../components/blog/splash';
import Seo from '../components/seo';

const useStyles = makeStyles((theme) => ({
  section: {
    background: theme.palette.background.default,
    paddingTop: 50,
    paddingBottom: 24,
    boxShadow: theme.shadows[2],
  },
  divider: {
    margin: '1rem 0',
  },
}));

const BlogPage = ({ data }) => {
  const classes = useStyles();
  const { nodes: blogPosts } = data.blogPosts;

  return (
    <Layout>
      <Seo title='Blog' />
      <Splash />
      <Box className={classes.section}>
        <Container>
          {blogPosts.map((post, index) => (
            <React.Fragment key={post.frontmatter.title}>
              <BlogPosts blogPost={post} />
              {index < blogPosts.length - 1 && <Divider className={classes.divider} />}
            </React.Fragment>
          ))}
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
          tags
          description
        }
        fields {
          slug
        }
      }
    }
  }
`;

export default BlogPage;