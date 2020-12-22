import { ProjectItem } from "../project-item/project-item.js";

export class ProjectList {
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

		// Should have this dragover event to call method preventDefault
		list.addEventListener("dragover", (e) => {
			// Check if the draggable element exists
			if (e.dataTransfer.types[0] === "text/plain") {
				e.preventDefault();
			}
			list.parentElement.classList.add("droppable");
		});

		list.addEventListener("dragleave", (e) => {
			// Check to remove droppable class when draggable moving to a new parent only
			if (
				e.relatedTarget.closest &&
				e.relatedTarget.closest(`#${this.type}-projects ul`) !== list
			) {
				list.parentElement.classList.remove("droppable");
			}
		});

		list.addEventListener("drop", (e) => {
			e.preventDefault();
			const projectId = e.dataTransfer.getData("text/plain");
			let projectList = e.target
				.closest(`#${this.type}-projects ul`)
				.querySelectorAll("li");
			// Prevent from dropping right inside a current parent
			for (const item of projectList) {
				if (item.id === projectId) {
					list.parentElement.classList.remove("droppable");
					return;
				}
			}
			// Trigger button event instead of creating a new function
			document
				.getElementById(projectId)
				.querySelector("button:last-of-type")
				.click();

			list.parentElement.classList.remove("droppable");
		});
	}
}
