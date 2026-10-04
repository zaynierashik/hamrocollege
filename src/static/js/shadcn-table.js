/**
 * ShadcnTable - A lightweight, vanilla Javascript component that converts 
 * standard HTML tables into Shadcn-style interactive tables.
 * Performs client-side sorting, pagination, and global filtering.
 */
class ShadcnTable {
    constructor(options = {}) {
        this.tableSelector = options.tableSelector;
        this.table = document.querySelector(this.tableSelector);
        if (!this.table) {
            console.warn(`ShadcnTable: Table element matching "${this.tableSelector}" not found.`);
            return;
        }

        this.pageSize = options.pageSize || 10;
        this.currentPage = 1;
        this.searchPlaceholder = options.searchPlaceholder || "Search...";
        this.searchQuery = "";
        
        // Sorting state
        this.sortColumnIndex = options.defaultSortIndex !== undefined ? options.defaultSortIndex : -1;
        this.sortDirection = options.defaultSortDirection || 'asc'; // 'asc' or 'desc'

        this.init();
    }

    init() {
        // Wrap table in a scrollable container for responsiveness if it isn't already
        const parent = this.table.parentElement;
        if (!parent.classList.contains('overflow-x-auto')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'w-full overflow-x-auto';
            parent.insertBefore(wrapper, this.table);
            wrapper.appendChild(this.table);
        }

        // Add standard Shadcn class to table container
        const tableContainer = this.table.closest('.border');
        if (tableContainer) {
            tableContainer.className = 'border border-slate-200 rounded-lg overflow-hidden relative bg-white shadow-xs';
        }

        // Style the table element itself
        this.table.className = 'w-full text-left text-sm';
        
        // Style headers and set up click events
        this.headers = Array.from(this.table.querySelectorAll('thead th'));
        this.tbody = this.table.querySelector('tbody');
        this.rows = Array.from(this.tbody.querySelectorAll('tr:not(.empty-row)'));
        this.originalRows = [...this.rows]; // Keep copy of original order

        this.setupHeaders();
        this.createControls();
        this.updateTable();
    }

    setupHeaders() {
        this.headers.forEach((th, index) => {
            // Check if column is sortable (default: all except actions/buttons)
            const isActionCol = th.textContent.toLowerCase().includes('edit') || 
                                th.textContent.toLowerCase().includes('delete') || 
                                th.textContent.toLowerCase().includes('action') ||
                                th.textContent.toLowerCase().includes('view');

            if (isActionCol || th.dataset.sortable === 'false') {
                th.className = 'py-3 px-4 bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider';
                return;
            }

            th.style.cursor = 'pointer';
            th.className = 'py-3 px-4 bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider select-none hover:bg-slate-100 hover:text-slate-900 transition-colors';
            
            // Render text with chevron placeholder
            const textContent = th.innerHTML.trim();
            th.innerHTML = `
                <div class="flex items-center gap-1">
                    <span>${textContent}</span>
                    <span class="sort-icon text-slate-400 text-sm">
                        ${index === this.sortColumnIndex 
                            ? (this.sortDirection === 'asc' ? '<i class="bx bx-chevron-up text-slate-900 font-bold"></i>' : '<i class="bx bx-chevron-down text-slate-900 font-bold"></i>')
                            : '<i class="bx bx-chevrons-up-down opacity-50"></i>'}
                    </span>
                </div>
            `;

            th.addEventListener('click', () => this.handleHeaderClick(index));
        });
    }

    handleHeaderClick(index) {
        if (this.sortColumnIndex === index) {
            // Toggle direction
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            // Switch to new column
            this.sortColumnIndex = index;
            this.sortDirection = 'asc';
        }

        // Update header icon UI
        this.headers.forEach((th, idx) => {
            const sortIcon = th.querySelector('.sort-icon');
            if (sortIcon) {
                if (idx === this.sortColumnIndex) {
                    sortIcon.innerHTML = this.sortDirection === 'asc' 
                        ? '<i class="bx bx-chevron-up text-slate-900 font-bold"></i>' 
                        : '<i class="bx bx-chevron-down text-slate-900 font-bold"></i>';
                } else {
                    sortIcon.innerHTML = '<i class="bx bx-chevrons-up-down opacity-50"></i>';
                }
            }
        });

        this.sortRows();
        this.currentPage = 1;
        this.updateTable();
    }

