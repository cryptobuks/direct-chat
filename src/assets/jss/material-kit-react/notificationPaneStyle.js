import buttonStyle from 'assets/jss/material-kit-react/components/buttonStyle';

const notificationPaneStyle = {
  container: {},
  listItem: { padding: '0.5rem' },
  button: {
    ...buttonStyle.button,
    borderRadius: '3px',
    padding: '0.2rem',
    fontSize: '0.8rem',
    marginRight: '0.5rem'
  },
  typeText: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    userSelect: 'none'
  }
};
export default notificationPaneStyle;
