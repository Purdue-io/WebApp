class UserBar extends Component {
	constructor(app: App) {
		this.componentId = "UserBar";
		super(app);
	}

	public show() {
		if (typeof this.getApp().dataSource.username === 'undefined') {
			var loginLink = document.createElement("a");
			loginLink.innerHTML = "Log In";
			loginLink.addEventListener("click", () => {
				(new LogInDialog(this.getApp())).show();
			});
			(<HTMLElement>this.element.querySelector("h1.username")).innerHTML = "";
			(<HTMLElement>this.element.querySelector("h1.username")).appendChild(loginLink);
		} else {
			(<HTMLElement>this.element.querySelector("h1.username")).innerHTML = this.getApp().dataSource.username;
		}
		super.show();
	}

	public loadUserData() {
		(<HTMLElement>this.element.querySelector("h1.username")).innerHTML = this.getApp().dataSource.username;
		(<HTMLElement>this.element.querySelector("div.schedule")).style.display = "inline-block";
		var scheduleListElement = (<HTMLElement>this.element.querySelector("div.schedule ul"));
		scheduleListElement.innerHTML = "";
		this.getApp().progressIndicator.pushWork();
		this.getApp().dataSource.fetchUserSchedule().then((success) => {
			var courses: Array<CourseExpanded> = new Array();
			for (var i = 0; i < success.length; i++) {
				var exists = courses.some((value, index, array) => {
					return value.CourseId == success[i].Class.Course.CourseId;
				});
				if (exists) continue;
				courses.push(success[i].Class.Course);
				var listElement = document.createElement("li");
				listElement.innerHTML = '<div class="abbreviation">' + success[i].Class.Course.Subject.Abbreviation + " " + success[i].Class.Course.Number + "</div>"
				+ '<div class="title">' + success[i].Class.Course.Title + '</div>';
				((element: HTMLElement, section: SectionExpanded) => {
					element.addEventListener("click", () => {
						this.getApp().navigate(new CoursePage(this.getApp(), <Course>(section.Class.Course)));
					});
				})(listElement, success[i]);
				scheduleListElement.appendChild(listElement);
			}
			this.getApp().progressIndicator.popWork();
		}, (error) => {
			alert("Error fetching user schedule: " + error);
			this.getApp().progressIndicator.popWork();
		});
	}
} 