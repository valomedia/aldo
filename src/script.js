
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
        appId            : '319585755122078',
        autoLogAppEvents : true,
        xfbml            : false,
        version          : 'v2.9'
    });
    FB.AppEvents.logPageView();

    // Launch Aldo.
    System.import('main.js').catch(function(err){ console.error(err); });
};

// Initialize FacebookSDK and start Aldo.
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/de_DE/sdk/debug.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

