var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DataTiles = (function (_super) {
    __extends(DataTiles, _super);
    function DataTiles(app) {
        this.componentId = "DataTiles";
        this.tiles = new Array();
        _super.call(this, app);
        for (var i in this.tiles) {
            this.renderTile(this.tiles[i]);
        }
    }
    DataTiles.prototype.addTile = function (tile) {
        this.tiles.push(tile);
        this.renderTile(tile);
    };

    DataTiles.prototype.renderTile = function (tile) {
        var tileElement = document.createElement("li");
        var data = document.createElement("span");
        data.innerHTML = tile.data;
        tileElement.appendChild(data);
        var label = document.createElement("label");
        label.innerText = tile.label;
        tileElement.appendChild(label);

        tileElement = this.element.appendChild(tileElement);

        tile.source().then(function (val) {
            tileElement.getElementsByTagName("span")[0].innerHTML = val;
        });
    };
    return DataTiles;
})(Component);
//# sourceMappingURL=DataTiles.js.map
