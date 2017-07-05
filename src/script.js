
/*
 * Bootstrap script.
 */

// Inject permissions into Aldo config.
conf.perms = {
    manage_pages: {
        required: true,
        desc: "Zugriff auf deine Seiten erlauben",
    },
    publish_pages: {
        required: true,
        desc: "Im Namen deiner Seiten posten",
        msg: "Für deine Seiten posten, liken und kommentieren."
    },
    pages_show_list: {
        required: true,
        desc: "Eine Liste mit deinen Seiten anzeigen",
        mgs: "Deine Seiten anzeigen, damit du eine auswählen kannst."
    }
}

// Set up the retry button.
window.onload = function() {

    // Remove the loader.
    fadeLoader = function() {
        document.getElementById('preloader').className = 'fade';

        setTimeout(function() {
            document.getElementById('preloader').className = 'fade invisible';
        }, 250);

        setTimeout(function() {
            document.getElementById('preloader').className = 'hidden';
        }, 500);
    }

    // Arm the reload button.
    document.getElementById('retry_auth_btn').onclick = function() {
        window.location.reload();
    };

    // Check if the device is supported.
    if (window.screen.width < 400 || window.screen.height < 400) {
        document.getElementById('login_issue').classList.add('hidden');
        document.getElementById('fatal_error').classList.remove('hidden');
        document.getElementById('screen_too_small').classList.remove('hidden');
        fadeLoader();
        return;
    }

    // We are go, initialize FacebookSDK and start Aldo.
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/de_DE/sdk/debug.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // There is no way to tell when the Facebook-popup is actually loaded, so we 
    // just give it plenty of time, before fading the loading screen.
    setTimeout(fadeLoader, 2500);
};

/*
 * Facebook initialisation callback.
 *
 * This function will be called after the FacebookSDK is fully set up.
 */
window.fbAsyncInit = function() {
    // Initialize the FacebookSDK with the correct parameters for Aldo.
    FB.init({
        appId: conf.fbAppID,
        autoLogAppEvents: true,
        xfbml: false,
        version: 'v2.9'
    });
    FB.AppEvents.logPageView();

    // Ask the user to log in to Facebook.
    FB.login(function(res) {
        // The user acted in the popup, hide the notice.
        document.getElementById('login_notice').classList.add('hidden');

        switch (res.status) {
            case 'connected':
                // User is logged in and authorized the app, check permissions.
                FB.api('/me/permissions', function(res) {
                    var errs = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].status == 'declined') {
                            errs.push(conf.perms[res.data[i].permission]);
                        }
                    }
                    if (errs.length) {
                        // Some permissions were not granted, error out.
                        for (var i = 0; i < errs.length; i++) {
                            // List all denied essential permissions.
                            if (! errs[i].required) { continue; }
                            var li = document.createElement('li');
                            var strong = document.createElement('strong');
                            strong.textContent = errs[i].desc;
                            li.appendChild(strong);
                            if (errs[i].msg) {
                                var br = document.createElement('br');
                                var em = document.createElement('em');
                                em.textContent = errs[i].msg;
                                li.appendChild(br);
                                li.appendChild(em);
                            }
                            document
                                .getElementById('denied_permissions')
                                .appendChild(li);
                        }
                        document
                            .getElementById('permission_denied')
                            .classList
                            .remove('hidden');
                    } else {
                        // Permissions granted, launch aldo.
                        document
                            .getElementById('preload_content')
                            .classList
                            .add('hidden');
                        document
                            .getElementById('preload_spinner')
                            .classList
                            .remove('hidden');
                        System.import('main.js').catch(function(err) {
                            console.error(err);
                        });
                    }
                });
                break;
            case 'not_authorized':
                // User is logged in, but has not given permissions, error out.
                document.getElementById('no_auth').className = '';
                break;
           default:
               // User is not logged in, or has aborted, error out.
               document.getElementById('no_login').className = '';
        }
    }, {scope: Object.keys(conf.perms)});
};

