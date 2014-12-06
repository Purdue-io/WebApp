class Animator {
	private component: Component;
	constructor(component: Component) {
		this.component = component;
	}

	/**
	 * Used to trigger animation events on a component.
	 * event_name: a string that determines which animations are triggered.
	 */
	public animate(event_name: string) {
		var component_el = this.component.getElement();
		var animated_elements: NodeList = component_el.getElementsByClassName("animated");
		var attr: string = "data-animate-" + event_name;
		for (var i = 0; i < animated_elements.length; i++) {
			var el = animated_elements.item(i);
			if (typeof el.attributes[attr] !== 'undefined') {
				(<HTMLElement>el).classList.add(el.attributes[attr].value);
				(function (element: HTMLElement, classname) {
					setTimeout(function () { element.classList.remove(classname); }, 300);
				})(<HTMLElement>el, el.attributes[attr].value);
			}
		}
		// Is the component container itself animated?
		if (typeof component_el.attributes[attr] !== 'undefined') {
			(<HTMLElement>component_el).classList.add(component_el.attributes[attr].value);
			(function (element: HTMLElement, classname) {
				setTimeout(function () { element.classList.remove(classname); }, 300);
			})(<HTMLElement>component_el, component_el.attributes[attr].value);
		}
	}
} 