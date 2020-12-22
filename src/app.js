import { ProjectList } from "./components/project-list/project-list.js";

class App {
	static init() {
		new ProjectList("active");
		new ProjectList("finished");
	}
}

App.init();
