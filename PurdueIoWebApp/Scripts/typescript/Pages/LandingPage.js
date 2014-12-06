var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LandingPage = (function (_super) {
    __extends(LandingPage, _super);
    function LandingPage(app) {
        this.componentId = "LandingPage";
        this.pageTitle = "Welcome";
        _super.call(this, app);

        // Prepare the tiles!
        this.tiles = new DataTiles(this.getApp());
        this.tiles.parentElement = this.element;
        this.tiles.addTile({
            label: "Test tile", data: "...", source: function () {
                return new Promise(function (resolve, reject) {
                    resolve("10");
                });
            }
        });
    }
    LandingPage.prototype.show = function () {
        _super.prototype.show.call(this);
        this.tiles.show();
    };
    return LandingPage;
})(Page);
//# sourceMappingURL=LandingPage.js.map
