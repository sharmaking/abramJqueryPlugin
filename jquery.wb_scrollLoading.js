/*
 * jquery.Wb_scrollLoading.js
 * by AbramWang http://www.abramstudio.com
 * 2011-11-10 v0.1
*/
(function($) {
	$.fn.wb_scrollLoading = function(options) {
		var defaults = {
			attr: "original"	
		};
		var params = $.extend({}, defaults, options || {});
		params.cache = [];
		$(this).each(function() {
			var node = this.nodeName.toLowerCase(), url = $(this).attr(params["attr"]);
			if (!url) { return; }
			//rebuilde
			var data = {
				obj: $(this),
				tag: node,
				url: url
			};
			params.cache.push(data);
		});
		
		//loading function
		var loading = function() {
			var st = $(window).scrollTop(), sth = st + $(window).height();
			$.each(params.cache, function(i, data) {
				var o = data.obj, tag = data.tag, url = data.url;
				if (o) {
					post = o.position().top; posb = post + o.height();
					if ((post > st && post < sth) || (posb > st && posb < sth)) {
						//In the current window 
						if (tag === "img") {
							//change the img's url
							o.attr("src", url);	
						} else {
							o.load(url);
						}	
						data.obj = null;		
					}
				}
			});		
			return false;	
		};
		
		loading();
		//Scroll Loading
		$(window).bind("scroll", loading);
	};
})(jQuery);