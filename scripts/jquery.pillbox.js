(function($) {
	$.fn.pillBox = function(options) {
		var defaults = {pillBox:'.pill-box'};
		var opts = $.extend(defaults, options);
		
		return this.each(function() {
			var $this = $(this);

			var pillObj ={
			    menuItems: $this.find('.list-wrapper li'), 
				addpill:function(el){
			
					if( el.hasClass('selected')){
						el.removeClass('selected');
						$("#cap-"+el.index()+"").remove();
					}
					else{
					  el.addClass('selected');  
					  $(opts.pillBox).append("<div class='pill' id='cap-"+el.index()+"'><span class='text'>"+el.text()+"</span><span class='close'></span></div>");
					}	
				},
				removepill:function(el){
					var index = el.parent().attr('id');
						index = index.replace(/cap-/g, '');
								$this.find(".list-wrapper li:eq("+index+")").removeClass('selected'); 
								el.parent().remove();
				},
                searchpill:function(){
						pillObj.filterMenuItems(pillObj.menuItems,''+$(this).val()+'')
				},
				filterMenuItems:function(selector, query){
					 var query =   $.trim(query); //trim white space 	 
					  query = query.replace(/ /gi, '|'); //add OR for regex query  
					  $this.find(selector).each(function() {  
						($(this).text().search(new RegExp(query, "i")) < 0) ? $(this).hide().removeClass('visible') : $(this).show().addClass('visible');  
					  });  
				},
				showMenu: function(){
					//e.preventDefault();
					$this.find('.pillMenu').show();
				},
				closeMenu: function(){
					$this.find('.pillMenu').hide();
				},				
				bindEvents: function(){
					
					$this.find('a.pill-menu-link').bind('click',function(){pillObj.showMenu();});
					$this.find('.done-btn').bind('click',function(){pillObj.closeMenu();});
				    pillObj.menuItems.bind('click',function(){pillObj.addpill($(this));});
					$(opts.pillBox).find('.close').live('click',function(){pillObj.removepill($(this));});
					$this.find(".search-txt").keyup(function() {
							pillObj.filterMenuItems(pillObj.menuItems,''+$(this).val()+'');
					});
				}
                   				
			};
			pillObj.bindEvents();
	    });		

	};
	
	$.fn.getpills = function() {
			
			var len = $(this).find('.pill').length;
			var mycaps = new Array();
			for(i=0;i<len;i++){
				mycaps[i] =""+$(this).find('.pill .text:eq('+i+')').text()+"";	
			};
			
		return 	mycaps;
	};
	
})(jQuery);
