var ractive = require('ractive');
var firebase = require('firebase');
var $ = require('jquery');
var cookie = require('js-cookie');

var config = {
    apiKey: "AIzaSyCM6QLlRjQfkRSfG_lsi3zNS2qBGccYLhw",
    authDomain: "chatapp-53089.firebaseapp.com",
    databaseURL: "https://chatapp-53089.firebaseio.com",
    storageBucket: "chatapp-53089.appspot.com",
};
firebase.initializeApp(config);
var chatRef = firebase.database().ref();

// global.fb = firebase;
// global.cRef = chatRef;

function generateRef(refno) {
    return firebase.database().ref(refno);
}

function getLastKey(message) {
    chatRef.limitToLast(1).once(
        'child_added', function(snapshot) {
            var newRef = parseInt(snapshot.key, 10) + 1;
            var ref = generateRef(newRef);
            addMessage(ref, message);
        }
    );
}

function addMessage(ref, message) {
    ref.transaction(function (messagePos) {
        console.log(messagePos);
        if (messagePos) {  // message exists
            console.log('fail, incrementing index');
            var newIndex = parseInt(messagePos.key, 10) + 1;
            var newRef = generateRef(newIndex);
        } else {
            console.log('success');
            ref.set(message);
        }
    });
}

function genMessage(message, time, username) {
   return {
       message, time, username
   };
}

// var msg = genMessage('testmsg', '1111', 'es');
// getLastKey(msg);
// global.msg = msg;
// global.aM = addMessage;
