// script.js
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var span = document.getElementById("closeModalBtn");

    btn.onclick = function () {
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});

document.addEventListener("DOMContentLoaded", function () {
    // Existing code for "File Report" modal

    var modal1 = document.getElementById("myModal1"); // My Sanctions modal
    var btn1 = document.getElementById("openModalBtn1");
    var span1 = document.getElementById("closeModalBtn1");

    btn1.onclick = function () {
        modal1.style.display = "block";
    };

    span1.onclick = function () {
        modal1.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal1) {
            modal1.style.display = "none";
        }
    };
});

document.addEventListener("DOMContentLoaded", function () {
    // Existing code for "File Report" modal

    var modal2 = document.getElementById("myModal2"); // My Sanctions modal
    var btn2 = document.getElementById("openModalBtn2");
    var span2 = document.getElementById("closeModalBtn2");

    btn2.onclick = function () {
        modal2.style.display = "block";
    };

    span2.onclick = function () {
        modal2.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal2) {
            modal1.style.display = "none";
        }
    };
});


function showSuccessMessage() {
    // Get the success message element
    var successMessage = document.getElementById("report-success-message");

    // Check if the message element is present on the page
    if (successMessage) {
        // Check if a report was successfully submitted (you can set this condition based on your requirements)
        var reportSubmitted = true; // Set this to true when a report is successfully submitted

        if (reportSubmitted) {
            // Display the success message
            successMessage.style.display = "block";
        }
    }
}

// Call the function when the page loads (you can also call it when a report is successfully submitted)
window.onload = function() {
    showSuccessMessage();
};

function openModal(reportText) {
    var modal = document.getElementById('reportModal');
    var reportContent = document.getElementById('reportContent');

    // Display the report content in the modal
    reportContent.innerHTML = reportText;

    // Show the modal
    modal.style.display = 'block';
}

// JavaScript function to close the modal
function closeModal() {
    var modal = document.getElementById('reportModal');

    // Hide the modal
    modal.style.display = 'none';
}


// Add an event listener for the search button in the "Tag Sanction" modal
document.addEventListener("DOMContentLoaded", function () {
    // Existing code for other modals

    // Get references to elements in the "Tag Sanction" modal
    var modal2 = document.getElementById("myModal2");
    var btn2 = document.getElementById("openModalBtn2");
    var span2 = document.getElementById("closeModalBtn2");
    var searchForm = document.getElementById("searchForm");
    var studentName = document.getElementById("studentName");
    var studentCourse = document.getElementById("studentCourse");

    btn2.onclick = function () {
        modal2.style.display = "block";
    };

    span2.onclick = function () {
        modal2.style.display = "none";
        // Clear the search form and student info when the modal is closed
        searchForm.reset();
        studentName.textContent = "";
        studentCourse.textContent = "";
    };

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the username entered in the form
        var usernameInput = document.getElementById("username");
        var username = usernameInput.value;

        // Make an AJAX request to the server to fetch student information
        $.ajax({
            type: 'POST',
            url: '/lookup_student',
            data: { username: username },
            success: function (data) {
                // Update the DOM elements with the student's name and course
                $('#studentName').text(data.Name);
                $('#studentCourse').text(data.CourseOrPosition);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });
});

$(document).ready(function() {
    $('.js-example-basic-single').select2();
});