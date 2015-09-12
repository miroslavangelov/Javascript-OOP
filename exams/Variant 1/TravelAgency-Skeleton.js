function processTravelAgencyCommands(commands) {
    'use strict';
	Object.prototype.extends = function(parent) {
		if (!Object.create) {
			Object.prototype.create = function(proto) {
				function F() {}
				F.prototype = proto;
				return new F;
			}
		}
		this.prototype = Object.create(parent.prototype);
		this.prototype.constructor = this;
	}
	
	
    var Models = (function() {

		function checkString(value) {
			if (typeof (value) !== "string" || !(value)) {
				throw new Error("Should not be an empty string!")
			}
		}
		function checkEmptyString(value) {
			if (value === undefined || value === null) {
				return undefined;
			}
			if (value === "" || typeof value !== "string") {
				throw new Error("Should not be an empty string fucker")
			}
		}
		function checkDate(value) {
			if (value===undefined || !(value instanceof Date)) {
				throw new Error("Should not be empty date!")
			}
		}
        var Destination = (function() {
            function Destination(location, landmark) {
                this.setLocation(location);
                this.setLandmark(landmark);
            }

            Destination.prototype.getLocation = function() {
                return this._location;
            }

            Destination.prototype.setLocation = function(location) {
                if (location === undefined || location === "") {
                    throw new Error("Location cannot be empty or undefined.");
                }
                this._location = location;
            }

            Destination.prototype.getLandmark = function() {
                return this._landmark;
            }

            Destination.prototype.setLandmark = function(landmark) {
                if (landmark === undefined || landmark == "") {
                    throw new Error("Landmark cannot be empty or undefined.");
                }
                this._landmark = landmark;
            }

            Destination.prototype.toString = function() {
                return this.constructor.name + ": " +
                    "location=" + this.getLocation() +
                    ",landmark=" + this.getLandmark();
            }

            return Destination;
        }());

        var Travel = (function(){
            function Travel(name, startDate, endDate, price) {
				if (this.constructor === Travel) {
					throw new Error("Can't instantiate abstract class!");
				}
				this.setName(name);
				this.setStartDate(startDate);
				this.setEndDate(endDate);
				this.setPrice(price);
			}
			Travel.prototype.setName = function(name) {
				checkString(name);
				this._name = name;
			}
			Travel.prototype.getName = function() {
				return this._name;
			}
			Travel.prototype.setStartDate = function(startDate) {
				checkDate(startDate);
				this._startDate = startDate;
			}
			Travel.prototype.getStartDate = function() {
				
				return this._startDate;
			}
			Travel.prototype.setEndDate = function(endDate) {
				checkDate(endDate);
				this._endDate = endDate;
			}
			Travel.prototype.getEndDate = function() {
				return this._endDate;
			}
			Travel.prototype.setPrice = function(price) {
				if (price < 0 || isNaN(price)) {
					throw new Error("Price should not be negative or empty!");
				}
				this._price = price.toFixed(2);
			}
			Travel.prototype.getPrice = function() {
				return this._price;
			}
			Travel.prototype.toString = function() {
				return 'name=' + this.getName() + ',start-date=' + formatDate(this.getStartDate()) + ',end-date=' + formatDate(this.getEndDate()) + ',price=' + this.getPrice();
			}
			return Travel;
        })();

        var Excursion = (function(){
            function Excursion(name, startDate, endDate, price, transport) {
				Travel.call(this, name, startDate, endDate, price);
				this.setTransport(transport);
				this._destinations = [];
			}
			Excursion.extends(Travel);
			Excursion.prototype.setTransport = function(transport) {
				checkString(transport);
				this._transport = transport;
			}
			Excursion.prototype.getTransport = function() {
				return this._transport;
			}
			Excursion.prototype.getDestinations = function() {
				return this._destinations;
			}
			Excursion.prototype.addDestination = function(destination) {
				this.getDestinations().push(destination);
				
			}
			Excursion.prototype.removeDestination = function(destination) {
				var index = this.getDestinations().indexOf(destination);
				if (index !== -1) {
					this.getDestinations().splice(index, 1);
				}
				else {
					throw new Error("The destination doesn't exist!")
				}
			}
			Excursion.prototype.toString = function() {
				var result = "";
				result += ' * ' + this.constructor.name + ': ' + Travel.prototype.toString.call(this) + ",transport=" + this.getTransport() + "\n";
				if (this.getDestinations().length <= 0) {
					result+= " ** Destinations: -";
				}
				else {
					result += " ** Destinations: ";
					for(var i = 0; i < this.getDestinations().length; i++) {
						result += this.getDestinations()[i];
						if (i+1 >= this.getDestinations().length) {
							break;
						}
						else {
							result+=";"
						}
					}
				}
				
				return result;
			}
			return Excursion;
        })();

        var Vacation = (function(){
            function Vacation(name, startDate, endDate, price, location, accommodation ) {
				Travel.call(this, name, startDate, endDate, price);
				this.setLocation(location);
				this.setAccommodation(accommodation);
			}
			Vacation.extends(Travel);
			Vacation.prototype.setLocation = function(location) {
				checkString(location);
				this._location = location;
			}
			Vacation.prototype.getLocation = function() {
				return this._location;
			}
			Vacation.prototype.setAccommodation = function(accommodation) {
				checkEmptyString(accommodation);
				this._accommodation = accommodation;
			}
			Vacation.prototype.getAccommodation = function() {
				return this._accommodation;
			}
			Vacation.prototype.toString = function() {
				var result = "",
					accommodation = "";
				result += " * Vacation: " + Travel.prototype.toString.call(this) + ',location=' + this.getLocation();
				if (this.getAccommodation()) {
					accommodation = ",accommodation=" + this.getAccommodation();
				}
				result += accommodation;
				return result;
			}
			return Vacation;
        })();

        var Cruise = (function(){
           function Cruise(name, startDate, endDate, price, transport, startingDock) {
			   Excursion.call(this, name, startDate, endDate, price, 'cruise liner');
			   this.setStartingDock(startingDock);
		   }
		   Cruise.extends(Excursion);
		   Cruise.prototype.setStartingDock = function (startingDock) {
			   checkEmptyString(startingDock);
			   this._startingDock = startingDock;
		   }
		   Cruise.prototype.getStartingDock = function() {
			   return this._startingDock;
		   }
		   Cruise.prototype.toString = function() {
				var result = Excursion.prototype.toString.call(this),
					dock = "";
				if (this.getStartingDock()) {
					result += ",start-dock=" + this.getStartingDock();
				}
			   return result;
		   }
		   return Cruise;
        })();

        return {
            Destination: Destination,
			Travel: Travel,
			Vacation: Vacation,
			Excursion: Excursion,
			Cruise: Cruise
        }
    }());

    var TravellingManager = (function(){
        var _travels;
        var _destinations;

        function init() {
            _travels = [];
            _destinations = [];
        }

        var CommandProcessor = (function() {

            function processInsertCommand(command) {
                var object;

                switch (command["type"]) {
                    case "excursion":
                        object = new Models.Excursion(command["name"], parseDate(command["start-date"]), parseDate(command["end-date"]),
                            parseFloat(command["price"]), command["transport"]);
                        _travels.push(object);
                        break;
                    case "vacation":
                        object = new Models.Vacation(command["name"], parseDate(command["start-date"]), parseDate(command["end-date"]),
                            parseFloat(command["price"]), command["location"], command["accommodation"]);
                        _travels.push(object);
                        break;
                    case "cruise":
                        object = new Models.Cruise(command["name"], parseDate(command["start-date"]), parseDate(command["end-date"]),
                            parseFloat(command["price"]), command["start-dock"]);
                        _travels.push(object);
                        break;
                    case "destination":
                        object = new Models.Destination(command["location"], command["landmark"]);
                        _destinations.push(object);
                        break;
                    default:
                        throw new Error("Invalid type.");
                }

                return object.constructor.name + " created.";
            }

            function processDeleteCommand(command) {
                var object,
                    index,
                    destinations;

                switch (command["type"]) {
                    case "destination":
                        object = getDestinationByLocationAndLandmark(command["location"], command["landmark"]);
                        _travels.forEach(function(t) {
                            if (t instanceof Models.Excursion && t.getDestinations().indexOf(object) !== -1) {
                                t.removeDestination(object);
                            }
                        });
                        index = _destinations.indexOf(object);
                        _destinations.splice(index, 1);
                        break;
                    case "excursion":
                    case "vacation":
                    case "cruise":
                        object = getTravelByName(command["name"]);
                        index = _travels.indexOf(object);
                        _travels.splice(index, 1);
                        break;
                    default:
                        throw new Error("Unknown type.");
                }

                return object.constructor.name + " deleted.";
            }

            function processListCommand(command) {
                return formatTravelsQuery(_travels);
            }

            function processAddDestinationCommand(command) {
                var destination = getDestinationByLocationAndLandmark(command["location"], command["landmark"]),
                    travel = getTravelByName(command["name"]);

                if (!(travel instanceof Models.Excursion)) {
                    throw new Error("Travel does not have destinations.");
                }
                travel.addDestination(destination);

                return "Added destination to " + travel.getName() + ".";
            }

            function processRemoveDestinationCommand(command) {
                var destination = getDestinationByLocationAndLandmark(command["location"], command["landmark"]),
                    travel = getTravelByName(command["name"]);

                if (!(travel instanceof Models.Excursion)) {
                    throw new Error("Travel does not have destinations.");
                }
                travel.removeDestination(destination);

                return "Removed destination from " + travel.getName() + ".";
            }

            function getTravelByName(name) {
                var i;

                for (i = 0; i < _travels.length; i++) {
                    if (_travels[i].getName() === name) {
                        return _travels[i];
                    }
                }
                throw new Error("No travel with such name exists.");
            }

            function getDestinationByLocationAndLandmark(location, landmark) {
                var i;

                for (i = 0; i < _destinations.length; i++) {
                    if (_destinations[i].getLocation() === location
                        && _destinations[i].getLandmark() === landmark) {
                        return _destinations[i];
                    }
                }
                throw new Error("No destination with such location and landmark exists.");
            }

            function formatTravelsQuery(travelsQuery) {
                var queryString = "";

                if (travelsQuery.length > 0) {
                    queryString += travelsQuery.join("\n");
                } else {
                    queryString = "No results.";
                }

                return queryString;
            }
			
			function processFilterInPriceRange(command) {
                var type = command["type"],
                    priceMin = parseFloat(command["price-min"]),
                    priceMax = parseFloat(command["price-max"]),
                    filteredByType,
                    filteredByPrice,
                    sortedByDateAsc;

                filteredByType = _travels
                    .filter(function(e) {
                        switch (type) {
                            case "excursion":
                                return e.constructor.name === "Excursion";
                            case "vacation":
                                return e.constructor.name === "Vacation";
                            case "cruise":
                                return e.constructor.name === "Cruise";
                            case "all":
                                return true;
                            default:
                                return false;
                        }
                    });

                filteredByPrice = filteredByType
                    .filter(function(e) {
                        return priceMin <= e.getPrice() && e.getPrice() <= priceMax;
                    });

                sortedByDateAsc = filteredByPrice
                    .sort(function(e1, e2) {
                        var dateOne = e1.getStartDate().valueOf(),
                            dateTwo = e2.getStartDate().valueOf();

                        if (dateOne === dateTwo) {
                            return e1.getName().localeCompare(e2.getName());
                        }
                        return dateOne - dateTwo;
                    });
					
                return formatTravelsQuery(sortedByDateAsc);
            }

            return {
                processInsertCommand: processInsertCommand,
                processDeleteCommand: processDeleteCommand,
                processListCommand: processListCommand,
                processAddDestinationCommand: processAddDestinationCommand,
                processRemoveDestinationCommand: processRemoveDestinationCommand,
				processFilterInPriceRange: processFilterInPriceRange
            }
        }());

        var Command = (function() {
            function Command(cmdLine) {
                this._cmdArgs = processCommand(cmdLine);
            }

            function processCommand(cmdLine) {
                var parameters = [],
                    matches = [],
                    pattern = /(.+?)=(.+?)[;)]/g,
                    key,
                    value,
                    split;

                split = cmdLine.split("(");
                parameters["command"] = split[0];
                while ((matches = pattern.exec(split[1])) !== null) {
                    key = matches[1];
                    value = matches[2];
                    parameters[key] = value;
                }

                return parameters;
            }

            return Command;
        }());

        function executeCommands(cmds) {
            var commandArgs = new Command(cmds)._cmdArgs,
                action = commandArgs["command"],
                output;

            switch (action) {
                case "insert":
                    output = CommandProcessor.processInsertCommand(commandArgs);
                    break;
                case "delete":
                    output = CommandProcessor.processDeleteCommand(commandArgs);
                    break;
                case "add-destination":
                    output = CommandProcessor.processAddDestinationCommand(commandArgs);
                    break;
                case "remove-destination":
                    output = CommandProcessor.processRemoveDestinationCommand(commandArgs);
                    break;
                case "list":
                    output = CommandProcessor.processListCommand(commandArgs);
                    break;
                case "filter":
                    output = CommandProcessor.processFilterInPriceRange(commandArgs);
                    break;
                default:
                    throw new Error("Unsupported command.");
            }

            return output;
        }

        return {
            init: init,
            executeCommands: executeCommands
        }
    }());

    var parseDate = function (dateStr) {
        if (!dateStr) {
            return undefined;
        }
        var date = new Date(Date.parse(dateStr.replace(/-/g, ' ')));
        var dateFormatted = formatDate(date);
        if (dateStr != dateFormatted) {
            throw new Error("Invalid date: " + dateStr);
        }
        return date;
    }

    var formatDate = function (date) {
        var day = date.getDate();
        var monthName = date.toString().split(' ')[1];
        var year = date.getFullYear();
        return day + '-' + monthName + '-' + year;
    }

    var output = "";
    TravellingManager.init();

    commands.forEach(function(cmd) {
        var result;
        if (cmd != "") {
            try {
                result = TravellingManager.executeCommands(cmd) + "\n";
            } catch (e) {
				console.log(e)
                result = "Invalid command." + "\n";
            }
            output += result;
        }
    });

    return output;
}

// ------------------------------------------------------------
// Read the input from the console as array and process it
// Remove all below code before submitting to the judge system!
// ------------------------------------------------------------

(function() {
    var arr = [];
    if (typeof (require) == 'function') {
        // We are in node.js --> read the console input and process it
        require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        }).on('line', function(line) {
            arr.push(line);
        }).on('close', function() {
            console.log(processTravelAgencyCommands(arr));
        });
    }
})();