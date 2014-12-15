class DataTileDefinition {
	public label: string;
	public data: string;
	public source: () => Promise<string>;
	public action: () => void;
}

/**
 * The datatiles component represents various measures of data on 'tiles'.
 */
class DataTiles extends Component {
	public tiles: Array<DataTileDefinition>;

	constructor(app) {
		this.componentId = "DataTiles";
		this.tiles = new Array();
		super(app);
		for (var i in this.tiles) {
			this.renderTile(this.tiles[i]);
		}
	}

	public addTile(tile: DataTileDefinition) {
		this.tiles.push(tile);
		this.renderTile(tile);
	}

	private renderTile(tile: DataTileDefinition) {
		var tileElement = <HTMLElement>document.createElement("li");
		var data = document.createElement("span");
		data.innerHTML = tile.data;
		tileElement.appendChild(data);
		var label = document.createElement("label");
		label.innerHTML = tile.label;
		tileElement.appendChild(label);
		tileElement.addEventListener("click", tile.action);
		tileElement = <HTMLElement>this.element.appendChild(tileElement);

		tile.source().then((val: string) => {
			tileElement.getElementsByTagName("span")[0].innerHTML = val;
		});
	}
}