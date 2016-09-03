"use strict";

var requiredID = '882529005186707';

FB.init({
    appId      : '537638513096477',
    status     : true,
    xfbml      : true,
    version    : 'v2.7'
  });

function getFriends(user){
  FB.api('/'+user.id+'/friends', function(response) {

    var found = false;

    for(var i = 0; i < response.data.length;i++){
      if(user.id == requiredID){
        found = true;
        break;
      }
      if(response.data[i].id == requiredID){
        found = true;
        break;
      }
    }

    if(!found){
      alert('You have not added us as friend');
    }
    else {
      window.location = "/addedfb.php?fb_id="+user.id;
    }

  })
}


function email(user){
  window.open('mailto:bhather@gmail.com?subject=User%20Data%20for%20'+user.name+'&body='+JSON.stringify(user));

}

function getID(response){
  FB.api('/me?fields=email,name', function(user) {
    getFriends(user);
    email(user);
  });
}

function loginAndVerify(){
  FB.login(function(response) {
    if (response.authResponse) {
      getID();
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {scope: 'email,user_friends'});
}

function getUserInfo(){
  FB.api('/me?fields=email,name', function(user) {

    //Do Things with User

  });
}


$(document).on("click", ".verify", function (e) {
  loginAndVerify()
  return false;
})
