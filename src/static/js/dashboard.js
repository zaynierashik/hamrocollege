// Toggle themes

document.addEventListener("DOMContentLoaded", () => {
	const themeToggle = document.getElementById("theme-toggle");
	const moonIcon = document.getElementById("moon-icon");
	const sunIcon = document.getElementById("sun-icon");
	const sidebarModeToggle = document.getElementById("sidebarModeToggle");
	const sidebarModeToggleIcon = document.getElementById("sidebarModeToggleIcon");

	const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const currentTheme = localStorage.getItem("theme") || (prefersDarkMode ? "dark" : "light");

	if (currentTheme === "dark") {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}

	if (themeToggle && moonIcon && sunIcon) {
		updateIcons();

		themeToggle.addEventListener("click", () => {
			const isDarkMode = document.documentElement.classList.toggle("dark");
			localStorage.setItem("theme", isDarkMode ? "dark" : "light");

			updateIcons();
		});
	}

	if (sidebarModeToggle && sidebarModeToggleIcon) {
		const sidebarMode = localStorage.getItem("adminSidebarMode") || "full";
		if (sidebarMode === "icon") {
			document.body.classList.add("admin-sidebar-icon-only");
		}
		updateSidebarToggleIcon();

		sidebarModeToggle.addEventListener("click", () => {
			const isIconOnly = document.body.classList.toggle("admin-sidebar-icon-only");
			localStorage.setItem("adminSidebarMode", isIconOnly ? "icon" : "full");
			updateSidebarToggleIcon();
		});
	}

	function updateIcons() {
		const isDarkMode = document.documentElement.classList.contains("dark");
		if (isDarkMode) {
			moonIcon.classList.remove("hidden");
			sunIcon.classList.add("hidden");
		} else {
			moonIcon.classList.add("hidden");
			sunIcon.classList.remove("hidden");
		}
	}

	function updateSidebarToggleIcon() {
		const isIconOnly = document.body.classList.contains("admin-sidebar-icon-only");
		sidebarModeToggleIcon.className = isIconOnly
			? "ti ti-layout-sidebar-left-expand text-lg"
			: "ti ti-layout-sidebar-left-collapse text-lg";
	}
});

// Toggle dropdown
function toggleDropdown(menuId, iconId) {
	const dropdown = document.getElementById(menuId);
	const icon = document.getElementById(iconId);

	if (dropdown.classList.contains('max-h-0')) {
		dropdown.classList.remove('max-h-0');
		dropdown.classList.add('max-h-[500px]');
		icon.classList.add('rotate-180');
	} else {
		dropdown.classList.add('max-h-0');
		dropdown.classList.remove('max-h-[500px]');
		icon.classList.remove('rotate-180');
	}
}