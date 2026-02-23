$(document).ready(function() {
    // 1. Check local storage on page load
    if (localStorage.getItem('theme') === 'dark') {
        $('body').addClass('dark-mode');
    }

    // 2. Toggle logic
    $('#toggle-dark').click(function() {
        $('body').toggleClass('dark-mode');

        // Save the preference
        if ($('body').hasClass('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    let visits = sessionStorage.getItem('visitCount') || 0;
    visits = parseInt(visits) + 1;
    sessionStorage.setItem('visitCount', visits);
    $('#session-count').text(visits);

    function getCookie(name) {
        let cookieArr = document.cookie.split(";");
        for(let i = 0; i < cookieArr.length; i++) {
            let pair = cookieArr[i].split("=");
            if(name == pair[0].trim()) return pair[1];
        }
        return null;
    }

    let savedUser = getCookie('user');
    if (savedUser) {
        $('#loggedin').text("Welcome, " + savedUser);
    }

    // Login logic
    $('#login-btn').click(function() {
        let name = $('#username').val();
        if (name) {
            document.cookie = "user=" + name + "; max-age=" + (24*60*60) + "; path=/";
            $('#login-section h1').text("Welcome, " + name);
            $('#username').val(''); // Clear input
        }
    });

    $('#logout-btn').click(function() {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        $('#login-section h1').text("Login Cookie");
        alert("Logged out!");
    });

});