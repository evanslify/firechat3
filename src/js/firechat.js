var ractive = require('ractive');
var firebase = require('firebase');
var $ = require('jquery');
var cookie = require('js-cookie');
var Vue = require('vue');
var moment = require('moment');

var config = {
    apiKey: "AIzaSyCM6QLlRjQfkRSfG_lsi3zNS2qBGccYLhw",
    authDomain: "chatapp-53089.firebaseapp.com",
    databaseURL: "https://chatapp-53089.firebaseio.com",
    storageBucket: "chatapp-53089.appspot.com",
};
firebase.initializeApp(config);
var chatRef = firebase.database().ref();

function generateRef(refno) {
    return firebase.database().ref(refno);
}

// function getLastKey(message) {
    // chatRef.limitToLast(1).once(
        // 'child_added', function(snapshot) {
            // var newRef = parseInt(snapshot.key, 10) + 1;
            // console.log('newref: ', newRef);
            // var ref = generateRef(newRef);
            // addMessage(ref, message);
        // }
    // );
// }

function addMessage(message) {
    chatRef.push(message);
    // ref.transaction(function (messagePos) {
        // if (messagePos) {  // message exists
            // console.log('collided with: ', messagePos);
            // return; // return as fail
        // } else {
            // return message;
        // }
    // },
    // function (error, status, snapshot) {
        // if (!status) {
            // console.log('error:', error);
            // console.log('commited: ', status);
            // var newKey = parseInt(snapshot.key, 10) + 1;
            // var newRef = generateRef(newKey);
        // }
    // });
}

function genMessage(message, username) {
    var time = moment().format('YYYY/MM/DD, hh:mm:ss');
    var msg = ({
        message, time, username
    });
    addMessage(msg);
}

var v = new Vue({
  el: '#vueChat',
  data: {
    messages: [],
    id: null,
    message: null
    },
  methods: {
    sendMessage: function () {
        genMessage(this.message, this.id);
      },
    clearAll: function () {
        v.id = null;
        v.message = null;
    }
  }
});

function parseMessage(snapshot) {
    return [snapshot.time, snapshot.username, snapshot.message];
}


chatRef.on('child_added', function (snapshot) {
    var msg = parseMessage(snapshot.val());
    v.messages.push(msg);
});
