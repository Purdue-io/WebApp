class SubjectCourseSelectionDialog extends Dialog {
	public term: Term;
	public subject: Subject;

	constructor(app: App, term: Term, subject: Subject) {
		this.term = term;
		this.subject = subject;
		super(app, subject.Abbreviation + " Courses", "");
		app.progressIndicator.pushWork();
		app.dataSource.fetchTermSubjectCourses(term,subject).then((courses) => {
			this.processCourses(courses);
			app.progressIndicator.popWork();
		}, () => {
				alert("Error fetching subject listing for " + term.Name);
				app.progressIndicator.popWork();
			});
	}

	public processCourses(courses: Array<Course>) {
		var subjList = document.createElement("ul");
		subjList.classList.add("courses");
		subjList.classList.add("animated");
		subjList.classList.add("anim-shove-in-left");
		for (var i in courses) {
			var course = courses[i];
			var courseLi = document.createElement("li");
			courseLi.innerHTML = '<div class="abbreviation">' + this.subject.Abbreviation + ' ' + course.Number + '</div><span class="name">' + course.Title + '</span>';
			subjList.appendChild(courseLi);
			((course) => {
				courseLi.addEventListener("click", () => {
					this.getApp().navigate(new CoursePage(this.getApp(), course));
					this.hide();
				});
			})(course);
		}
		this.setContentDom(subjList);
	}
}