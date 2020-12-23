/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_list_project_list_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-list/project-list.js */ "./src/components/project-list/project-list.js");


class App {
	static init() {
		new _components_project_list_project_list_js__WEBPACK_IMPORTED_MODULE_0__.ProjectList("active");
		new _components_project_list_project_list_js__WEBPACK_IMPORTED_MODULE_0__.ProjectList("finished");
	}
}

App.init();


/***/ }),

/***/ "./src/components/project-item/project-item.js":
/*!*****************************************************!*\
  !*** ./src/components/project-item/project-item.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => /* binding */ ProjectItem
/* harmony export */ });
class ProjectItem {
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

/***/ }),

/***/ "./src/components/project-list/project-list.js":
/*!*****************************************************!*\
  !*** ./src/components/project-list/project-list.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => /* binding */ ProjectList
/* harmony export */ });
/* harmony import */ var _project_item_project_item_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../project-item/project-item.js */ "./src/components/project-item/project-item.js");


class ProjectList {
	constructor(type) {
		this.type = type;
		const projectItems = document.querySelectorAll(`#${this.type}-projects li`);
		for (const item of projectItems) {
			const temp = new _project_item_project_item_js__WEBPACK_IMPORTED_MODULE_0__.ProjectItem(item.id);
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=app.js.map