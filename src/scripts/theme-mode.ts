document?.addEventListener("DOMContentLoaded", () => {
	const html = document?.documentElement;
	const themeToggleBtn = document?.querySelector("#theme-toggle-btn");

	if (themeToggleBtn) {
		themeToggleBtn?.addEventListener("click", () => {
			toggleTheme();
			loadTheme();
		});

		// toggle theme
		const toggleTheme = () => {
			const currentTheme = html.getAttribute("data-theme");
			const theme = currentTheme === "dark" ? "light" : "dark";

			html.setAttribute("data-theme", theme);
			localStorage.setItem("theme", theme);
		};

		// load theme
		const loadTheme = () => {
			const savedTheme = localStorage.getItem("theme");
			const preferLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;
			const theme = savedTheme || (preferLightMode ? "light" : "dark");
			html.setAttribute("data-theme", theme);
			themeToggleBtn.innerHTML = `<iconify-icon icon="${theme === "dark" ? "tabler:sun-filled" : "tabler:moon-filled"}" width="30" height="30"></iconify-icon>`;
		};

		loadTheme();
	}
});
