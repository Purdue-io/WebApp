var Animator = (function () {
    function Animator(component) {
        this.component = component;
    }
    /**
    * Used to trigger animation events on a component.
    * event_name: a string that determines which animations are triggered.
    */
    Animator.prototype.animate = function (event_name) {
        var component_el = this.component.getElement();
        var animated_elements = component_el.getElementsByClassName("animated");
        var attr = "data-animate-" + event_name;
        for (var i = 0; i < animated_elements.length; i++) {
            var el = animated_elements.item(i);
            if (typeof el.attributes[attr] !== 'undefined') {
                el.classList.add(el.attributes[attr].value);
                (function (element, classname) {
                    setTimeout(function () {
                        element.classList.remove(classname);
                    }, 300);
                })(el, el.attributes[attr].value);
            }
        }

        // Is the component container itself animated?
        if (typeof component_el.attributes[attr] !== 'undefined') {
            component_el.classList.add(component_el.attributes[attr].value);
            (function (element, classname) {
                setTimeout(function () {
                    element.classList.remove(classname);
                }, 300);
            })(component_el, component_el.attributes[attr].value);
        }
    };
    return Animator;
})();
//# sourceMappingURL=Animator.js.map
