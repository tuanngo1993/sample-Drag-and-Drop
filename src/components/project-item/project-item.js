export class ProjectItem {
	constructor(id) {
		this.id = id;
		this.projectElement = document.getElementById(`${this.id}`);
	}

	removeInfoHandler(element) {
		this.projectElement.removeChild(element);
	}

	connectDrag() {
		this.projectElement.addEventListener("dragstart", e => {
			// Append a data to a draggable element
			e.dataTransfer.setData("text/plain", this.id);
			// Define what kind of D&D perform
			e.dataTransfer.effectAllowed = "move";
		});

		this.projectElement.addEventListener("dragend", e => {
			// Code to style dropped item or...
		});
	}

	tooltipRenderHandler() {
		const infoElement = document.createElement("div");
		infoElement.className = "card";
		infoElement.textContent = "Dummy text";

		infoElement.addEventListener(
			"click",
			this.removeInfoHandler.bind(this, infoElement)
		);

		const infoBtn = this.projectElement.querySelector(`button:first-of-type`);

		infoElement.style.position = "fixed";
		infoElement.style.top =
			infoBtn.offsetTop +
			infoBtn.offsetHeight -
			this.projectElement.parentNode.scrollTop +
			"px";
		infoElement.style.left = infoBtn.offsetLeft + "px";
		this.projectElement.insertAdjacentElement("beforeend", infoElement);
	}

	moreInfoHandler() {
		if (this.projectElement.querySelector(".card")) return;
		this.tooltipRenderHandler();
	}

	moreInfoButton() {
		const infoButton = this.projectElement.querySelector(
			`button:first-of-type`
		);
		infoButton.addEventListener("click", this.moreInfoHandler.bind(this));
	}

	switchHandler() {
		const projectListEl = this.projectElement.parentNode;
		const switchButton = this.projectElement.querySelector(`button:last-of-type`);
		const tooltip = this.projectElement.querySelector(".card");
		let projectList;
		// Check to detect a new parent of element and change text of button
		if (projectListEl.parentNode.id === "active-projects") {
			projectList = document.querySelector(`#finished-projects ul`);
			switchButton.textContent = "Activate";
		} else {
			projectList = document.querySelector(`#active-projects ul`);
			switchButton.textContent = "Finish";
		}
		// Addd element to a new parent
		projectList.appendChild(this.projectElement);
		// Remove tooltips of element
		tooltip?.parentNode.removeChild(tooltip);
	}

	switchButton() {
		const switchButton = this.projectElement.querySelector(`button:last-of-type`);
		this.projectElement.parentNode.onscroll = () => {
			const items = this.projectElement.parentNode.querySelectorAll("li");
			for (const item of items) {
				const tooltip = item.querySelector(".card");
				tooltip?.parentNode.removeChild(tooltip);
			}
		};
		switchButton.addEventListener("click", this.switchHandler.bind(this));
	}
}