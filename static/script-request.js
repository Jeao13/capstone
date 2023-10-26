document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle the visibility of the containers
    function toggleContainer(reportsContainerId) {
        // Hide all containers
        document.querySelectorAll('#reports-container > div').forEach(function (container) {
            container.style.display = 'none';
        });
    
        // Show the selected container
        const selectedContainer = document.getElementById(reportsContainerId);
        if (selectedContainer) {
            selectedContainer.style.display = 'block';
        }
    }
    
    // Add click event listeners to navbar items
    document.querySelectorAll('.nav-item').forEach(function (navItem) {
        navItem.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = navItem.getAttribute('data-target');
            toggleContainer(targetId);
        });
    });
    
    // Initially show the "Pending" container
    toggleContainer('pending');

    
    
    });

// script.js
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var span = document.getElementById("closeModalBtn");

    btn.onclick = function () {
        var targetScrollPosition = modal.offsetTop;

        // Scroll the page downward to the modal
        window.scrollTo(0, targetScrollPosition);

        modal.style.display = "block";

        // Scroll the modal to the center of the viewport
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
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
            modal2.style.display = "none";
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
        if (event.target == modal3) {
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
function openModal5(reportText, reportFileLink, supportingDocumentLink) {
    var modal = document.getElementById('reportModal5');
    var reportContent = document.getElementById('reportContent5');

    // Construct the HTML content for the modal
    var modalContent = '<b>Reason of Rejection:</b><br>' + reportText + '<br><br>';

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
function closeModal5() {
    var modal = document.getElementById('reportModal5');

    // Hide the modal
    modal.style.display = 'none';
}

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

function openModal1(reportText, reportFileLink, supportingDocumentLink) {
    var modal = document.getElementById('reportModal1');
    var reportContent = document.getElementById('reportContent1');

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
function closeModal1() {
    var modal = document.getElementById('reportModal1');

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

$(document).ready(function() {
    // Attach a click event handler to the "My Sanctions" button
    $("#openModalBtn1").click(function() {
        // Make an AJAX request to fetch the user's sanctions data
        $.ajax({
            type: 'GET',
            url: '/fetch_sanctions',
            success: function(data) {
                // Assuming 'data' is an array of objects with 'date' and 'sanction' properties
                var table = '<table><thead><tr><th>Date</th><th>Sanction</th></tr></thead><tbody>';
                
                // Loop through the data and build the table rows
                for (var i = 0; i < data.length; i++) {
                    table += '<tr><td>' + data[i].date + '</td><td>' + data[i].sanction + '</td></tr>';
                }
                
                table += '</tbody></table>';
                
                // Insert the table into a div with the id 'sanctionsTable'
                $('#sanctionsTable').html(table);
            }
        });
    });
});

$(document).ready(function() {
    // When the "Notifications" bar is clicked
    $("#notifications-bar").click(function() {
        // Toggle the visibility of the notifications container
        $("#notifications-container").toggle();
    });
});

function confirmStatusChange(reportId) {
    var confirmation = confirm('Are you sure you want to change the status of report ' + reportId + '?');
    return confirmation;
}

 setTimeout(function () {
        document.getElementById('flash-message').style.display = 'none';
    }, 1000); // Hide the message after 3 seconds (adjust the time as needed)


function toggleInputFields() {
        var kindSelect = document.getElementById("kind");
        var formContainer = document.getElementById("formContainer");
        var formContainer1 = document.getElementById("formContainer1");
       
    
        if (kindSelect.value === "Formal Complaint") {
            formContainer.style.display = "block";
            formContainer1.style.display = "none";
          
        } else {
            formContainer.style.display = "none";
            formContainer1.style.display = "block";
         
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const searchForm = document.getElementById("searchForm");
        const searchInput = document.getElementById("searchInput");
        const tableRows = document.querySelectorAll("table tbody tr");
    
        // Add an event listener to the form submit
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission behavior
            const searchTerm = searchInput.value.toLowerCase().trim();
    
            // Loop through the table rows and check if they match the search term
            tableRows.forEach(function (row) {
                const rowText = row.textContent.toLowerCase();
                if (rowText.includes(searchTerm)) {
                    row.style.display = ""; // Show the row
                } else {
                    row.style.display = "none"; // Hide the row
                }
            });
        });
    });


    document.addEventListener('DOMContentLoaded', function () {

 
        function toggleContainer(containerId) {
            // Hide all containers
            document.querySelectorAll('#table-container > div').forEach(function (container) {
                container.style.display = 'none';
            });

            // Show the selected container
            const selectedContainer = document.getElementById(containerId);
            if (selectedContainer) {
                selectedContainer.style.display = 'block';
            }
        }

        // Add click event listeners to navbar items
        document.querySelectorAll('.nav-item').forEach(function (navItem) {
            navItem.addEventListener('click', function (event) {
                event.preventDefault();
                const targetId = navItem.getAttribute('data-target');
                toggleContainer(targetId);
            });
        });

        // Initially show the "Pending" container
        toggleContainer('pending');
    });


      function openModal1(id2) {
        const modal = document.getElementById('modalContainer9');
        modal.style.display = 'block';
        // Create a new button element
        const newButton = document.createElement('input');
        newButton.type = 'hidden';
        newButton.value = id2;
        newButton.id = 'id';
        newButton.name = 'id';

        const form = document.getElementById('statusChangeForm1');
        form.appendChild(newButton);

        
    
    }
    function closeModal11() {
        var modal = document.getElementById('modalContainer9');
    
        // Hide the modal
        modal.style.display = 'none';
    }
    
    
    
    function openModal2(id1) {
        const modal = document.getElementById('modalContainer');
        modal.style.display = 'block';
        // Create a new button element
        const newButton = document.createElement('input');
        newButton.type = 'hidden';
        newButton.value = id1;
        newButton.id = 'id';
        newButton.name = 'id';

        const form = document.getElementById('statusChangeForm2');
        form.appendChild(newButton);

        
    
    }
    function closeModal6() {
        var modal = document.getElementById('modalContainer');
    
        // Hide the modal
        modal.style.display = 'none';
    }

    function openModal3(id) {
        const modal = document.getElementById('modalContainer');
        modal.style.display = 'block';
        // Create a new button element
        const newButton = document.createElement('input');
        newButton.type = 'hidden';
        newButton.value = id;
        newButton.id = 'id';
        newButton.name = 'id';

        const form = document.getElementById('statusChangeForm');
        form.appendChild(newButton);

        
    
    }
    function closeModal7() {
        var modal = document.getElementById('modalContainer');
    
        // Hide the modal
        modal.style.display = 'none';
    }
    

    document.getElementById('statusChangeForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission behavior
    
        const reason = document.getElementById('remarks').value;
        const reportId = document.getElementById('reportIdInput').value; // Assuming you have an input field for reportId
    
        // Send an AJAX request to the server to save the reason in the database
        fetch('/save-reason', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reason, reportId }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server (e.g., show a success message)
            console.log(data);
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
    });

    function toggleReadonly(button) {
        var row = button.parentNode.parentNode;
        var inputElements = row.getElementsByTagName("input");
        var changebutton = document.getElementById("changebutton");

        
        for (var i = 0; i < inputElements.length; i++) {
            inputElements[i].readOnly = !inputElements[i].readOnly;
            if (!inputElements[i].readOnly) {
                inputElements[i].classList.add("editable"); 
                changebutton.disabled = false;// Add the 'editable' class when the field is editable
            } else {
                inputElements[i].classList.remove("editable"); 
                changebutton.disabled = true;// Remove the 'editable' class when the field is read-only
            }
        }
    }

    function updateRow(button) {


        var row = button.parentNode.parentNode;

        var coordId = row.querySelector("td[data-coord-id]").getAttribute("data-coord-id");
        var picId = row.querySelector("td[data-pic-id]").getAttribute("data-pic-id");
        console.log(row)
        var inputElements = row.getElementsByTagName("input");
        console.log(inputElements)
        
        var data = {};
        for (var i = 0; i < inputElements.length; i++) {
            var inputElement = inputElements[i];
            data[inputElement.name] = inputElement.value;
          
        }

        data["coordId"] = coordId;
        data["picId"] = picId;

        
       // Send data to the server for database update
       $.ajax({
        url: '/update-database',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function() {
            // Database update successful
            alert('Database updated successfully.');
        },
        error: function() {
            // Database update failed
            alert('Database update failed.');
        }
    });


    }


    function sortTable() {
        var table = document.getElementById("coordinator-table");
        var rows = table.rows;
        var sortedRows = Array.from(rows).slice(1); // Skip the header row
        sortedRows.sort((a, b) => {
            var aCoordId = parseInt(a.querySelector("[data-coord-id]").getAttribute("data-coord-id"));
            var bCoordId = parseInt(b.querySelector("[data-coord-id]").getAttribute("data-coord-id"));
            return aCoordId - bCoordId;
        });
        // Clear the existing rows in the table
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        // Append the sorted rows back to the table
        for (var i = 0; i < sortedRows.length; i++) {
            table.appendChild(sortedRows[i]);
        }
    }
    
    // Call the sortTable function to initially sort the table
    sortTable();