//I am using the code which provide from profassor with changeing on what I want to do


(function($) {

    // here it goes!
    $.fn.animateDiv = function(method) {

        // plugin's default options
        var defaults = {
           textfont: "Times New Roman",
           textColor: "#a04e4e",
           borderStyle: "6px solid #795353",
           border: "groove",
           borderColor: "#d4d0d0",
           borderWidth: 760,
           defaultPadding: 10,
           animatePadding: 60
        }
        var settings = {}

        var methods = {
            init : function(options) {
                settings = $.extend({}, defaults, options)
                return this.each(function() {

                  var $obj = $( this ),
                      $items = $( "p", $obj);

                  //change the color according to odd/even  rows
                  $( "p", $obj )
                  			.css( {
                        "font-family": settings.textfont,
                        "color": settings.textColor,
                        "border-left": settings.borderStyle,
                        "border-style": settings.border,
                        "background-color": settings.borderColor,
                        "width": settings.borderWidth
                        });
                  		// add hover functionality
                   $items
                   .mouseover( function(){

                    $( this ).animate({
                       paddingLeft: settings.animatePadding
                    }, 300 );

                   })
                   .mouseout( function(){

                    $( this ).animate({
                       paddingLeft: settings.defaultPadding
                    }, 300 );

                   });

                });

            }

        }

        // private methods
        // these methods can be called only from within the plugin
        //
        // private methods can be called as
        // helpers.methodName(arg1, arg2, ... argn)
        // where "methodName" is the name of a function available in the "helpers" object below; arg1 ... argn are
        // arguments to be passed to the method
        var helpers = {

            // a private method. for demonstration purposes only - remove it!
            foo_private_method: function() {

                // code goes here

            }

        }

        // if a method as the given argument exists
        if (methods[method]) {

            // call the respective method
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        // if an object is given as method OR nothing is given as argument
        } else if (typeof method === 'object' || !method) {

            // call the initialization method
            return methods.init.apply(this, arguments);

        // otherwise
        } else {

            // trigger an error
            $.error( 'Method "' +  method + '" does not exist in pluginName plugin!');

        }

    }

})(jQuery);
