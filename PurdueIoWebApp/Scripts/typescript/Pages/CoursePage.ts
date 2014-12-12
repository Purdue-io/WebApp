class CoursePage extends Page {
	public course: Course;
	public courseDetails: CourseDetails;
	public tiles: DataTiles;

	constructor(app: App, course: Course) {
		this.course = course;
		this.componentId = "CoursePage";
		this.pageTitle = course.Number;
		super(app);
		(<HTMLElement>this.element.querySelector("h1")).innerText = course.Title;

		// Fetch course details
		this.getApp().progressIndicator.pushWork();
		var courseDetailsPromise = this.getApp().dataSource.fetchCourseDetails(course).then((courseDetails) => {
			this.courseDetails = courseDetails;
			this.getApp().progressIndicator.popWork();
			this.processCourseDetails();
			return courseDetails;
		}, (error) => {
			alert("Error fetching course details for course " + course.CourseId);
			this.getApp().progressIndicator.popWork();
		});

		// Prepare tiles
		this.tiles = new DataTiles(this.getApp());
		this.tiles.parentElement = <HTMLElement>this.element.querySelector("div.tiles");

		// Credit hours tile
		var classesTile: DataTileDefinition = {
			label: "credit hours",
			data: "...",
			source: () => {
				return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
					resolve(this.course.CreditHours.toString());
				});
			},
			action: () => {
			}
		};
		this.tiles.addTile(classesTile);

		// Class count tile
		var classesTile: DataTileDefinition = {
			label: "Classes",
			data: "...",
			source: () => {
				return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
					courseDetailsPromise.then((details) => {
						resolve(details.Classes.length.toString());
					});
				});
			},
			action: () => {
			}
		};
		this.tiles.addTile(classesTile);

		// Enrollment tile
		var enrollmentTile: DataTileDefinition = {
			label: "avg enrollment",
			data: "...",
			source: () => {
				return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
					courseDetailsPromise.then((details) => {
						var enrolled = 0;
						var capacity = 0;
						for (var i in details.Classes) {
							for (var j in details.Classes[i].Sections) {
								enrolled += details.Classes[i].Sections[j].Enrolled;
								capacity += details.Classes[i].Sections[j].Capacity;
							}
						}
						resolve(((enrolled / capacity) * 100).toFixed(0) + "%");
					});
				});
			},
			action: () => {
			}
		};
		this.tiles.addTile(enrollmentTile);
	}

	public processCourseDetails(): void {
		(<HTMLElement>this.element.querySelector("p.description")).innerText = this.courseDetails.Description;
		var courseUlElement = <HTMLElement>this.element.querySelector("ul.classes");
		for (var i = 0; i < this.courseDetails.Classes.length; i++) {
			// Prepare a list item for each class
			var pClass = this.courseDetails.Classes[i];
			var classLiElement = document.createElement("li");
			var classTitleElement = document.createElement("div");
			classTitleElement.classList.add("title");
			classTitleElement.innerText = "Class " + (i + 1);
			classTitleElement = <HTMLDivElement>classLiElement.appendChild(classTitleElement);

			// Create an array grouping sections by their type. 
			var sectionTypes = new Array<string>();
			var sectionsByType = new Array<Array<SectionDetails>>();
			for (var j = 0; j < pClass.Sections.length; j++) {
				var section = pClass.Sections[j];
				var sectionTypeIndex = sectionTypes.indexOf(section.Type);
				if (sectionTypeIndex < 0) {
					console.log("Creating grouping for '" + section.Type + "'...");
					sectionTypes.push(section.Type);
					sectionTypeIndex = sectionTypes.length - 1;
					sectionsByType[sectionTypeIndex] = new Array<SectionDetails>();
				}
				sectionsByType[sectionTypeIndex].push(section);
			}

			// Create section table
			var sectionTable = document.createElement("table");
			sectionTable.classList.add("sections");
			var sectionTableHtml = "";
			for (var j = 0; j < sectionTypes.length; j++) {
				sectionTableHtml += '<tr><th colspan="3">' + sectionTypes[j] + '</th></tr>';
				for (var k = 0; k < sectionsByType[j].length; k++) {

					var instructorList = sectionsByType[j][k].Meetings[0].Instructors.map((val, index, array) => {
						return val.Name;
					}).join(', ');
					if (instructorList.length <= 0) {
						instructorList = "TBA";
					}

					// Convert start time to Date object, then string
					var startTime = new Date(sectionsByType[j][k].Meetings[0].StartTime);
					var startTimeStr;
					if (Utility.IsDate(startTime) && startTime.getFullYear() > 0) {
						startTimeStr = startTime.toLocaleString(navigator.language, { hour: '2-digit', minute: '2-digit' });
					} else {
						startTimeStr = "";
					}

					// Figure out days of the week ...
					var days: Array<string> = new Array<string>();
					if (sectionsByType[j][k].Meetings[0].DaysOfWeek.indexOf("Monday") >= 0) days.push("M");
					if (sectionsByType[j][k].Meetings[0].DaysOfWeek.indexOf("Tuesday") >= 0) days.push("T");
					if (sectionsByType[j][k].Meetings[0].DaysOfWeek.indexOf("Wednesday") >= 0) days.push("W");
					if (sectionsByType[j][k].Meetings[0].DaysOfWeek.indexOf("Thursday") >= 0) days.push("R");
					if (sectionsByType[j][k].Meetings[0].DaysOfWeek.indexOf("Friday") >= 0) days.push("F");
					if (sectionsByType[j][k].Meetings[0].DaysOfWeek.indexOf("Saturday") >= 0) days.push("S");
					if (sectionsByType[j][k].Meetings[0].DaysOfWeek.indexOf("Sunday") >= 0) days.push("U");
					var daysString = days.join("&nbsp;");

					var timeOptions = {
						hour: 'numeric', minute: 'numeric',
						timeZoneName: 'short'
					};

					sectionTableHtml += '<tr><td>' + instructorList + '</td>' +
					'<td>' + sectionsByType[j][k].Meetings[0].Room.Building.ShortCode + '/' + sectionsByType[j][k].Meetings[0].Room.Number + '</td>' +
					'<td>' + daysString + '</td>' +
					'<td>' + startTimeStr + '</td>' +
						'</tr>';
				}
			}
			sectionTable.innerHTML = sectionTableHtml;
			classLiElement.appendChild(sectionTable);

			// If this class has a lecture section, let's name it after the lecturer
			if (sectionTypes.indexOf("Lecture") >= 0) {
				if (sectionsByType[sectionTypes.indexOf("Lecture")][0].Meetings[0].Instructors.length > 0) {
					var lecturer = sectionsByType[sectionTypes.indexOf("Lecture")][0].Meetings[0].Instructors[0].Name;
					classTitleElement.innerText = lecturer;
				}
			}

			// Finally, add the course to the list
			courseUlElement.appendChild(classLiElement);
		}
	}

	public show(): void {
		super.show();
		this.tiles.show();
	}
}