function processVehicleParkCommands(commands) {
    'use strict';

    var Models = (function() {
		function checkString(value) {
			if (typeof (value) !== "string" || !(value)) {
				throw new Error("Should not be an empty string!")
			}
		}
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
		
        var Employee = (function() {
            function Employee(name, position, grade) {
                this.setName(name);
                this.setPosition(position);
                this.setGrade(grade);
            }

            Employee.prototype.getName = function() {
                return this._name;
            }

            Employee.prototype.setName = function(name) {
                if (name === undefined || name === "") {
                    throw new Error("Name cannot be empty or undefined.");
                }
                this._name = name;
            }

            Employee.prototype.getPosition = function() {
                return this._position;
            }

            Employee.prototype.setPosition = function(position) {
                if (position === undefined || position === "") {
                    throw new Error("Position cannot be empty or undefined.");
                }
                this._position = position;
            }

            Employee.prototype.getGrade = function() {
                return this._grade;
            }

            Employee.prototype.setGrade = function(grade) {
                if (grade === undefined || isNaN(grade) || grade < 0) {
                    throw new Error("Grade cannot be negative.");
                }
                this._grade = grade;
            }

            Employee.prototype.toString = function() {
                return " ---> " + this.getName() +
                    ",position=" + this.getPosition();
            }

            return Employee;
        }());

        var Vehicle = (function(){
           function Vehicle(brand, age, terrainCoverage, numberOfWheels) {
			   	if (this.constructor === Vehicle) {
					throw new Error("Can't instantiate abstract class!");
				}
				this.setBrand(brand);
				this.setAge(age);
				this.setTerrainCoverage(terrainCoverage);
				this.setNumberOfWheels(numberOfWheels);
		   }
		   Vehicle.prototype.setBrand = function(brand) {
			   checkString(brand);
			   this._brand = brand;
		   }
		   Vehicle.prototype.getBrand = function() {
			   return this._brand;
		   }
		   Vehicle.prototype.setAge = function(age) {
			   if (age < 0) {
				   throw new Error("Age should not be negative!")
			   }
			   this._age = age;
		   }
		   Vehicle.prototype.getAge = function() {
			   return this._age.toFixed(1);
		   }
		   Vehicle.prototype.setTerrainCoverage = function(terrainCoverage) {
			   if ((terrainCoverage !== undefined || terrainCoverage !== null) &&
				(terrainCoverage !== "all" && terrainCoverage !== "road")) {
					throw new Error("Terrain type should be road or all!")
			   }
			   this._terrainCoverage = terrainCoverage;
		   }
		   Vehicle.prototype.getTerranCoverage = function() {
			   return this._terrainCoverage;
		   }
		   Vehicle.prototype.setNumberOfWheels = function(numberOfWheels) {
			   if (numberOfWheels < 0) {
				   throw new Error("Number of wheels should not be a negative number!")
			   }
			   this._numberOfWheels = numberOfWheels;
		   }
		   Vehicle.prototype.getNumberOfWheels = function() {
			   return this._numberOfWheels;
		   }
		   Vehicle.prototype.toString = function() {
			   return 'brand=' + this.getBrand() + ',age=' + this.getAge() + 
			   ',terrainCoverage=' + this.getTerranCoverage() + ',numberOfWheels=' + this.getNumberOfWheels();
		   }
		   return Vehicle;
        })();

        var Bike = (function(){
            function Bike(brand, age, terrainCoverage, frameSize, numberOfShifts) {
				Vehicle.call(this, brand, age, terrainCoverage, 2);
				this.setFrameSize(frameSize);
				this.setNumberOfShifts(numberOfShifts);
			}
			Bike.extends(Vehicle);
			Bike.prototype.setFrameSize = function(frameSize) {
				if (isNaN(frameSize) || frameSize < 0) {
					throw new Error("Frame size should not be negative")
				}
			   this._frameSize = frameSize;
		   }
		   Bike.prototype.getFrameSize = function() {
			   return this._frameSize;
		   }
		   Bike.prototype.setNumberOfShifts = function(numberOfShifts) {
			   if (numberOfShifts === undefined || numberOfShifts === null) {
				   return undefined;
			   }
			   if (numberOfShifts === "" || typeof numberOfShifts !== "string") {
				   throw new Error("Number of shifts should not be an empty string");
			   }
			   this._numberOfShifts = numberOfShifts;
		   }
		   Bike.prototype.getNumberOfShifts = function() {
			   return this._numberOfShifts;
		   }
		   Bike.prototype.toString = function() {
			   var result = " -> Bike: " + Vehicle.prototype.toString.call(this) + 
			   ",frameSize=" + this.getFrameSize();
			   if (this.getNumberOfShifts()) {
				   result += ",numberOfShifts=" + this.getNumberOfShifts();
			   }
			   return result;
		   }
			return Bike;
        })();

        var Automobile = (function(){
            function Automobile(brand, age, terrainCoverage, numberOfWheels, consumption, typeOfFuel) {
				if (this.constructor === Automobile) {
					throw new Error("Can't instantiate abstract class!");
				}
				Vehicle.call(this, brand, age, terrainCoverage, numberOfWheels);
				this.setConsumption(consumption);
				this.setTypeOfFuel(typeOfFuel);
			}
			Automobile.extends(Vehicle);
			Automobile.prototype.setConsumption = function(consumption) {
				if (consumption < 0) {
					throw new Error("Consumption should not be a negative number!")
				}
			   this._consumption = consumption;
			}
			Automobile.prototype.getConsumption = function() {
			   return this._consumption;
			}
			Automobile.prototype.setTypeOfFuel = function(typeOfFuel) {
				checkString(typeOfFuel);
			   this._typeOfFuel = typeOfFuel;
			}
			Automobile.prototype.getTypeOfFuel = function() {
			   return this._typeOfFuel;
			}
			Automobile.prototype.toString = function() {
				return Vehicle.prototype.toString.call(this) + ',consumption=[' +
					this.getConsumption() +	'l/100km ' + this.getTypeOfFuel() + ']';
			}
			return Automobile;
        })();

        var Truck = (function() {
            function Truck(brand, age, terrainCoverage, consumption, typeOfFuel, numberOfDoors) {
				if (terrainCoverage === undefined || terrainCoverage === null) {
					terrainCoverage = "all";
				}
				Automobile.call(this, brand, age, terrainCoverage, 4, consumption, typeOfFuel);
				this.setNumberOfDoors(numberOfDoors);
			}
			Truck.extends(Automobile);
			Truck.prototype.setNumberOfDoors = function(numberOfDoors) {
				if (numberOfDoors < 0) {
					throw new Error("Number of doors should not be a negative number!")
				}
				this._numberOfDoors = numberOfDoors;
			}
			Truck.prototype.getNumberOfDoors = function() {
				return this._numberOfDoors;
			}
			Truck.prototype.toString = function() {
				return " -> Truck: " + Automobile.prototype.toString.call(this) +
					",numberOfDoors=" + this.getNumberOfDoors();
			}
			return Truck;
        })();

        var Limo = (function(){
           function Limo(brand, age, numberOfWheels, consumption, typeOfFuel) {
			   Automobile.call(this, brand, age, "road", numberOfWheels, consumption, typeOfFuel);
			   this._employees = [];
		   }
		   Limo.extends(Automobile);
			Limo.prototype.appendEmployee = function(employee) {
				var index = this._employees.indexOf(employee);
				if (index < 0) {
					this._employees.push(employee);
				}
			}
		   Limo.prototype.detachEmployee = function(employee) {
			   	var index = this._employees.indexOf(employee);
				if (index !== -1) {
					this._employees.splice(index, 1);
				}
				else {
					throw new Error("The destination doesn't exist!")
				}
		   }
		   Limo.prototype.toString = function() {
			   var result = ' -> Limo: ' + Automobile.prototype.toString.call(this);
			   result += "\n" + " --> Employees, allowed to drive:";
			   if (this._employees.length === 0) {
                    result += " ---";
               }
			   else {
					for (var i = 0; i < this._employees.length; i++) {
						result += "\n" + this._employees[i].toString();
					}
			   }
			   return result;
		   }
		   return Limo;
        })();

        return {
            Employee: Employee,
			Vehicle: Vehicle,
			Bike: Bike,
			Automobile: Automobile,
			Truck: Truck,
			Limo: Limo
        }
    }());

    var ParkManager = (function(){
        var _vehicles;
        var _employees;

        function init() {
            _vehicles = [];
            _employees = [];
        }

        var CommandProcessor = (function() {

            function processInsertCommand(command) {
                var object;

                switch (command["type"]) {
                    case "bike":
                        object = new Models.Bike(
                            command["brand"],
                            parseFloat(command["age"]),
                            command["terrain-coverage"],
                            parseFloat(command["frame-size"]),
                            command["number-of-shifts"]);
                        _vehicles.push(object);
                        break;
                    case "truck":
                        object = new Models.Truck(
                            command["brand"],
                            parseFloat(command["age"]),
                            command["terrain-coverage"],
                            parseFloat(command["consumption"]),
                            command["type-of-fuel"],
                            parseFloat(command["number-of-doors"]));
                        _vehicles.push(object);
                        break;
                    case "limo":
                        object = new Models.Limo(
                            command["brand"],
                            parseFloat(command["age"]),
                            parseFloat(command["number-of-wheels"]),
                            parseFloat(command["consumption"]),
                            command["type-of-fuel"]);
                        _vehicles.push(object);
                        break;
                    case "employee":
                        object = new Models.Employee(command["name"], command["position"], parseFloat(command["grade"]));
                        _employees.push(object);
                        break;
                    default:
                        throw new Error("Invalid type.");
                }

                return object.constructor.name + " created.";
            }

            function processDeleteCommand(command) {
                var object,
                    index;

                switch (command["type"]) {
                    case "employee":
                        object = getEmployeeByName(command["name"]);
                        _vehicles.forEach(function(t) {
                            if (t instanceof Models.Limo && t.getEmployees().indexOf(object) !== -1) {
                                t.detachEmployee(object);
                            }
                        });
                        index = _employees.indexOf(object);
                        _employees.splice(index, 1);
                        break;
                    case "bike":
                    case "truck":
                    case "limo":
                        object = getVehicleByBrandAndType(command["brand"],command["type"]);
                        index = _vehicles.indexOf(object);
                        _vehicles.splice(index, 1);
                        break;
                    default:
                        throw new Error("Unknown type.");
                }

                return object.constructor.name + " deleted.";
            }

            function processListCommand(command) {
                return formatOutputList(_vehicles);
            }

            function processAppendEmployeeCommand(command) {
                var employee = getEmployeeByName(command["name"]);
                var limos = getLimosByBrand(command["brand"]);

                for (var i=0; i < limos.length; i++) {
                    limos[i].appendEmployee(employee);
                }
                return "Added employee to possible Limos.";
            }

            function processDetachEmployeeCommand(command) {
                var employee = getEmployeeByName(command["name"]);
                var limos = getLimosByBrand(command["brand"]);

                for (var i=0; i < limos.length; i++) {
                    limos[i].detachEmployee(employee);
                }

                return "Removed employee from possible Limos.";
            }

            // Functions below are not revealed

            function getVehicleByBrandAndType(brand, type) {
                for (var i=0; i < _vehicles.length; i++) {
                    if (_vehicles[i].constructor.name.toString().toLowerCase() === type &&
                        _vehicles[i].getBrand() === brand) {
                        return _vehicles[i];
                    }
                }
                throw new Error("No Limo with such brand exists.");
            }

            function getLimosByBrand(brand) {
                var currentVehicles = [];
                for (var i=0; i < _vehicles.length; i++) {
                    if (_vehicles[i] instanceof Models.Limo &&
                        _vehicles[i].getBrand() === brand) {
                        currentVehicles.push(_vehicles[i]);
                    }
                }
                if (currentVehicles.length > 0) {
                    return currentVehicles;
                }
                throw new Error("No Limo with such brand exists.");
            }

            function getEmployeeByName(name) {

                for (var i = 0; i < _employees.length; i++) {
                    if (_employees[i].getName() === name) {
                        return _employees[i];
                    }
                }
                throw new Error("No Employee with such name exists.");
            }

            function formatOutputList(output) {
                var queryString = "List Output:\n";

                if (output.length > 0) {
                    queryString += output.join("\n");
                } else {
                    queryString = "No results.";
                }

                return queryString;
            }
			
			function processListEmployees(command) {
				var grade = command["grade"];
                _employees.sort(function (a, b) {
                    return a.getName() > b.getName();
                });
                var result = "List Output:" + "\n";
                for (var i = 0; i < _employees.length; i++) {
                    if (_employees[i].getGrade() >= grade || grade === "all") {
                        result += _employees[i].toString();
						if (i+1 === _employees.length) {
							break;
						}
						else {
							result+="\n";
						}
                    }
                }
				result = result.replace(/^\s+|\s+$/g, "");
                return result;
			}

            return {
                processInsertCommand: processInsertCommand,
                processDeleteCommand: processDeleteCommand,
                processListCommand: processListCommand,
                processAppendEmployeeCommand: processAppendEmployeeCommand,
                processDetachEmployeeCommand: processDetachEmployeeCommand,
				processListEmployees: processListEmployees
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
                case "append-employee":
                    output = CommandProcessor.processAppendEmployeeCommand(commandArgs);
                    break;
                case "detach-employee":
                    output = CommandProcessor.processDetachEmployeeCommand(commandArgs);
                    break;
                case "list":
                    output = CommandProcessor.processListCommand(commandArgs);
                    break;
                case "list-employees":
                    output = CommandProcessor.processListEmployees(commandArgs);
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

    var output = "";
    ParkManager.init();

    commands.forEach(function(cmd) {
        var result;
        if (cmd != "") {
            try {
                result = ParkManager.executeCommands(cmd) + "\n";
            } catch (e) {
                result = "Invalid command." + "\n";
                console.log(e)
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
            console.log(processVehicleParkCommands(arr));
        });
    }
})();