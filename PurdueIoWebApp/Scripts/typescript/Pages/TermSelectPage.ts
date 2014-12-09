class TermSelectPage extends Page {
	private terms: Array<Term>;

	constructor(app: App) {
		// Set component ID, page title
		this.componentId = "TermSelectPage";
		this.pageTitle = "Purdue.io";
		super(app);
	}

	public show(): void {
		if (this.terms == null) {
			this.getApp().progressIndicator.pushWork();
			this.getApp().dataSource.fetchTerms().then((terms) => {
				this.terms = terms;
				this.displayTerms(terms);
				this.getApp().progressIndicator.popWork();
			}, (error) => {
					alert("Error fetching term list: " + error);
					this.getApp().progressIndicator.popWork();
				});
		}
		super.show();
	}

	public displayTerms(terms: Array<Term>) {
		var termListElement = this.element.querySelector("ul");
		for (var i in terms) {
			var term = terms[i];
			var termEl = document.createElement("a");
			termEl.innerText = term.Name;
			((term) => {
				termEl.addEventListener("click", () => {
					this.getApp().selectedTerm = term;
					this.getApp().navigate(new LandingPage(this.getApp(), term));
				});
			})(term);

			var termLi = document.createElement("li");
			termLi.appendChild(termEl);

			termListElement.appendChild(termLi);
		}
	}
}