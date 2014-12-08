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
		this.tiles.addTile({
			label: "Subjects", data: "...", source: () => {
				return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
					this.getApp().dataSource.fetchTermSubjectCount(this.term).then((result: number) => {
						resolve(result.toString());
					});
				});
			}
		});
		// Course count tile
		this.tiles.addTile({
			label: "Courses", data: "...", source: () => {
				return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
					this.getApp().dataSource.fetchTermCourseCount(this.term).then((result: number) => {
						resolve(parseFloat((result/1000).toString()).toFixed(1) + "k"); // Format the number to '4.2k'
					});
				});
			}
		});
	}

	public show(): void {
		super.show();
		this.tiles.show();
	}
}