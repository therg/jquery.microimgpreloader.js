jquery.microimgpreloader.js
===========================

A micro image preloader for jQuery using deferred objects

    var images = [
        'http://i.imgur.com/5CwIHyI.jpg',
        'http://i.imgur.com/TBfgAAi.jpg',
        'http://i.imgur.com/oppJpaZ.jpg',
        'http://i.imgur.com/AnuI45f.jpg',
        'http://i.imgur.com/wbMiNE6.jpg',
        'http://i.imgur.com/ouy74CD.jpg'
    ];
    $.preloadImages(images, {
        onUpdate: function(percent) { $('body').append(percent+'%<br>'); },
        onComplete: function() { $('body').append('Loading Complete'); },
        onFailure: function(url) { console.log('This URL failed: '+url); }
    });
