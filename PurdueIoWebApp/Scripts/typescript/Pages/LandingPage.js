var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This page is responsible for delivering an overview/portal
* for a particular term. Term is passed in via the constructor.
*/
var LandingPage = (function (_super) {
    __extends(LandingPage, _super);
    function LandingPage(app, term) {
        var _this = this;
        // Set component ID, page title
        this.componentId = "LandingPage";
        this.term = term;
        this.pageTitle = term.Name;

        // Initialize page
        _super.call(this, app);

        // Prepare the tiles!
        this.tiles = new DataTiles(this.getApp());
        this.tiles.parentElement = this.element;

        // Subject count tile
        this.tiles.addTile({
            label: "Subjects", data: "...", source: function () {
                return new Promise(function (resolve, reject) {
                    _this.getApp().dataSource.fetchTermSubjectCount(_this.term).then(function (result) {
                        resolve(result.toString());
                    });
                });
            }
        });

        // Course count tile
        this.tiles.addTile({
            label: "Courses", data: "...", source: function () {
                return new Promise(function (resolve, reject) {
                    _this.getApp().dataSource.fetchTermCourseCount(_this.term).then(function (result) {
                        resolve(parseFloat((result / 1000).toString()).toFixed(1) + "k"); // Format the number to '4.2k'
                    });
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
