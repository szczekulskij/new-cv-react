import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import classnames from 'classnames';
import React, { Component } from 'react';
import GitHubIcon from '../assets/github.svg';
import MailIcon from '../assets/gmail.svg';
import InstagramIcon from '../assets/instagram.svg';
import LinkedIcon from '../assets/linkedin.svg';
import ResearchGateIcon from '../assets/research_gate.svg';
import ProfileImage from './profileImage';

const styles = (theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginBottom: 50,
    marginTop: 50,
    width: '90%',
    maxWidth: 1280,
    [theme.breakpoints.down('sm')]: {
      width: '85%',
    },
    textAlign: 'center',
  },
  picture: {
    margin: 'auto',
    width: 100,
    borderRadius: 100,
  },
  text: {
    color: 'white',
  },
  title: {
    fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '4rem',
    marginTop: 30,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: '1.5rem',
  },
  icons: {
    marginTop: 32,
  },
  icon: {
    width: 40,
    fill: '#fff',
    padding: '0 8px',
  },
});

class Splash extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <ProfileImage className={classes.picture} />
          <Typography variant='h1' className={classnames(classes.text, classes.title)}>
            Jan Szczekulski
          </Typography>
          <Typography variant='h4' className={classnames(classes.text, classes.subtitle)}>
            Data Scientist | Software Engineer
          </Typography>
          <div className={classes.icons}>
            <Icon
              tooltip='szczekulskij'
              component={<GitHubIcon className={classes.icon} />}
              href='https://github.com/szczekulskij'
              analyticsEvent='github'
            />
            <Icon
              tooltip='linkedin'
              component={<LinkedIcon className={classes.icon} />}
              href='https://www.linkedin.com/in/jan-szczekulski-272ab615a/'
              analyticsEvent='linkedin'
            />
            <Icon
              tooltip='email'
              component={<MailIcon className={classes.icon} />}
              href='mailto:szczekulskij@gmail.com'
              analyticsEvent='mail'
            />
            <Icon
              tooltip='@jan_szczekulski'
              component={<InstagramIcon className={classes.icon} />}
              href='https://www.instagram.com/jan_szczekulski/'
              analyticsEvent='instagram'
            />
            <Icon
              tooltip='researchGate'
              component={<ResearchGateIcon className={classes.icon} />}
              href='https://www.researchgate.net/profile/Jan-Szczekulski-2/research'
              analyticsEvent='researchGate'
            />
          </div>
        </div>
      </div>
    );
  }
}

const Icon = ({ component, tooltip, analyticsEvent, ...props }) => (
  <Tooltip title={tooltip} interactive enterTouchDelay={0}>
    <a target='_blank' rel='noopener' data-umami-event={`${analyticsEvent}-social-hero`} {...props}>
      {component}
    </a>
  </Tooltip>
);

export default withStyles(styles)(Splash);
