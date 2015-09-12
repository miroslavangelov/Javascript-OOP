define(["jquery"], function ($) {
	return 	(function($) {
		$.fn.comboBox = function() {
			$(".person-item:not(:first)").hide();
			
			$(".person-item:not(:first)").mouseover(function() {
				$(this).css("background-color", "gray")
			});
			$(".person-item:not(:first)").mouseout(function() {
				$(this).css("background-color", "white")
			});
			$("#selectedPerson").click(function() {
				var that = $(this);
					$(".person-item").show();
				});
			$(".person-item").click(function() {
				var currentHtml = $(this)[0].outerHTML;
				$("#selectedPerson").html(currentHtml);
				$(".person-item:not(:first)").hide();
				$(".person-item").css("background-color", "white")
			});
		}
	}(jQuery));
	
});