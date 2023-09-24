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

document.addEventListener("DOMContentLoaded", function () {
    // Existing code for "File Report" modal

    var modal3 = document.getElementById("myModal3"); // My Sanctions modal
    var btn3 = document.getElementById("openModalBtn3");
    var span3 = document.getElementById("closeModalBtn3");

    btn3.onclick = function () {
        modal3.style.display = "block";
    };

    span3.onclick = function () {
        modal3.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal2) {
            modal3.style.display = "none";
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

function openModal(reportText, reportFileLink, supportingDocumentLink) {
    var modal = document.getElementById('reportModal');
    var reportContent = document.getElementById('reportContent');

    // Construct the HTML content for the modal
    var modalContent = '<b>Report Text:</b><br>' + reportText + '<br><br>';

    if (reportFileLink) {
        modalContent += '<b>Attached Report File:</b><br>';
        modalContent += '<a href="' + reportFileLink + '" target="_blank">Download Report File</a><br>';
    }

    if (supportingDocumentLink) {
        modalContent += '<b>Attached Supporting Document:</b><br>';
        modalContent += '<a href="' + supportingDocumentLink + '" target="_blank">Download Supporting Document</a>';
    }

    // Set the modal content
    reportContent.innerHTML = modalContent;

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
          // Get references to elements in the "Tag Sanction" modal
          var modal2 = $("#myModal2");
          var btn2 = $("#openModalBtn2");
          var span2 = $("#closeModalBtn2");
          var searchForm = $("#searchForm");
          var studentName = $("#studentName");
          var studentCourse = $("#studentCourse");
          var studentSanctions = $("#studentSanctions"); // Add this line to reference the element for displaying sanctions
  
          btn2.on("click", function () {
              modal2.css("display", "block");
          });
  
          span2.on("click", function () {
              modal2.css("display", "none");
              // Clear the search form and student info when the modal is closed
              searchForm[0].reset();
              studentName.text("");
              studentCourse.text("");
              studentSanctions.text(""); // Clear the sanctions content
          });
  
          searchForm.on("submit", function (event) {
              event.preventDefault(); // Prevent the form from submitting
  
              // Get the username entered in the form
              var usernameInput = $("#username");
              var username = usernameInput.val();
  
              // Make an AJAX request to the server to fetch student information and sanctions
              $.ajax({
                  type: "POST",
                  url: "/lookup_student",
                  data: { username: username },
                  success: function (data) {
                      // Update the DOM elements with the student's name and course
                      studentName.text(data.Name);
                      studentCourse.text(data.CourseOrPosition);
                      
                      // Make another AJAX request to fetch sanctions
                      $.ajax({
                        type: "POST",
                        url: "/lookup_sanctions",
                        data: { username: username },
                        success: function (response) {
                            console.log("Sanctions data received:", response);
                            
                            // Initialize an empty HTML string to store the formatted sanctions
                            var formattedSanctions = "";
                            
                            // Loop through the list of sanctions and format each one
                            response.sanctions.forEach(function (sanction) {
                                // Convert the date_time string to a JavaScript Date object
                                var date = new Date(sanction.date_time);
                    
                                // Format the date in your desired way (adjust the format as needed)
                                var formattedDate = date.toLocaleString(); // Example format: "Month Day, Year Hour:Minute:Second"
                    
                                // Append the formatted sanction to the HTML string
                                formattedSanctions += '<p><strong>Date:</strong> ' + formattedDate + '</p>';
                                formattedSanctions += '<p><strong>Sanction:</strong> ' + sanction.sanction + '</p>';
                                formattedSanctions += '<hr>'; // Add a horizontal line to separate sanctions
                            });
                    
                            // Update the DOM element with the formatted sanctions
                            studentSanctions.html(formattedSanctions);
                        },
                        error: function (error) {
                            console.error("Error fetching sanctions:", error);
                        }
                    });
                  },
                  error: function (error) {
                      console.error("Error fetching student data:", error);
                  }
              });
          });
});

$(document).ready(function() {
    $('.js-example-basic-single').select2();
});
