class LandingPage extends Page {
	public tiles: DataTiles;
	constructor(app: App) {
		this.componentId = "LandingPage";
		this.pageTitle = "Welcome";
		super(app);
		// Prepare the tiles!
		this.tiles = new DataTiles(this.getApp());
		this.tiles.parentElement = this.element;
		this.tiles.addTile({
			label: "Test tile", data: "...", source: () => {
				return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
					resolve("10");
				});
			}
		});
	}

	public show(): void {
		super.show();
		this.tiles.show();
	}
}