import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UsersListItem from './UsersListItem.jsx';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      showAvatar, onClick, search, store: { users, conversation, convTree}, inputValue,
    } = this.props;
    let list;
    if (!inputValue) {
      list = conversation || [];
    } else {
      list = search.length ? [...search] : convTree.find(inputValue, conversation);
    }
    console.log('render list', list.length, search.length);

    return (list.length
      ? (
        <div className="dropdown__search-list">
          <ul>
            {list.map(key => (
              <li
                id={key}
                key={key}
                className="search-item"
                onClick={users[key] ? onClick.bind(null, key) : null}
              >
                <UsersListItem showAvatar={showAvatar} item={users[key]} />
              </li>
            ))}
          </ul>
        </div>
      )
      : null
    );
  }
}

UsersList.propTypes = {
  showAvatar: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  search: PropTypes.objectOf(PropTypes.object).isRequired,
  store: PropTypes.objectOf(PropTypes.object).isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default connect(store => ({ store }))(UsersList);