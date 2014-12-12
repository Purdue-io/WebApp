/**
 * This page is responsible for delivering an overview/portal
 * for a particular term. Term is passed in via the constructor.
 */
class LandingPage extends Page {
	public term: Term;
	public subjects: Array<Subject>;

	// Sub-components:
	public tiles: DataTiles;

	constructor(app: App, term: Term) {
		// Set component ID, page title
		this.componentId = "LandingPage";
		this.term = term;
		this.pageTitle = term.Name;

		// Initialize page
		super(app);

		// Prepare the tiles!
		this.tiles = new DataTiles(this.getApp());
		this.tiles.parentElement = <HTMLElement>this.element.querySelector("div.tiles");

		// Fetch subjects!
		this.getApp().progressIndicator.pushWork();
		this.getApp().dataSource.fetchTermSubjects(term).then((subjects) => {
			this.subjects = subjects;
			this.getApp().progressIndicator.popWork();
			this.processSubjects();
		}, (error) => {
			alert("Error fetching subjects: " + error);
			this.getApp().progressIndicator.popWork();
		});

		// Subject count tile
		var subjectsTile: DataTileDefinition = {
			label: "Subjects",
			data: "...",
			source: () => {
				return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
					this.getApp().dataSource.fetchTermSubjectCount(this.term).then((result: number) => {
						resolve(result.toString());
					});
				});
			},
			action: () => {

			}
		};
		this.tiles.addTile(subjectsTile);

		// Course count tile
		var coursesTile: DataTileDefinition = {
			label: "Courses",
			data: "...",
			source: () => {
				return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
					this.getApp().dataSource.fetchTermCourseCount(this.term).then((result: number) => {
						resolve(parseFloat((result / 1000).toString()).toFixed(1) + "k"); // Format the number to '4.2k'
					});
				});
			},
			action: () => {

			}
		};
		this.tiles.addTile(coursesTile);

		// Percent full tile
		var percentTile: DataTileDefinition = {
			label: "Sections Full",
			data: "...",
			source: () => {
				return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
					this.getApp().dataSource.fetchTermSectionCount(this.term).then((totalCount: number) => {
						this.getApp().dataSource.fetchTermFilledSectionCount(this.term).then((filledCount: number) => {
							resolve(parseFloat(((filledCount / totalCount) * 100).toString()).toFixed(0) + "%"); // Format the number to %
						});
					});
				});
			},
			action: () => {

			}
		};
		this.tiles.addTile(percentTile);
	}

	public processSubjects(): void {
		var subjectsUlElement = <HTMLElement>this.element.querySelector("ul.subjects");
		for (var i = 0; i < this.subjects.length; i++) {
			var subjectLiElement = document.createElement("li");
			subjectLiElement.innerHTML = '<div class="abbreviation">' + this.subjects[i].Abbreviation + '</div><div class="name">' + this.subjects[i].Name + '</div>';
			((subject) => {
				subjectLiElement.addEventListener("click", () => {
					this.getApp().navigate(new SubjectPage(this.getApp(), this.term, subject));
					this.hide();
				});
			})(this.subjects[i]);
			subjectsUlElement.appendChild(subjectLiElement);
		}
	}

	public show(): void {
		super.show();
		this.tiles.show();
	}
}