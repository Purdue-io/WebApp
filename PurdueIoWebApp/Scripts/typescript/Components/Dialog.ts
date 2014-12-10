class DialogAction {
	public text: string;
	public action: () => void;
}

/**
 * The dialog component is used to provide modal dialogs with
 * content and a series of actions represented as options.
 */
class Dialog extends Component {
	public title: string;
	public content: string;
	public actions: Array<DialogAction>;

	constructor(app: App, title: string, content: string, actions?: Array<DialogAction>) {
		// Set local variables
		this.title = title;
		this.content = content;
		this.actions = actions;
		this.componentId = "Dialog";

		// Construct component
		super(app);

		// Initialize dialog
		(<HTMLElement>this.element.querySelector("header")).innerHTML = title;
		(<HTMLElement>this.element.querySelector("div.content")).innerHTML = content;

		// Populate actions
		var actionsElement = this.element.querySelector("ul.actions");
		if (typeof actions !== 'undefined') {
			for (var i in actions) {
				var action = actions[i];
				// Create link...
				var actionLink = document.createElement("a");
				actionLink.innerHTML = action.text;
				actionLink.addEventListener("click", action.action);
				// Put link in list item
				var actionItem = document.createElement("li");
				actionItem.appendChild(actionLink);
				// Add list item to dialog actions element
				actionsElement.appendChild(actionItem);
			}
		} else {
			// If there are no actions specified, add a close action
			// Create link...
			var actionLink = document.createElement("a");
			actionLink.innerHTML = "Close";
			actionLink.addEventListener("click", () => { this.hide(); });
			// Put link in list item
			var actionItem = document.createElement("li");
			actionItem.appendChild(actionLink);
			// Add list item to dialog actions element
			actionsElement.appendChild(actionItem);
		}
	}

	public setTitle(newTitle: string) {
		this.title = newTitle;
		(<HTMLElement>this.element.querySelector("header")).innerHTML = newTitle;
	}

	public setContent(newContent: string) {
		this.content = newContent;
		(<HTMLElement>this.element.querySelector("div.content")).innerHTML = newContent;
	}

	public setContentDom(newContent: HTMLElement) {
		(<HTMLElement>this.element.querySelector("div.content")).innerHTML = '';
		(<HTMLElement>this.element.querySelector("div.content")).appendChild(newContent);
	}
}