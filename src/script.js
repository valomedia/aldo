
/*
 * Bootstrap script.
 */

/*
 * Facebook initialisation callback.
 *
 * This function will be called after the FacebookSDK is fully set up.
 */
window.fbAsyncInit = function() {
    FB.init({
        appId            : '319585755122078',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.9'
    });
    FB.AppEvents.logPageView();
};

// Load Aldo.
System.import('main.js').catch(function(err){ console.error(err); });

// Initialize FacebookSDK.
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/de_DE/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

