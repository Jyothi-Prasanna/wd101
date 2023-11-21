document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const dataTableBody = document.querySelector('#dataTable tbody');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked;

        if (validateDob(dob) && termsAccepted) {
            addRowToTable(name, email, password, dob, termsAccepted);
            saveDataToLocalStorage();
            registrationForm.reset();
        } else {
            alert('Please enter a valid Date of Birth and accept the terms.');
        }
    });

    function validateDob(dob) {
        // Add your logic to validate date of birth (between 18 and 55 years old)
        // Return true if valid, false otherwise
        return true;
    }

    function addRowToTable(name, email, password, dob, termsAccepted) {
        const newRow = dataTableBody.insertRow();
        const cells = [
            newRow.insertCell(0),
            newRow.insertCell(1),
            newRow.insertCell(2),
            newRow.insertCell(3),
            newRow.insertCell(4)
        ];

        cells[0].textContent = name;
        cells[1].textContent = email;
        cells[2].textContent = password;
        cells[3].textContent = dob;
        cells[4].textContent = termsAccepted ? 'Yes' : 'No';
    }

    function saveDataToLocalStorage() {
        // Add your logic to save data to local storage
    }
});
