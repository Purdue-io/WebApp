class DataTiles extends Component {
	public tiles: Array<{ label: string; data: string; source: () => Promise<string>; }>;

	constructor(app) {
		this.componentId = "DataTiles";
		this.tiles = new Array();
		super(app);
		for (var i in this.tiles) {
			this.renderTile(this.tiles[i]);
		}
	}

	public addTile(tile: { label: string; data: string; source: () => Promise<string>; }) {
		this.tiles.push(tile);
		this.renderTile(tile);
	}

	private renderTile(tile: { label: string; data: string; source: () => Promise<string>; }) {
		var tileElement = <HTMLElement>document.createElement("li");
		var data = document.createElement("span");
		data.innerHTML = tile.data;
		tileElement.appendChild(data);
		var label = document.createElement("label");
		label.innerText = tile.label;
		tileElement.appendChild(label);

		tileElement = <HTMLElement>this.element.appendChild(tileElement);

		tile.source().then((val: string) => {
			tileElement.getElementsByTagName("span")[0].innerHTML = val;
		});
	}
}