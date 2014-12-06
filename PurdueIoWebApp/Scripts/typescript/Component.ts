/**
 * The Component class is a super-class of all components.
 * It provides default implementations for things like showing, hiding, and animating.
 * More specific behaviors are to be implemented by each individual component.
 */
class Component {
	private app: App;
	public componentId: string;
	public element: HTMLElement;
	public parentElement: HTMLElement;
	public animator: Animator;

	constructor(app: App) {
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
		this.element = <HTMLDivElement> document.getElementById("component_" + this.componentId).cloneNode(true);
		this.element.classList.remove("COMPONENT");
		this.element.id = '';
		this.animator = new Animator(this);
	}

	public getApp(): App {
		return this.app;
	}

	public getElement(): HTMLElement {
		return this.element;
	}

	public show(): void {
		this.element = <HTMLElement>this.parentElement.appendChild(this.element);
		this.animator.animate("in") // IN is the default event for showing.
	}

	public hide(): void {
		this.animator.animate("out") // OUT is the default event for showing.
		// We have 300ms to animate out before we're taken off the DOM Tree.
		setTimeout(() => {
			this.element = <HTMLElement>this.parentElement.removeChild(this.element);
		}, 300);
	}

	public windowResize(): void {

	}
}