    sortRows() {
        if (this.sortColumnIndex === -1) {
            this.rows = [...this.originalRows];
            return;
        }

        this.rows.sort((a, b) => {
            let valA = this.getCellValue(a, this.sortColumnIndex);
            let valB = this.getCellValue(b, this.sortColumnIndex);

            // Numeric check
            const numA = parseFloat(valA.replace(/[^\d.-]/g, ''));
            const numB = parseFloat(valB.replace(/[^\d.-]/g, ''));

            if (!isNaN(numA) && !isNaN(numB) && 
                valA.trim().match(/^-?\d+([,.]\d+)?%?$/) && 
                valB.trim().match(/^-?\d+([,.]\d+)?%?$/)) {
                return this.sortDirection === 'asc' ? numA - numB : numB - numA;
            }

            // String sort
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();

            if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        // Re-append rows in sorted order in the DOM (preserves DOM states & event listeners)
        this.rows.forEach(row => this.tbody.appendChild(row));
    }

    getCellValue(row, index) {
        const cell = row.children[index];
        if (!cell) return "";
        // Check for specific data sorting attribute, otherwise fallback to cell text
        if (cell.dataset.sortValue !== undefined) {
            return cell.dataset.sortValue;
        }
        return cell.innerText || cell.textContent || "";
    }

    createControls() {
        const tableContainer = this.table.closest('.border').parentElement;
        
        // --- 1. Top Controls Bar ---
        const topBar = document.createElement('div');
        topBar.className = 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4';

        // Search Input
        const searchWrapper = document.createElement('div');
        searchWrapper.className = 'relative w-full max-w-sm';
        
        const searchIcon = document.createElement('i');
        searchIcon.className = 'bx bx-search text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 text-base';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = this.searchPlaceholder;
        searchInput.className = 'w-full rounded-md border border-slate-200 pl-9 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent bg-white transition-all';
        searchInput.value = this.searchQuery;
        
        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors hidden';
        clearBtn.innerHTML = '<i class="bx bx-x text-base"></i>';

        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase().trim();
            if (this.searchQuery.length > 0) {
                clearBtn.classList.remove('hidden');
            } else {
                clearBtn.classList.add('hidden');
            }
            this.currentPage = 1;
            this.updateTable();
        });

        clearBtn.addEventListener('click', () => {
            searchInput.value = "";
            this.searchQuery = "";
            clearBtn.classList.add('hidden');
            this.currentPage = 1;
            this.updateTable();
            searchInput.focus();
        });

        searchWrapper.appendChild(searchIcon);
        searchWrapper.appendChild(searchInput);
        searchWrapper.appendChild(clearBtn);

        // Page Size Selector
        const sizeWrapper = document.createElement('div');
        sizeWrapper.className = 'flex items-center gap-2 text-sm text-slate-500 justify-end';
        sizeWrapper.innerHTML = `<span>Rows per page</span>`;
        
        const sizeSelect = document.createElement('select');
        sizeSelect.className = 'rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-950 cursor-pointer';
        [5, 10, 20, 50].forEach(size => {
            const opt = document.createElement('option');
            opt.value = size;
            opt.textContent = size;
            if (size === this.pageSize) opt.selected = true;
            sizeSelect.appendChild(opt);
        });

        sizeSelect.addEventListener('change', (e) => {
            this.pageSize = parseInt(e.target.value);
            this.currentPage = 1;
            this.updateTable();
        });

        sizeWrapper.appendChild(sizeSelect);
        
        topBar.appendChild(searchWrapper);
        topBar.appendChild(sizeWrapper);

        // Insert Top Controls before the table border wrapper
        const tableBorder = this.table.closest('.border');
        tableContainer.insertBefore(topBar, tableBorder);

        // --- 2. Bottom Pagination Bar ---
        const bottomBar = document.createElement('div');
        bottomBar.className = 'flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-1 text-sm text-slate-500';
        
        this.statusText = document.createElement('div');
        this.statusText.className = 'flex-1 text-slate-500 text-sm';
        
        const navContainer = document.createElement('div');
        navContainer.className = 'flex items-center gap-1.5';

        // Prev Buttons
        this.btnFirst = this.createPageButton('<i class="bx bx-chevrons-left"></i>', () => this.goToPage(1));
        this.btnPrev = this.createPageButton('<i class="bx bx-chevron-left"></i>', () => this.goToPage(this.currentPage - 1));
        
        // Page buttons placeholder
        this.pageButtonsContainer = document.createElement('div');
        this.pageButtonsContainer.className = 'flex items-center gap-1';

        // Next Buttons
        this.btnNext = this.createPageButton('<i class="bx bx-chevron-right"></i>', () => this.goToPage(this.currentPage + 1));
        this.btnLast = this.createPageButton('<i class="bx bx-chevrons-right"></i>', () => this.goToPage(this.totalPages));

        navContainer.appendChild(this.btnFirst);
        navContainer.appendChild(this.btnPrev);
        navContainer.appendChild(this.pageButtonsContainer);
        navContainer.appendChild(this.btnNext);
        navContainer.appendChild(this.btnLast);

        bottomBar.appendChild(this.statusText);
        bottomBar.appendChild(navContainer);

        // Append Bottom Bar after the table border wrapper
        tableContainer.appendChild(bottomBar);
    }

