function initFBSdk() {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1972872269694359',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v3.0'
        });
        startGame(null);
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}
function checkLoginFB() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token
            // and signed request each expire
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            loginFb();
        } else if (response.status === 'not_authorized') {
            log(NOT_LOGIN);
            loginFb();
        } else {
            log(ERROR);
            alert(ERROR)
        }
    });
}
function loginFb() {
    FB.login(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', {fields: 'id,name,email,picture.type(square)'}, function (response) {
                console.log('Good to see you, '
                    + response.id
                    + "/" + response.name
                    + '/' + response.email
                    + '/' + response.picture.data.url
                )
                ;
                playerId = response.id;
                playerName = response.name;
                playerEmail = response.email;
                playerPic = response.picture.data.url;
                dgame.state.start(SCENE_MENU);
            });
        } else {
            alert(LOGIN_FAIL)
        }
    }, {scope: 'email,user_likes'});
}

