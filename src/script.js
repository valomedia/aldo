
/*
 * Bootstrap script.
 */

/*
 * Facebook initialisation callback.
 *
 * This function will be called after the FacebookSDK is fully set up.
 */
window.fbAsyncInit = function() {
    // Initialize the FacebookSDK with the correct parameters for Aldo.
    FB.init({
        appId            : conf.fbAppID,
        autoLogAppEvents : true,
        xfbml            : false,
        version          : 'v2.9'
    });
    FB.AppEvents.logPageView();

    // Ask the user to log in to Facebook.
    FB.login(function(res) {
        switch (res.status) {
            case 'connected':
                // User is logged in and authorized the app, launch Aldo.
                System.import('main.js').catch(function(err){ console.error(err); });
                break;
            case 'not_authorized':
                // User is logged in, but has not given permissions, error out.
                alert('Auth failed');
                break;
           default:
               // User is not logged in, error out.
               alert('Not logged in');
        }
    },
    {
        scope: [
            'manage_pages',
            'publish_pages'
        ]
    });
};

// Initialize FacebookSDK and start Aldo.
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/de_DE/sdk/debug.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

