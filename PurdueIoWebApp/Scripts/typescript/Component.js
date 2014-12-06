/**
* The Component class is a super-class of all components.
* It provides default implementations for things like showing, hiding, and animating.
* More specific behaviors are to be implemented by each individual component.
*/
var Component = (function () {
    function Component(app) {
        // Make sure we're associated with an application instance...
        if (app != null) {
            this.app = app;
        } else {
            this.app = App.instance; // Default instance if undefined
        }

        // Set default parent if none is set ...
        if (typeof this.parentElement === 'undefined') {
            this.parentElement = document.body;
        }

        // Get the component ID, grab the HTML
        this.element = document.getElementById("component_" + this.componentId).cloneNode(true);
        this.element.classList.remove("COMPONENT");
        this.element.id = '';
        this.animator = new Animator(this);
    }
    Component.prototype.getApp = function () {
        return this.app;
    };

    Component.prototype.getElement = function () {
        return this.element;
    };

    Component.prototype.show = function () {
        this.element = this.parentElement.appendChild(this.element);
        this.animator.animate("in");
    };

    Component.prototype.hide = function () {
        var _this = this;
        this.animator.animate("out");

        // We have 300ms to animate out before we're taken off the DOM Tree.
        setTimeout(function () {
            _this.element = _this.parentElement.removeChild(_this.element);
        }, 300);
    };

    Component.prototype.windowResize = function () {
    };
    return Component;
})();
//# sourceMappingURL=Component.js.map
