/**
 * GlobalProgressIndicator Component
 * This component is responsible for rendering the indeterminate progress bar
 * at the top of the page when work is happening.
 */
class GlobalProgressIndicator extends Component {
	private workItems: number; // Track how many work items are in the 'queue'.

	constructor(app: App) {
		this.componentId = "GlobalProgressIndicator";
		this.workItems = 0;
		super(app);
	}

	/**
	 * Push a 'work item' on to the progress bar queue.
	 * This will cause the progress bar to appear if there 
	 * is no existing work.
	 */
	public pushWork(): void {
		if (this.workItems < 0) {
			// Work items should never be below zero.
			this.workItems = 0;
		}
		if (this.workItems == 0) {
			// We are adding the first work item; show the bar
			this.element.classList.remove("closed");
		}
		this.workItems++;
	}

	/**
	 * Pop a 'work item' from the progress bar queue.
	 * This will cause the progress bar to retract if
	 * there is no remaining work.
	 */
	public popWork(): void {
		if (this.workItems == 1) {
			// We are popping the last work item; hide the bar
			this.element.classList.add("closed");
		}
		this.workItems--;
		if (this.workItems < 0) {
			// Work items should never be below zero.
			this.workItems = 0;
		}
	}
}