import React from 'react';
import { graphql } from 'gatsby';
import { Typography, makeStyles, Link, SvgIcon } from '@material-ui/core';
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
  footer: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  githubIcon: {
    fill: '#000000',
    '&:hover': {
      fill: '#4078c0',
    },
  },
});

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        GHlink
      }
      fields {
        slug
      }
    }
  }
`;

const GitHubIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6 .113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.905-.015 3.3 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </SvgIcon>
);

const BlogPost = ({ data }) => {
  const classes = useStyles();
  const post = data.markdownRemark;

  return (
    <div className={classes.container}>
      <Typography variant="h2" className={classes.title}>{post.frontmatter.title}</Typography>
      <Typography variant="body1" className={classes.date}>{format(new Date(post.frontmatter.date), 'yyyy-MM-dd')}</Typography>
      <div dangerouslySetInnerHTML={{ __html: post.html }} className={classes.content} />
      <div className={classes.footer}>
        <Link href={post.frontmatter.GHlink} target="_blank" rel="noopener noreferrer">
          <GitHubIcon className={classes.githubIcon} />
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;