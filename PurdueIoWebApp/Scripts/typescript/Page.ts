// This component base-class has a parent element it is inserted under.
// TODO: Pretty much all of it.
class Page extends Component {
	public pageTitle: string;

	constructor(app: App, args?: any) {
		this.parentElement = app.pageContainer;
		super(app);
	}
} 