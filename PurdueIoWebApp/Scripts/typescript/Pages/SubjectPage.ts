class SubjectPage extends Page {
	public term: Term;
	public subject: Subject;
	public tiles: DataTiles;
	constructor(app: App, term: Term, subject: Subject) {
		this.term = term;
		this.subject = subject;
		this.componentId = "SubjectPage";
		this.pageTitle = subject.Abbreviation.toUpperCase();
		super(app);
		(<HTMLElement>this.element.querySelector("h1")).innerText = subject.Name;

		// Prepare tiles
		this.tiles = new DataTiles(this.getApp());
		this.tiles.parentElement = this.element;

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
				var dialog = new SubjectCourseSelectionDialog(this.getApp(), term, subject);
				dialog.show();
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

	public show(): void {
		super.show();
		this.tiles.show();
	}
} 