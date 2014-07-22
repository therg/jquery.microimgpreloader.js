/*!
  jQuery Micro Image Preloader
  @name jquery.microimgpreloader.js
  @author Ryan Griffin
  @version 0.1.0
  @date 07/22/2014
  @category jQuery plugin
  @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
;(function($){
    $.extend({
        preloadImages: function(images, options) {
            var promises = [],
                numRequested = 0,
                images = ($.isArray(images)) ? images : [images],
                options = options || {},
                settings = $.extend({
                    onUpdate: $.noop,
                    onComplete: $.noop,
                    onFailure: $.noop
                }, options);

            for (var i = 0; i < images.length; i++) {
                (function(url, promise) {
                    var image = $(new Image())
                    .load(
                        function(e) {
                            numRequested++;
                            promise.resolve(Math.ceil(numRequested/images.length * 100));
                            image = e = null;
                        }
                    )
                    .error(
                        function(e) {
                            promise.reject(url);
                            image = e = null;
                        }
                    ).prop("src", url);

                })(images[i], promises[i] = $.Deferred().done(function(percent){
                    settings.onUpdate.call(this, percent);
                }).fail(function(url){
                    settings.onFailure.call(this, url);
                }));
            }
            $.when.apply($, promises).done(function() {
                settings.onComplete.call(this);
            });
        }
    });
})(jQuery);
