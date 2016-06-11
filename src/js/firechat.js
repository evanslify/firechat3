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
var chatRef = firebase.database().ref('messages');

function generateRef(refno) {
    return firebase.database().ref(refno);
}

function addMessage(message) {
    chatRef.push(message);
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
