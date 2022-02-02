import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    display: 'flex',
    '& a': {
      color: '#fff',
      marginLeft: 10,
    },
  },

  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },

  grow: {
    flexWrap: 'wrap',
  },

  main: {
    minHeight: '80vh',
  },

  footer: {
    marginTop: 10,
    textAlign: 'center',
  },

  section: {
    marginTop: 10,
    marginBottom: 10,
  },

  form: {
    maxWidth: 400,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
});

export default useStyles;
