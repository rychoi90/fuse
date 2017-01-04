const express = require('express');
const Friendship = require('../db/users/User-Friends');
const User = require('../db/users/User');

const app = express();

app.get('/', (req, res) => {
  if (req.session.passport || process.env.NODE_ENV === 'test') {
    // console.log(req.user.id);
    Friendship.findAll({
      where: {
        userId: req.user.id,
        // userId: 1,
      },
    })
    .then((friends) => {
      return friends.map((friend) => {
        return friend.friendId;
      });
    })
    .then((friendIdArray) => {
      User.findAll({
        where: {
          id: friendIdArray,
        },
        attributes: {
          exclude: ['email'],
        },
      })
      .then((friendsInfo) => {
        return friendsInfo.map((friendInfo) => {
          return friendInfo.dataValues;
        });
      })
      .then((friendInfoArray) => {
        res.send(friendInfoArray);
      })
      .catch((err) => {
        console.error(err);
      });
    });
  } else {
    console.log('no session');
    res.redirect('/auth/facebook');
  }
});

// From the client side, user would route to /users/:id, looping through an making multiple times

app.post('/', (req, res) => {
  console.log(process.env.NODE_ENV);
  console.error('select a friend to add');
  res.redirect('/');
});

app.post('/:id', (req, res) => {
  Friendship.findOne({
    where: {
      id: req.params.id,
    },
  })
  .then((friend) => {
    if (friend.length !== 0) {
      Friendship.create({
        userId: req.session.passport.user,
        friendId: req.params.id,
      })
      .then((id) => {
        console.log('friend created');
        res.send(id);
      });
    } else {
      console.error('Friend not found');
      res.redirect('/');
    }
  });
});

module.exports = app;