    createPageButton(html, onClick) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'flex items-center justify-center w-8 h-8 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150';
        btn.innerHTML = html;
        btn.addEventListener('click', onClick);
        return btn;
    }

    goToPage(page) {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
        this.updateTable();
    }

    updateTable() {
        // 1. Filtering based on query
        let filteredRows = this.rows;
        if (this.searchQuery) {
            filteredRows = this.rows.filter(row => {
                const text = Array.from(row.children)
                    .map(cell => (cell.innerText || cell.textContent || "").toLowerCase())
                    .join(" ");
                return text.includes(this.searchQuery);
            });
        }

        // Show/Hide "No results found" row
        let emptyRow = this.tbody.querySelector('.empty-row');
        if (filteredRows.length === 0) {
            if (!emptyRow) {
                emptyRow = document.createElement('tr');
                emptyRow.className = 'empty-row';
                emptyRow.innerHTML = `
                    <td colspan="${this.headers.length}" class="text-center py-10 text-slate-400 bg-white">
                        <i class="bx bx-search text-3xl mb-2 block"></i>
                        No matching records found
                    </td>
                `;
                this.tbody.appendChild(emptyRow);
            } else {
                emptyRow.style.display = '';
            }
        } else {
            if (emptyRow) {
                emptyRow.style.display = 'none';
            }
        }

        // 2. Pagination Calculations
        const totalItems = filteredRows.length;
        this.totalPages = Math.max(1, Math.ceil(totalItems / this.pageSize));
        
        // Bound current page
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        }

        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = Math.min(startIndex + this.pageSize, totalItems);

        // 3. Update Row Visibility
        this.rows.forEach(row => {
            row.style.display = 'none'; // hide by default
        });

        filteredRows.forEach((row, index) => {
            if (index >= startIndex && index < endIndex) {
                row.style.display = ''; // show paginated rows
            }
        });

        // 4. Update Controls State
        this.btnFirst.disabled = this.currentPage === 1;
        this.btnPrev.disabled = this.currentPage === 1;
        this.btnNext.disabled = this.currentPage === this.totalPages;
        this.btnLast.disabled = this.currentPage === this.totalPages;

        // 5. Update Status Text
        if (totalItems === 0) {
            this.statusText.textContent = "Showing 0 to 0 of 0 entries";
        } else {
            this.statusText.innerHTML = `Showing <span class="font-medium text-slate-900">${startIndex + 1}</span> to <span class="font-medium text-slate-900">${endIndex}</span> of <span class="font-medium text-slate-900">${totalItems}</span> entries`;
        }

        // 6. Update Page Numbers Control
        this.updatePageButtons();
    }

    updatePageButtons() {
        this.pageButtonsContainer.innerHTML = '';
        
        const maxVisibleButtons = 5;
        let startPage = Math.max(1, this.currentPage - 2);
        let endPage = Math.min(this.totalPages, startPage + maxVisibleButtons - 1);
        
        if (endPage - startPage + 1 < maxVisibleButtons) {
            startPage = Math.max(1, endPage - maxVisibleButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `w-8 h-8 rounded-md text-sm font-medium border flex items-center justify-center transition-colors duration-150 ${
                i === this.currentPage 
                    ? 'bg-slate-900 border-slate-900 text-white cursor-default' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100'
            }`;
            btn.textContent = i;
            if (i !== this.currentPage) {
                btn.addEventListener('click', () => this.goToPage(i));
            }
            this.pageButtonsContainer.appendChild(btn);
        }
    }
}
window.ShadcnTable = ShadcnTable;
