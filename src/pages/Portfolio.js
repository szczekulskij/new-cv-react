import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import TopProjects from '../components/portfolio/projects';
import Splash from '../components/portfolio/splash';
import Seo from '../components/seo';

const useStyles = makeStyles((theme) => ({
  section: {
    background: theme.palette.background.default,
    paddingTop: 50,
    paddingBottom: 24,
    boxShadow: theme.shadows[2],
  },
}));

const PortfolioPage = ({ data }) => {
  const classes = useStyles();
  return (
    <Layout>
      <Seo title='Portfolio' />
      <Splash />
      <Box className={classes.section}>
        <Container>
          <TopProjects topProjects={data.topProjects.nodes} />
        </Container>
      </Box>
    </Layout>
  );
};

export const query = graphql`
  query {
    topProjects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/topprojects/" }
        internal: { type: { eq: "MarkdownRemark" } }
      }
      sort: { fields: frontmatter___order, order: ASC }
    ) {
      nodes {
        html
        frontmatter {
          name
          GHlink
          secondLink
          secondLinkCallToAction
          background
          color
          technologies
          photoName {
            childImageSharp {
              gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 80, height: 80)
            }
          }
        }
      }
    }
  }
`;

export default PortfolioPage;
