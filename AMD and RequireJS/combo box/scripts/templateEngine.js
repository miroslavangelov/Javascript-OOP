define(["handlebars"], function (Handlebars) {
	return $.fn.templateEngine = function () {
	        var people = [{
            id: 1, name: "Doncho Minkov", age: 18, avatarUrl: "images/doncho.jpg"
            },
            {
                id: 2, name: "Niki Kostov", age: 19, avatarUrl: "images/niki.jpg"
            },
            {
                id: 3, name: "Ivo Kenov", age: 15, avatarUrl: "images/ivo.jpg"
            }],
			templateNode = document.getElementById('post-template'),
			templateString = templateNode.innerHTML,
			template = Handlebars.compile(templateString),
			comboboxHtml = template({people:people});
			document.getElementById("combobox").innerHTML+=comboboxHtml;
	}
	
});