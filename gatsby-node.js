const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    let slug = createFilePath({ node, getNode, basePath: 'blogposts' });
    slug = slug.replace(/\s+/g, '-'); // Replace spaces with hyphens
    createNodeField({
      node,
      name: 'slug',
      value: `/blog${slug}`,
    });
    console.log("slug: ", slug);
  }
};

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
          fields {
            slug
          }
        }
      }
    }
  `);

  result.data.blogPosts.nodes.forEach((post) => {
    createPage({
      path: post.fields.slug,
      component: path.resolve('./src/templates/blogPost.js'),
      context: {
        slug: post.fields.slug,
      },
    });
  });
};