import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, Image, View } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { Images } from '../Themes';
import styles from './Styles/ListviewExampleStyle';
import UsersList from './UsersList';
import * as friendsActionCreators from '../Actions/FriendsActions';


class Friends extends Component {

  componentWillMount() {
  }

  onFriendSelect(friend, index) {
    console.log('friendselect');
    this.props.unselectAllFriends();
    this.props.selectFriend(friend, index);
    // this.props.fetchPhotos(friend);
    NavigationActions.photos();
  }

  onFriendsListMount() {
    this.props.fetchFriends();
  }

  render() {
    return (
      <View style={styles.ontainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView>
          <UsersList
            onSelect={(user, index) => this.onFriendSelect(user, index)}
            listComponentWillMount={() => this.onFriendsListMount()}
            users={this.props.allFriends}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state, action) => {
  console.log(state.friends);
  return {
    allFriends: state.friends.allFriends,
    lastSelectedFriend: state.friends.lastSelectedFriend,
  };
};

Friends.propTypes = {
  allFriends: PropTypes.array.isRequired,
  unselectAllFriends: PropTypes.func.isRequired,
  selectFriend: PropTypes.func.isRequired,
  // fetchPhotos: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, friendsActionCreators)(Friends);
