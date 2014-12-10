/**
 * This page is responsible for delivering an overview/portal
 * for a particular term. Term is passed in via the constructor.
 */
class LandingPage extends Page {
	public term: Term;

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
		this.tiles.parentElement = this.element;

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
				var dialog = new SubjectSelectionDialog(this.getApp(), term);
				dialog.show();
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

	public show(): void {
		super.show();
		this.tiles.show();
	}
}