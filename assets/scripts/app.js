class ProjectItem {
	constructor(id) {
		this.id = id;
		this.projectElement = document.getElementById(`${this.id}`);
	}

	removeInfoHandler(element) {
		this.projectElement.removeChild(element);
	}

	connectDrag() {
		this.projectElement.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("text/plain", this.id);
			e.dataTransfer.effectAllowed = "move";
		});

		this.projectElement.addEventListener("dragend", (e) => {
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
		let projectList;
		if (projectListEl.parentNode.id === "active-projects") {
			projectList = document.querySelector(`#finished-projects ul`);
		} else {
			projectList = document.querySelector(`#active-projects ul`);
		}
		projectList.appendChild(this.projectElement);
		const tooltip = this.projectElement.querySelector(".card");
		tooltip?.parentNode.removeChild(tooltip);
	}

	switchButton() {
		const switchButton = this.projectElement.querySelector(
			`button:last-of-type`
		);
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

class ProjectList {
	constructor(type) {
		this.type = type;
		const projectItems = document.querySelectorAll(`#${this.type}-projects li`);
		for (const item of projectItems) {
			const temp = new ProjectItem(item.id);
			temp.switchButton();
			temp.moreInfoButton();
			temp.connectDrag();
		}
		this.connectDroppable();
	}

	connectDroppable() {
		const list = document.querySelector(`#${this.type}-projects ul`);

		list.addEventListener("dragenter", (e) => {
			if (e.dataTransfer.types[0] === "text/plain") {
				e.preventDefault();
			}
			list.parentElement.classList.add("droppable");
		});

		list.addEventListener("dragover", (e) => {
			if (e.dataTransfer.types[0] === "text/plain") {
				e.preventDefault();
			}
		});

		list.addEventListener("dragleave", (e) => {
			if (e.relatedTarget.closest && e.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
				list.parentElement.classList.remove("droppable");
			}
		});

		list.addEventListener("drop", (e) => {
			event.preventDefault();
			const projectId = e.dataTransfer.getData("text/plain");
			document
				.getElementById(projectId)
				.querySelector("button:last-of-type")
				.click();

			list.parentElement.classList.remove("droppable");
		});
	}
}

class App {
	static init() {
		new ProjectList("active");
		new ProjectList("finished");
	}
}

App.init();
