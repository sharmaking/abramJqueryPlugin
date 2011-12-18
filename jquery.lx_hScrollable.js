/**
 * @author AbramWang
 */
;(function($) {
	$.fn.lx_hScrollable = function(options) {
		var opts = $.extend({}, $.fn.lx_hScrollable.defaults, options)

		var $this = $(this);

		var i = 5;
		var page = 1;
		var $thumbcontainer = $this.find(opts.thumbimg);
		var $thumbnum = $thumbcontainer.find("li").length;
		var $containerwidth = $thumbcontainer.width();
		var pagecount = Math.ceil($thumbnum / i);
		var $left_btn = $this.find(opts.left_btn);
		var $right_btn = $this.find(opts.right_btn);
		$right_btn.click(function() {
			if(!$thumbcontainer.is(":animated")) {
				if((0 < page) && (page < pagecount)) {
					$thumbcontainer.animate({
						left : '-=' + $containerwidth
					}, "slow");
					page++;
					if(page > pagecount) {
						page = pagecount;
					}
				}
			}
			arrow_control();
		})
		$left_btn.click(function() {
			if(!$thumbcontainer.is(":animated")) {

				if((1 < page) && (page < pagecount + 1)) {
					$thumbcontainer.animate({
						left : '+=' + $containerwidth
					}, "slow");
					page--;
					if(page < 1) {
						page = 1;
					}
				}
			}
			arrow_control();
		})
		function arrow_control() {
			$left_btn.removeClass("left_btnClick");
			$left_btn.removeClass("left_btn");
			$right_btn.removeClass("right_btnClick");
			$right_btn.removeClass("right_btn");
			if(pagecount == 1) {
				$left_btn.addClass("left_btn");
				$right_btn.addClass("right_btn");
			} else if(page == pagecount) {
				$left_btn.addClass("left_btnClick");
				$right_btn.addClass("right_btn");
			} else if(page == 1) {
				$left_btn.addClass("left_btn");
				$right_btn.addClass("right_btnClick");
			} else {
				$left_btn.addClass("left_btnClick");
				$right_btn.addClass("right_btnClick");
			}
		}

		arrow_control();
	};
	//lx_hScrollable Defaults Define
	$.fn.lx_hScrollable.defaults = {
		thumbimg : "#thumbimg",

		left_btn : "#left_btn", // left button element
		_left_btnClick : "left_btnClick", // left button clicked class name

		right_btn : "#right_btn", // right button element
		_right_btnClickk : "right_btnClick"			// right button clicked class name

	};

})(jQuery);
