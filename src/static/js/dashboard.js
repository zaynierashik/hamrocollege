document.addEventListener("DOMContentLoaded", () => {
	// Always enforce light mode
	document.documentElement.classList.remove("dark");
	localStorage.removeItem("theme");

	const sidebarModeToggle = document.getElementById("sidebarModeToggle");
	const sidebarModeToggleIcon = document.getElementById("sidebarModeToggleIcon");

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

	function updateSidebarToggleIcon() {
		const isIconOnly = document.body.classList.contains("admin-sidebar-icon-only");
		sidebarModeToggleIcon.className = "bx bx-sidebar text-xl";
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