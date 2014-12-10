class SubjectSelectionDialog extends Dialog {

	constructor(app: App, term: Term) {
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
		for (var i in subjects) {
			var subject = subjects[i];
			var subjectLi = document.createElement("li");
			subjectLi.innerHTML = '<div class="abbreviation">'+ subject.Abbreviation + '</div><span class="name">' + subject.Name + '</span>';
			subjList.appendChild(subjectLi);
		}
		this.setContentDom(subjList);
	}
}