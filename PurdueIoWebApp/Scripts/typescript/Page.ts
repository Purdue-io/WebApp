// This component base-class has a parent element it is inserted under.
// TODO: Pretty much all of it.
class Page extends Component {
	constructor(app: App, parentElement: HTMLElement) {
		
		super(app);
	}
	public show(): void {
		this.element = <HTMLElement>document.body.appendChild(this.element);
		this.animator.animate("in") // IN is the default event for showing.
	}
} 