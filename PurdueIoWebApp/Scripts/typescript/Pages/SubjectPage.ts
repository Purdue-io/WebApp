class SubjectPage extends Page {
	public term: Term;
	public subject: Subject;
	public courses: Array<Course>;
	public tiles: DataTiles;
	constructor(app: App, term: Term, subject: Subject) {
		this.term = term;
		this.subject = subject;
		this.componentId = "SubjectPage";
		this.pageTitle = subject.Abbreviation.toUpperCase();
		super(app);
		(<HTMLElement>this.element.querySelector("h1")).innerText = subject.Name;

		// Fetch courses!
		this.getApp().progressIndicator.pushWork();
		this.getApp().dataSource.fetchTermSubjectCourses(term, subject).then((courses) => {
			this.courses = courses;
			this.getApp().progressIndicator.popWork();
			this.processCourses();
		}, (error) => {
			alert("Error fetching courses: " + error);
			this.getApp().progressIndicator.popWork();
		});

		// Prepare tiles
		this.tiles = new DataTiles(this.getApp());
		this.tiles.parentElement = <HTMLElement>this.element.querySelector("div.tiles");

		// Subject count tile
		var coursesTile: DataTileDefinition = {
			label: "Courses",
			data: "...",
			source: () => {
				return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
					this.getApp().dataSource.fetchTermSubjectCoursesCount(this.term, this.subject).then((result: number) => {
						resolve(result.toString());
					});
				});
			},
			action: () => {
				
			}
		};
		this.tiles.addTile(coursesTile);

		// Instructor count tile
		var instructorsTile: DataTileDefinition = {
			label: "Instructors",
			data: "...",
			source: () => {
				return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
					this.getApp().dataSource.fetchTermSubjectInstructorsCount(this.term, this.subject).then((result: number) => {
						resolve(result.toString());
					});
				});
			},
			action: () => {
				
			}
		};
		this.tiles.addTile(instructorsTile);
		
	}

	public processCourses(): void {
		var coursesUlElement = <HTMLElement>this.element.querySelector("ul.courses");
		for (var i = 0; i < this.courses.length; i++) {
			var courseLiElement = document.createElement("li");
			courseLiElement.innerHTML = '<div class="abbreviation">' + this.courses[i].Number + '</div><div class="name">' + this.courses[i].Title + '</div>';
			((course) => {
				courseLiElement.addEventListener("click", () => {
					this.getApp().navigate(new CoursePage(this.getApp(), this.term, course));
					this.hide();
				});
			})(this.courses[i]);
			coursesUlElement.appendChild(courseLiElement);
		}
	}

	public show(): void {
		super.show();
		this.tiles.show();
	}
} 