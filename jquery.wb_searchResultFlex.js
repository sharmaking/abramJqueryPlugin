/*
 * jquery.Wb_scrollLoading.js
 * by AbramWang http://www.abramstudio.com
 * 2011-11-23 v0.1
*/
;(function($){
	$.fn.wb_flex = function(options) {
		var opts = $.extend({}, $.fn.wb_flex.defaults, options);
		
		var $root = $(this);					//定义根对象
		
		var model = opts.model;					//定义操作模式
		
		
		function textOperat(){				//段落方式的字符串处理
			$root.each(function(){
				var _string = $(this).text();
				_string = _string.replace(/(^\s*)|(\s*$)/g, "");	//去除多余空格
				
				var	_displayText = _string.substring(0,30),
					_hideText = _string.substring(30);
					
				var $container = $(this);							//定义父级对象
				
				$container.empty();									//内容替换
				$container.append("<p>"+_displayText+"<span class="+opts.hideConClass+">"+_hideText+"</span><span class="+opts.ellipsisConClass+">...</span></p>");
				$container.append('<span class='+opts.buttonClass+'>更多介绍<b></b></span>');
				
				var	$button		= $container.find("."+opts.buttonClass),
					$paragraph	= $container.find("p"),
					$ellipsis	= $container.find("."+opts.ellipsisConClass),
					$hideCon	= $container.find("."+opts.hideConClass);
				
				$button.toggle(								//定义按钮操作属性
					function(){
						$(this).find("b").addClass("hover");
						$(this).css("margin-top","0");
						$ellipsis.hide();					//隐藏省略号
						$hideCon.show();					//显示详细内容
					},
					function(){
						$(this).find("b").removeClass("hover");
						$(this).css("margin-top","-18px");
						$ellipsis.show();					//显示省略号
						$hideCon.hide();					//隐藏详细内容
					}
				);
			});
		};
		
		function ulListOperat(){
			$root.each(function(){
				var $container = $(this);							//定义父级对象
				var _liNum = $container.find("li:last-child").index();
				
				if((_liNum + 1) > opts.ulDisplayNum) {						//如果产品条数过多，则显示隐藏按钮
					$container.append('<span class='+opts.buttonClass+'>更多门票产品<b></b></span>')
				}
				
				var $ulLi = $container.find("li");
				
				$ulLi.each(function(index){									//为超出的标签添加可隐藏class名
					if(($(this).index() + 1) > opts.ulDisplayNum) {
						$(this).addClass(opts.hideConClass);
					}
				});
				
				
				var	$button		= $container.find("."+opts.buttonClass),
					$hideCon	= $container.find("."+opts.hideConClass);
				
				$button.toggle(								//定义按钮操作属性
					function(){
						$(this).find("b").addClass("hover");
						$hideCon.show();					//显示详细内容
					},
					function(){
						$(this).find("b").removeClass("hover");
						$hideCon.hide();					//隐藏详细内容
					}
				);
			
			});
		};
		
		function spanListOperat(){
			$root.each(function(){
				var $container = $(this);							//定义父级对象
				var _liNum = $container.find("a:last-child").index();
				
				if((_liNum + 1) > opts.spanDisplayNum) {						//如果产品条数过多，则显示隐藏按钮
					$container.prepend('<span class='+opts.buttonClass+'>更多<b></b></span>')
				}
				
				var $spanA = $container.find("a");
				
				$spanA.each(function(index){									//为超出的标签添加可隐藏class名
					if(($(this).index() + 1) > opts.spanDisplayNum) {
						$(this).addClass(opts.hideConClass);
					}
				});
				
				var	$button		= $container.find("."+opts.buttonClass),
					$hideCon	= $container.find("."+opts.hideConClass);
				
				$button.toggle(								//定义按钮操作属性
					function(){
						$(this).find("b").addClass("hover");
						$hideCon.addClass("spanHide_p");					//显示详细内容
					},
					function(){
						$(this).find("b").removeClass("hover");
						$hideCon.removeClass("spanHide_p");					//隐藏详细内容
					}
				);
				
			});
		}
		
		if (model === "text") {								//以段落模式进行操作
			textOperat();
		} else if (model === "ulList") {
			ulListOperat();
		} else if (model === "spanList") {
			spanListOperat();
		};
		
		
		//$root.append('<span class='+opts.buttonClass+'>更多介绍<b></b></span>');
		
	};
	
	//wb_flex Defaults Define					//搜索结果页 卷帘效果参数定义
	$.fn.wb_flex.defaults = {
		buttonClass			: "flexBtn_p",				//定义按钮class名
		hideConClass		: "hideCon_p",				//定义隐藏容器Class名
		ellipsisConClass	: "ellipsis_p",				//定义省略号补丁class名
		model				: "text",					//隐藏收缩模式定义  'text' || 'ulList' ||  'spanList'
		ulDisplayNum		: "3",						//定义ul li 显示个数
		spanDisplayNum		: "19"						//定义span li 显示个数
	};
	
})(jQuery);