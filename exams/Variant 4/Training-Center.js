function processTrainingCenterCommands(commands) {
    
    'use strict';
    
    var trainingcenter = (function () {
                
        var TrainingCenterEngine = (function () {
            
            var _trainers;
            var _uniqueTrainerUsernames;
            var _trainings;
            
            function initialize() {
                _trainers = [];
                _uniqueTrainerUsernames = {};
                _trainings = [];
            }
            
            function executeCommand(command) {
                var cmdParts = command.split(' ');
                var cmdName = cmdParts[0];
                var cmdArgs = cmdParts.splice(1);
                switch (cmdName) {
                    case 'create':
                        return executeCreateCommand(cmdArgs);
                    case 'list':
                        return executeListCommand();
                    case 'delete':
                        return executeDeleteCommand(cmdArgs);
                    default:
                        throw new Error('Unknown command: ' + cmdName);
                }
            }
            
            function executeCreateCommand(cmdArgs) {
                var objectType = cmdArgs[0];
                var createArgs = cmdArgs.splice(1).join(' ');
                var objectData = JSON.parse(createArgs);
                var trainer;
                switch (objectType) {
                    case 'Trainer':
                        trainer = new trainingcenter.Trainer(objectData.username, objectData.firstName, 
                            objectData.lastName, objectData.email);
                        addTrainer(trainer);
                        break;
                    case 'Course':
                        trainer = findTrainerByUsername(objectData.trainer);
                        var course = new trainingcenter.Course(objectData.name, objectData.description, trainer,
                            parseDate(objectData.startDate), objectData.duration);
                        addTraining(course);
                        break;
                    case 'Seminar':
                        trainer = findTrainerByUsername(objectData.trainer);
                        var seminar = new trainingcenter.Seminar(objectData.name, objectData.description, 
                            trainer, parseDate(objectData.date));
                        addTraining(seminar);
                        break;
                    case 'RemoteCourse':
                        trainer = findTrainerByUsername(objectData.trainer);
                        var remoteCourse = new trainingcenter.RemoteCourse(objectData.name, objectData.description,
                            trainer, parseDate(objectData.startDate), objectData.duration, objectData.location);
                        addTraining(remoteCourse);
                        break;
                    default:
                        throw new Error('Unknown object to create: ' + objectType);
                }
                return objectType + ' created.';
            }
            
            function findTrainerByUsername(username) {
                if (! username) {
                    return undefined;
                }
                for (var i = 0; i < _trainers.length; i++) {
                    if (_trainers[i].getUsername() == username) {
                        return _trainers[i];
                    }
                }
                throw new Error("Trainer not found: " + username);
            }
            
            function addTrainer(trainer) {
                if (_uniqueTrainerUsernames[trainer.getUsername()]) {
                    throw new Error('Duplicated trainer: ' + trainer.getUsername());
                }
                _uniqueTrainerUsernames[trainer.getUsername()] = true;
                _trainers.push(trainer);
            }
            
            function addTraining(training) {
                _trainings.push(training);
            }
            
            function executeListCommand() {
                var result = '', i;
                if (_trainers.length > 0) {
                    result += 'Trainers:\n' + ' * ' + _trainers.join('\n * ') + '\n';
                } else {
                    result += 'No trainers\n';
                }
                
                if (_trainings.length > 0) {
                    result += 'Trainings:\n' + ' * ' + _trainings.join('\n * ') + '\n';
                } else {
                    result += 'No trainings\n';
                }
                
                return result.trim();
            }
            
            function executeDeleteCommand(cmdArgs) {
                var objectType = cmdArgs[0];
                var deleteArgs = cmdArgs.splice(1).join(' ');
                switch (objectType) {
                    case 'Trainer':
                        // TODO: implement "delete Trainer" command
                        deleteTrainer(deleteArgs);
                        break;
                    default:
                        throw new Error('Unknown object to delete: ' + objectType);
                }
                return objectType + ' deleted.';
            }
			    function deleteTrainer(username) {
					if (!_uniqueTrainerUsernames[username]) {
						throw new Error('Cannot delete missing trainer: ' + username);
					}
                
					delete _uniqueTrainerUsernames[username];
					
					_trainers = _trainers.filter(function (trainer) {
						return trainer.getUsername() != username;
					});
					
					_trainings.forEach(function (training) {
						training.setTrainer(undefined);
					});
				}
            
            var trainingCenterEngine = {
                initialize: initialize,
                executeCommand: executeCommand
            };
            return trainingCenterEngine;
        }());
		
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
		
		function checkString(value) {
			if (typeof (value) !== "string" || !(value)) {
				throw new Error(variable + " should not be empty")
			}
		}
		function checkEmptyString(value) {
			if (value === "" && value!==null && typeof (value)!=="undefined") {
				throw new Error("Should not be an empty first name")
			}
		}

        var Trainer = (function() {
			function Trainer(username, firstName, lastName, email) {
			
				this.setUsername(username);
				this.setFirstName(firstName);
				this.setLastName(lastName);
				this.setEmail(email);
			}
			Trainer.prototype.getUsername = function() {
				return this._username;
			}
			Trainer.prototype.setUsername = function(username) {
				checkString(username);
				this._username = username;
			}
			Trainer.prototype.setFirstName = function(firstName) {
				if (firstName === undefined || firstName === null) {
					return undefined;
				}
				if (firstName === "" || typeof firstName !== "string") {
					throw new Error("Should not be an empty string fucker")
				}
				this._firstName = firstName;
			}
			Trainer.prototype.getFirstName = function() {
				return this._firstName;
			}
			Trainer.prototype.setLastName = function(lastName) {
				checkString(lastName)
				this._lastName = lastName;
			}
			Trainer.prototype.getLastName = function() {
				return this._lastName;
			}
			Trainer.prototype.setEmail = function(email) {
				if (email === undefined || email === null) {
					return undefined;
				}
				if (email.indexOf("@") === -1 || typeof email !== "string") {
					throw new Error("Should contain @")
				}
				this._email = email;
			}
			Trainer.prototype.getEmail = function() {
				return this._email;
			}
			
			Trainer.prototype.toString = function () {
				var firstName = "",
					email = "";
				if (this._firstName) {
					firstName = ";first-name=" + this.getFirstName();
				}
				if (this._email) {
					email = ";email=" + this.getEmail()
				}
				var result = "Trainer[username=" + this.getUsername() + firstName + ";last-name=" + this.getLastName() + email + "]";
				return result;
			}
			
			return Trainer;
		})();
        
        var Training = (function () { 
			function Training(name, description, trainer, startDate, duration) {
				if (this.constructor === Training) {
					throw new Error("Can't instantiate abstract class!");
				}
				this.setName(name);
				this.setDescription(description);
				this.setTrainer(trainer);
				this.setStartDate(startDate);
				this.setDuration(duration);
			}
			Training.extends(Trainer);
			Training.prototype.setName = function(name) {
				checkString(name);
				this._name = name;
			}
			Training.prototype.getName = function() {
				return this._name;
			}
			Training.prototype.setDescription = function(description) {
				checkEmptyString(description);
				this._description = description;
			}
			Training.prototype.getDescription = function() {
				return this._description;
			}
			Training.prototype.setTrainer = function(trainer) {
				checkEmptyString(trainer)
				this._trainer = trainer;
			}
			Training.prototype.getTrainer = function() {
				return this._trainer;
			}
			Training.prototype.setStartDate = function(startDate) {
				
				if (!(startDate instanceof Date) || !startDate) {
					throw new Error("Must be a date object/ wrong input");
				}
				var d = startDate.toString().replace(/-/g, ' ');
				var date = new Date(d);
				var day = date.getDate();
				
				var year = date.getFullYear();
				var month = d.toString().split(" ")[1];
				
				var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				var validMonth = false;
				for (var i = 0; i < months.length; i++) {
					if (month === months[i]) {
						validMonth = true;
					}
				}
				if (isNaN(day) || isNaN(year) || day < 1 || day > 31 || year < 2000 || year > 2020 || validMonth === false) {
					throw new Error("Invalid date range/ input")
				}
				var finalDate = day + "-" + month + "-" + year;
				this._startDate = finalDate;
			}
			Training.prototype.getStartDate = function() {
				return this._startDate;
			}
			Training.prototype.setDuration = function(duration) {
				if (duration === undefined || duration === null) {
					return undefined;
				}
		
				if (duration < 1 || duration > 99 || duration !== parseInt(duration, 10)) {
					throw new Error("Ivalid duration range")
				}
				this._duration = duration;
			}
			Training.prototype.getDuration = function() {
				return this._duration;
			}
			Training.prototype.firstPart = function () {
					var description = "",
					trainer = "";
					if (this._description) {
						description = ";description=" + this.getDescription();
					}
					if (this._trainer) {
						trainer = ";trainer=" + this.getTrainer();
					}
					return "[name=" + this.getName() + description + trainer;
			}
			Training.prototype.toString = function() {

				var duration = "";

				if (this._duration) {
					duration = ";duration=" + this.getDuration();
				}
				
				return this.firstPart()  + ";start-date=" + this.getStartDate() + duration;

			}
			return Training;
		})();
        
        var Course = (function () { 
			function Course(name, description, trainer, startDate, duration) {
				Training.call(this, name, description, trainer, startDate, duration);
			}
			Course.extends(Training);
			Course.prototype.toString = function () {
				return "Course" + Training.prototype.toString.call(this) + "]";
			}
			
			return Course;
		})();
        
        var Seminar = (function () { 
			function Seminar(name, description, trainer, startDate, duration) {
				Training.call(this, name, description, trainer, startDate, 1);
				this.setStartDate(startDate);
				this.setDuration(duration);
			}
			Seminar.extends(Training);
			
			Seminar.prototype.toString = function() {
				return "Seminar" + Training.prototype.firstPart.call(this) + ";date=" + 
				Training.prototype.getStartDate.call(this) + "]";
			}
			
			return Seminar;
		})();

        var RemoteCourse = (function () { 
			function RemoteCourse(name, description, trainer, startDate, duration, location) {
				Training.call(this, name, description, trainer, startDate, duration);
				this.setLocation(location);
			}
			RemoteCourse.extends(Training);
			RemoteCourse.prototype.setLocation = function(location) {
				checkString(location);
				this._location = location;
			}
			RemoteCourse.prototype.getLocation = function() {
				return this._location;
			}
			RemoteCourse.prototype.toString = function() {
				return "RemoteCourse" + Training.prototype.toString.call(this) + ";location=" + this.getLocation() + "]";
			}
			
			return RemoteCourse;
		})();
        

        var trainingcenter = {
            Trainer: Trainer,
            Course: Course,
            Seminar: Seminar,
            RemoteCourse: RemoteCourse,
            engine: {
                TrainingCenterEngine: TrainingCenterEngine
            }
        };
        
        return trainingcenter;
    })();
    
    
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
    
    
    // Process the input commands and return the results
    var results = '';
    trainingcenter.engine.TrainingCenterEngine.initialize();
    commands.forEach(function (cmd) {
        if (cmd != '') {
            try {
                var cmdResult = trainingcenter.engine.TrainingCenterEngine.executeCommand(cmd);
                results += cmdResult + '\n';
            } catch (err) {
               // console.log(err);
                results += 'Invalid command.\n';
            }
        }
    });
    return results.trim();
}


// ------------------------------------------------------------
// Read the input from the console as array and process it
// Remove all below code before submitting to the judge system!
// ------------------------------------------------------------

(function () {
    var arr = [];
    if (typeof (require) == 'function') {
        // We are in node.js --> read the console input and process it
        require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        }).on('line', function (line) {
            arr.push(line);
        }).on('close', function () {
            console.log(processTrainingCenterCommands(arr));
        });
    }
})();
