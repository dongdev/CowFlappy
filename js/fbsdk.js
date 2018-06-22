function initFBSdk() {
    window.fbAsyncInit = function () {
        FB.init({
            appId: APP_ID,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v3.0'
        });
        checkLoginFB();
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
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            log(CONNECTED);
        } else if (response.status === 'not_authorized') {
            log(NOT_LOGIN);
        } else {
            log(ERROR);
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
            log(LOGIN_FAIL)
        }
    }, {scope: 'email'});
}

function shareFb() {
    FB.ui({
        method: 'share_open_graph',
        action_type: 'og.likes',
        action_properties: JSON.stringify({
            object: SHARE_URL,
        })
    }, function (response) {
        console.log(response);
    });
}

