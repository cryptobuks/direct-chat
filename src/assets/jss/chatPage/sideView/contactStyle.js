import recentChatStyle from './recentChatStyle';

const globalSearchLable = {
  color: '#f50057',
  fontWeight: 'bold',
  marginBottom: '-1rem'
};
const contactItemStyle = {
  ...recentChatStyle,
  searchAndAddContact: { flexGrow: 0 },
  search: {
    width: '80%',
    margin: '0.3rem 0',
    '& label[data-shrink=false]': {
      top: '-0.5rem'
    }
  },
  searchOutline: {
    color: 'black'
  },
  globalSearch: {
    width: '3rem',
    margin: '0',
    marginLeft: '0.2rem',
    marginTop: '1rem'
  },
  globalSearchLable,
  globalSearchLableOff: {
    ...globalSearchLable,
    color: 'gray'
  },
  addContactButton: {
    width: '2rem',
    height: '2rem',
    minHeight: 'unset'
  },
  listItem: {
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },
  checkSign: {
    color: 'green'
  }
};

export default contactItemStyle;
