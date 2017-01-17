import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Avatar, ListItem, Subheader, Toolbar } from 'react-native-material-ui/src';
// import UsersListEntry from './users-list-entry';

// Styles
import styles from './Styles/ListviewExampleStyle';

// const dataObjects = [
//   { id: 1,
//     firstName: 'Philip',
//     lastName: 'Fry',
//     image: 'https://www.wired.com/images_blogs/underwire/2010/06/fry_660.jpg',
//   },
//   { id: 2,
//     firstName: 'Bender',
//     lastName: 'Rodriguez',
//     image: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png',
//   },
//   { id: 3,
//     firstName: 'Prof',
//     lastName: 'Fransworth',
//     image: 'http://suptg.thisisnotatrueending.com/archive/4552543/images/1242295402621.jpg',
//   },
// ];

// dataObjects.map((user) => {
//   user.image =  <Image
//     source={{uri: user.image }}
//     style={{ height: 40, width: 40 }}
//   />;
//   return user;
// });

class UsersList extends Component {

  constructor(props) {
    super(props);
  }

  renderUserList() {
    console.log('users');
    console.log(this.props.users);
    return this.props.users.map((user, index) =>
      (
        <ListItem
          key={user.id}
          leftElement={<Image
            source={{uri: user.profilePictureURL }}
            style={{ height: 40, width: 40 }}
          />}
          centerElement={`${user.firstName} ${user.lastName}`}
          selected={user.selected}
          onSelect={() => onSelect(user, index)}
        />
      ),
    );
  }

  componentWillMount() {
    // this.props.componentWillMount();
  }

  onSelect(user, index) {
    this.props.onSelect(user, index);
  }

  // renderUserList() {
    // if (this.state.users.length === 0 && this.props.componentForEmptyList !== null) {
    //   return this.props.componentForEmptyList;
    // }

  //   const onSelect = this.onSelect.bind(this);

  //   return this.state.users.map((user, index) =>
  //     (
  //       <UsersListEntry
  //         key={user.id}
  //         firstName={user.firstName}
  //         lastName={user.lastName}
  //         profilePictureURL={user.profilePictureURL}
  //         selected={user.selected}
  //         onSelect={() => onSelect(user, index)}
  //       />
  //     ),
  //   );
  // }

  render() {
    return (
      <ScrollView style={styles.container}>
         {this.renderUserList()}
      </ScrollView>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  componentWillMount: PropTypes.func,
  onSelect: PropTypes.func,
  componentForEmptyList: PropTypes.object,
};

UsersList.defaultProps = {
  ComponentWillMount: () => {},
  onSelect: () => {},
  componentForEmptyList: null,
};

export default UsersList;