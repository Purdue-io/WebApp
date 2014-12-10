class SubjectSelectionDialog extends Dialog {
	public term: Term;

	constructor(app: App, term: Term) {
		this.term = term;
		super(app, "Subjects", "");
		app.progressIndicator.pushWork();
		app.dataSource.fetchTermSubjects(term).then((subjects) => {
			this.processSubjects(subjects);
			app.progressIndicator.popWork();
		}, () => {
			alert("Error fetching subject listing for " + term.Name);
			app.progressIndicator.popWork();
		});
	}

	public processSubjects(subjects: Array<Subject>) {
		var subjList = document.createElement("ul");
		subjList.classList.add("subjects");
		subjList.classList.add("animated");
		subjList.classList.add("anim-shove-in-left");
		for (var i in subjects) {
			var subject = subjects[i];
			var subjectLi = document.createElement("li");
			subjectLi.innerHTML = '<div class="abbreviation">'+ subject.Abbreviation + '</div><span class="name">' + subject.Name + '</span>';
			subjList.appendChild(subjectLi);
			((subject) => {
				subjectLi.addEventListener("click", () => {
					this.getApp().navigate(new SubjectPage(this.getApp(), this.term, subject));
					this.hide();
				});
			})(subject);
		}
		this.setContentDom(subjList);
	}
}