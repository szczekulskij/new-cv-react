const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      blogPosts: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/blogposts/" }
          internal: { type: { eq: "MarkdownRemark" } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          frontmatter {
            title
          }
        }
      }
    }
  `);

  result.data.blogPosts.nodes.forEach((post) => {
    createPage({
      path: `/blog/${post.frontmatter.title}`,
      component: path.resolve('./src/templates/blogPost.js'),
      context: {
        title: post.frontmatter.title,
      },
    });
  });
};