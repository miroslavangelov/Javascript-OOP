var specialConsole = (function () {
    function format(input) {
		var finalResult = "";
		if (input.length <= 1) {
			for (var i = 0; i < 30; i++) {
				if (input[0].indexOf("{" + i + "}") !== -1) {
					var replace = input[0].replace("{" + i + "}", "");
				}
			}
			if (replace) {
				return replace.toString();
				
			}
			return input[0].toString();
		}
		
		else {
			for (var j = 0, len = input.length; j < len; j++) {
				var currentElement = input[j].toString();
				var replace = "";
				for (var i = 0; i < 30; i++) {
					if (currentElement.indexOf("{" + i + "}") !== -1) {
						replace = input[j].replace("{" + i + "}", "");
						
					}
				}
				if (replace !== "") {
					
					finalResult += replace;
					replace = "";
				}
				else {
					
					finalResult += currentElement;
				}
			}
			return finalResult;
		}
    }

    function writeLine() {
       console.log(format(arguments));
    }

    function writeError() {
      console.error(format(arguments));
    }

    function writeWarning() {
     console.warn(format(arguments));
    }

    return {
        writeLine: writeLine,
        writeError: writeError,
        writeWarning: writeWarning
    };
}());