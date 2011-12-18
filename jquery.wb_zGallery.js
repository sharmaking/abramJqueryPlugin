/*
 * jquery.wb_zGallery.js
 * by Abram Wang  http://www.abramstudio.com
 * 2011-11-11 v0.1
 */

;(function($){
	$.fn.wb_zGallery = function(options){
		var opts = $.extend({}, $.fn.wb_zGallery.defaults, options)
		
		$this = $(this);
        var z = 0; 													//for setting the initial z-index's
	  	var inAnimation = false; 									//flag for testing if we are in a animation
		var	$img	= $this.find(opts._imgCon).find(opts._img);
		
		
		$img.each(function() { 	//set the initial z-index's
			z++; 												//at the end we have the highest z-index value stored in the z variable
			$(this).css('z-index', z); 							//apply increased z-index to <img>
		});
		
		
		function swapFirstLast(isFirst) {
			if(inAnimation) return false; 						//if already swapping pictures just return
			else inAnimation = true; 								//set the flag that we process a image
			
			var processZindex, direction, newZindex, inDeCrease; //change for previous or next image
			
			if(isFirst) { processZindex = z; direction = '-'; newZindex = 1; inDeCrease = 1; }							//set variables for "next" action
			else { processZindex = 1; direction = ''; newZindex = z; inDeCrease = -1; } 								//set variables for "previous" action
			
			$img.each(function() { 																						//process each image
				if($(this).css('z-index') == processZindex) { 															//if its the image we need to process
			    	$(this).animate({ 'top' : direction + $(this).height() + 'px' }, 'slow', function() { 				//animate the img above/under the gallery (assuming all pictures are equal height)
			      		$(this).css('z-index', newZindex).animate({ 'top' : '0' }, 'slow', function() { 				//animate the image back to its original position
			          		inAnimation = false; 																		//reset the flag
			        	});
			    	});
				} else { 																						//not the image we need to process, only in/de-crease z-index
			    	$(this).animate({ 'top' : '0' }, 'slow', function() { 										//make sure to wait swapping the z-index when image is above/under the gallery
			      		$(this).css('z-index', parseInt($(this).css('z-index')) + inDeCrease); 					//in/de-crease the z-index by one
			    	});
				}
			});
	
			return false; //don't follow the clicked link
		};
		
		$img.click(function() {
			return swapFirstLast(true);		//swap first image to last position
			//return swapFirstLast(false); 		//swap last image to first position
		});
		
		//auto scroll animation
		
		function _swapFirstLast(_isFirst) {			//define parameter less function 
			return function(){
				swapFirstLast(_isFirst);
			}
		};
		setInterval(_swapFirstLast(true),5000);
		
	};
	
	//wb_zGallery Defaults Define
	$.fn.wb_zGallery.defaults = {
		_imgCon		: "#pictures",			//Define images container
		_img		: "img",				//Define images elements
		_next		: ".next",				//Define next button's class name
		_prev		: ".prev"				//Define prev button's class name
		
	};
})(jQuery)