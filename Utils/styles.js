import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#fff',
      marginLeft: 10,
      textDecoration: 'none',
    },
  },

  main: {
    minHeight: '80vh',
  },

  footer: {
    textAlign: 'center',
  },
});

export default useStyles;
