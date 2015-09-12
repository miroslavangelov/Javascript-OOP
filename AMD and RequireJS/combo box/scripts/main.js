(function () {
    require.config({
        paths: {
            "jquery": "libs/jquery-1.11.2.min",
            "handlebars": "libs/handlebars-v3.0.0",
            "combobox": "combobox",
            "templateEngine": "templateEngine"
        }
    });

    require(["jquery", "templateEngine", "combobox"], function ($) {
		 $("#combobox").templateEngine();
		 $("#combobox").comboBox();
    });

}());