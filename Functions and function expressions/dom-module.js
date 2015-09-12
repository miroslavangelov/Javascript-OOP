var domModule = (function() {
	var addElement = function(element, parent) {
		$(parent).append(element);
	},
		removeElement = function(parent, element) {
			$(parent).find(element).remove();
		},
		addEventHandler = function(selector, eventType, eventHandler) {
			$(selector).bind(eventType, eventHandler);
		},
		buffer = [],
		appendToBuffer = function (selector, element) {
			if (buffer[selector]) {
				buffer[selector].push(element);
				if (buffer[selector].length >= 100) {
					var getSelector = $(selector);
					for (var i = 0, len = buffer[selector].length; i < len; i++) {
						getSelector.append(buffer[selector][i]);
					}
					buffer[selector] = [];
					
				}
				
			}
			else {
				buffer[selector] = [];
				buffer[selector].push(element);
			}
			console.log(buffer[selector])
		};
		
	
	return {
			addElement: addElement,
			removeElement: removeElement,
			addEventHandler: addEventHandler,
			appendToBuffer: appendToBuffer
	};
}());