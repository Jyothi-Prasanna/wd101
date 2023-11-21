document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#entriesTable tbody');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        if (!isValidDateOfBirth(dob)) {
            alert('Please enter a valid date of birth between 18 and 55 years.');
            return;
        }

        const entry = { name, email, password, dob, terms };

        addEntry(entry);
        saveToLocalStorage();

        this.reset();
    });

    function isValidDateOfBirth(dob) {
        const currentDate = new Date();
        const inputDate = new Date(dob);
        const age = currentDate.getFullYear() - inputDate.getFullYear();
        const monthDiff = currentDate.getMonth() - inputDate.getMonth();

        return age > 18 && age < 55 && (monthDiff > 0 || (monthDiff === 0 && currentDate.getDate() >= inputDate.getDate()));
    }

    function addEntry(entry) {
        const row = tableBody.insertRow();
        for (const key in entry) {
            if (entry.hasOwnProperty(key)) {
                const cell = row.insertCell();
                cell.textContent = entry[key];
            }
        }
    }

    function saveToLocalStorage() {
        const entries = Array.from(tableBody.rows).map(row => {
            const entry = {};
            for (let i = 0; i < row.cells.length; i++) {
                entry[tableBody.rows[0].cells[i].textContent.toLowerCase()] = row.cells[i].textContent;
            }
            return entry;
        });

        localStorage.setItem('entries', JSON.stringify(entries));
    }

    function loadFromLocalStorage() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];

        entries.forEach(entry => addEntry(entry));
    }

    loadFromLocalStorage();
});
