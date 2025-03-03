// Website Scripts

// Mobile view
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.lg\\:hidden button');
    const mobileMenu = document.querySelector('.lg\\:hidden[role="dialog"]');
    const closeButton = mobileMenu.querySelector('button');

    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
    }

    menuButton.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', toggleMenu);
});

// Scroll to section
function scrollToSection(sectionId){
    var section = document.getElementById(sectionId);
    if(section){
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Toggle foreign university field
function toggleForeignUniversityField() {
    const affiliationSelect = document.getElementById('affiliation');
    const foreignUniversityField = document.getElementById('foreign-university-field');
    const selectedAffiliation = affiliationSelect.value;
    
    if (selectedAffiliation === 'foreign') {
        foreignUniversityField.classList.remove('hidden');
    } else {
        foreignUniversityField.classList.add('hidden');
    }
}

function filterInstitutions() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const institutionCards = document.querySelectorAll(".institution-card");

    institutionCards.forEach(card => {
        const institutionName = card.querySelector("h6.font-medium").textContent.toLowerCase();
        if (institutionName.includes(searchInput)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

document.getElementById("provinceFilter").addEventListener("change", function() {
    let selectedProvince = this.value;
    let institutions = document.querySelectorAll(".institution-card");

    institutions.forEach(institution => {
        let institutionProvince = institution.getAttribute("data-province");

        if (selectedProvince === "" || institutionProvince === selectedProvince) {
            institution.style.display = "block";
        } else {
            institution.style.display = "none";
        }
    });
});

// Call this function initially to check the current value and show/hide the field
document.addEventListener('DOMContentLoaded', function () {
    toggleForeignUniversityField();
});

// Show selected file name
function showFileName() {
    const fileInput = document.getElementById('file-upload');
    const fileNameElement = document.getElementById('file-name');

    if (fileInput.files.length > 0) {
        fileNameElement.textContent = `${fileInput.files[0].name}`;
    } else {
        fileNameElement.textContent = '';
    }
}

// Error toast
window.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('toast');
    if (toast) {
        setTimeout(() => {
            toast.style.transition = "opacity 0.5s ease";
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
});

// Back to top
window.addEventListener('scroll', function() {
    const button = document.getElementById('back-to-top');
    if (window.scrollY > 1600) { // Change the value to show back-to-top button from certain px
        button.classList.remove('hidden');
        button.classList.add('show');
    } else {
        button.classList.remove('show');
        button.classList.add('hidden');
    }
});

document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});