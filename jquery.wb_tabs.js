/*
 * jquery.wb_tab.js
 * by Abram Wang  http://www.abramstudio.com
 * 2011-11-11 v0.1
 */
;(function($){
	$.fn.wb_tab = function(options){

		var _opts = $.extend({}, $.fn.wb_tab.defaults, options)

		$this = $(this);
		
		var	$tab	= $this.find(_opts._tabs).find("li"),
			$pane	= $this.find(_opts._panes);
		
		$tab.eq(0).addClass(_opts._currentTab);
		$pane.hide();
		$pane.eq(0).show();
		$pane.eq(0).find("img").addClass("scrollLoading");	//The First Pane Add ScrollLoading Function
		
		$tab.each(function(index){
			$(this).click(function(){
				$tab.removeClass(_opts._currentTab);
				$tab.eq(index).addClass(_opts._currentTab);
				$pane.hide();
				$pane.eq(index).show();
								
				$pane.eq(index).find("img").attr("src", function() { return $(this).attr("original") }); //Add img Lazy Loading Function
			});
		});


	};
	
	//wb_tab Defaults Define
	$.fn.wb_tab.defaults = {
		_tabs		: ".tabs",		//Tabs Container Class Name Define
		_panes		: ".panes > .pane",		//Panes Container Class Name Define
		_currentTab	: "current"
		
	};
	
})(jQuery);