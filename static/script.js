// script.js
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var span = document.getElementById("closeModalBtn");
    const textarea = document.getElementById("provision");
    const charCount = document.getElementById("char-count");
    const textarea1 = document.getElementById("narrate");
    const charCount1 = document.getElementById("char-count1");
    const textarea2 = document.getElementById("final");
    const charCount2 = document.getElementById("char-count2");
    const textarea3 = document.getElementById("incident");
    const charCount3 = document.getElementById("char-count3");
    const textarea4 = document.getElementById("remarks");
    const charCount4 = document.getElementById("char-count4");

    textarea.addEventListener("input", function() {
        const remainingChars = 250 - textarea.value.length;
        charCount.textContent = remainingChars + " characters remaining";
        
        if (remainingChars < 0) {
          textarea.value = textarea.value.slice(0, 250);
          charCount.textContent = "0 characters remaining";
        }
      });

      textarea1.addEventListener("input", function() {
        const remainingChars = 250 - textarea1.value.length;
        charCount1.textContent = remainingChars + " characters remaining";
        
        if (remainingChars < 0) {
          textarea1.value = textarea1.value.slice(0, 250);
          charCount1.textContent = "0 characters remaining";
        }
      });

      textarea2.addEventListener("input", function() {
        const remainingChars = 250 - textarea2.value.length;
        charCount2.textContent = remainingChars + " characters remaining";
        
        if (remainingChars < 0) {
          textarea2.value = textarea2.value.slice(0, 250);
          charCount2.textContent = "0 characters remaining";
        }
      });

      textarea3.addEventListener("input", function() {
        const remainingChars = 250 - textarea3.value.length;
        charCount3.textContent = remainingChars + " characters remaining";
        
        if (remainingChars < 0) {
          textarea3.value = textarea1.value.slice(0, 250);
          charCount3.textContent = "0 characters remaining";
        }
      });

      textarea4.addEventListener("input", function() {
        const remainingChars = 250 - textarea4.value.length;
        charCount4.textContent = remainingChars + " characters remaining";
        
        if (remainingChars < 0) {
          textarea4.value = textarea4.value.slice(0, 250);
          charCount4.textContent = "0 characters remaining";
        }
      });

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
        location.reload()
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


// Add an event listener for the search button in the "Tag Sanction" modal
document.addEventListener("DOMContentLoaded", function () {
    // Get references to elements in the "Tag Sanction" modal
    var modal6 = $("#myModal6");
    var btn6 = $("#openModalBtn6");
    var span6 = $("#closeModalBtn6");
  // Add this line to reference the element for displaying sanctions

    btn6.on("click", function () {
        modal6.css("display", "block");
    });

    span6.on("click", function () {
        modal6.css("display", "none");
        // Clear the search form and student info when the modal is closed
      
    });

});

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
                    
                                if (Array.isArray(response.sanctions) && response.sanctions.length > 0) {
                                    // Loop through the array of sanctions
                                    response.sanctions.forEach(function (sanction) {
                                        // Convert the date_time string to a JavaScript Date object
                                        var date = new Date(sanction.date_time);
                                
                                        // Format the date in your desired way (adjust the format as needed)
                                        var formattedDate = date.toLocaleString(); // Example format: "Month Day, Year Hour:Minute:Second"
                                
                                        // Create a delete button with a unique ID based on the sanction ID
                                        var deleteButtonId = "delete-sanction-" + sanction.sanctions_id;
                                        formattedSanctions += '<hr>';
                                        formattedSanctions += '<p><strong>Date:</strong> ' + sanction.sanctions_id + '</p>';
                                        formattedSanctions += '<p><strong>Date:</strong> ' + formattedDate + '</p>';
                                        formattedSanctions += '<p><strong>Sanction:</strong> ' + sanction.sanction + '</p>';
                                        formattedSanctions += '<button class="delete-sanction" id="' + deleteButtonId + '">Delete</button>';
                                        formattedSanctions += '<hr>'; // Add a horizontal line to separate sanctions
                                    });
                                } else {
                                    // Handle the case when there are no sanctions
                                    formattedSanctions += '<p>No sanctions</p>';
                                }
                                
                                // Update the DOM element with the formatted sanctions
                                studentSanctions.html(formattedSanctions);
                                
                           
                    
                            // Now, you need to attach a click event to the delete buttons
                            $(".delete-sanction").click(function () {
                                var buttonId = $(this).attr("id");
                                var sanctionId = buttonId.replace("delete-sanction-", "");
                                console.log(sanctionId); // Extract the sanction ID from the button ID
                    
                                // Make an AJAX request to delete the selected sanction (use the sanctionId)
                                $.ajax({
                                    type: "POST",
                                    url: "/delete_sanction",
                                    data: { sanctionId: sanctionId },
                                    success: function (response) {
                                        // Remove the sanction from the UI
                                        // You can choose to remove the entire .sanction div or just hide it
                                        // For example:
                                        $(this).closest(".sanction").remove();
                                        $("#searchForm").submit();
                                    },
                                    error: function (error) {
                                        console.error("Error deleting sanction:", error);
                                    }
                                });
                            });
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

    function toggleInputFields1() {
        var kindSelect = document.getElementById("forms");
        var formContainer2 = document.getElementById("formContainer2");
        var formContainer3 = document.getElementById("formContainer3");
        var formContainer4 = document.getElementById("formContainer4");
       
    
        if (kindSelect.value === "Temporary Gate Pass") {
            formContainer2.style.display = "block";
            formContainer3.style.display = "none";
            formContainer4.style.display = "none";
          
        } 
        
        else if (kindSelect.value === "Request for Non-Wearing of Uniform"){
            formContainer2.style.display = "none";
            formContainer3.style.display = "block";
            formContainer4.style.display = "none";
        }
        
        else {
            formContainer2.style.display = "none";
            formContainer3.style.display = "none";
            formContainer4.style.display = "block";
         
        }
    }

    function toggleInputFields2() {
        var kindSelect = document.getElementById("forms1");
        var formContainer5 = document.getElementById("formContainer5");
        var formContainer6 = document.getElementById("formContainer6");
        var formContainer7 = document.getElementById("formContainer7");
       
    
        if (kindSelect.value === "Written Warning") {
            formContainer5.style.display = "block";
            formContainer6.style.display = "none";
            formContainer7.style.display = "none";
          
        } 
        
        else if (kindSelect.value === "Written Reprimand"){
            formContainer5.style.display = "none";
            formContainer6.style.display = "block";
            formContainer7.style.display = "none";
        }
        
        else {
            formContainer5.style.display = "none";
            formContainer6.style.display = "none";
            formContainer7.style.display = "block";
         
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

$(document).ready(function() {
    // When the page is loaded, check the initial state of the checkbox
    toggleSpecifyTextarea();

    // Attach a change event handler to the checkbox
    $("#specify").change(function() {
        toggleSpecifyTextarea();
    });

    function toggleSpecifyTextarea() {
        // Check if the checkbox is checked
        if ($("#specify").is(":checked")) {
            // If checked, show the text area
            $("#specifyTextarea").show();
        } else {
            // If not checked, hide the text area and clear its value
            $("#specifyTextarea").hide().val("");
        }
    }
});

$(document).ready(function() {
    // When the page is loaded, check the initial state of the checkbox
    toggleSpecifyTextarea1();

    // Attach a change event handler to the checkbox
    $("#specify1").change(function() {
        toggleSpecifyTextarea1();
    });

    function toggleSpecifyTextarea1() {
        // Check if the checkbox is checked
        if ($("#specify1").is(":checked")) {
            // If checked, show the text area
            $("#specifyTextarea1").show();
        } else {
            // If not checked, hide the text area and clear its value
            $("#specifyTextarea1").hide().val("");
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const openModalLinks = document.querySelectorAll('.open-modal-link');
   
    openModalLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
         
            // Call the preview_report_file function with the report ID
            previewReportFile();
        });
    });
    
    // Function to call the preview_report_file function with the report ID
    function previewReportFile() {
        // Construct the URL for the report with the specific report ID
        // Show the modal
        const modal = document.getElementById('Viewform');
        modal.style.display = 'block';
    }
});

// JavaScript to open the modal when the link is clicked
document.addEventListener('DOMContentLoaded', function () {
    const openModalLinks = document.querySelectorAll('.open-modal-link1');
   
  
    openModalLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const modal = document.getElementById(targetId);
        modal.style.display = 'block';
      });
    });
  });
  
  function submitForm(reportId) {
   // Set the reportId value to the hidden input field
   document.getElementById("reportId_").value = reportId;

    // Add a unique query parameter to the iframe src
    var iframe = document.getElementById("modalObject");
    var iframeSrc = iframe.getAttribute("data");
    var separator = iframeSrc.includes("?") ? "&" : "?";
    iframe.src = iframeSrc + separator + "timestamp=" + new Date().getTime();
    
   // Submit the form
   document.getElementById("myForm_").submit();
}

function clearIdreportSession()  {
    // Clear the 'Idreport' session value
    fetch('/clear_Idreport', {
        method: 'POST'
    })
    .then(response => {
        if (response.status === 204) {
            console.log('Idreport session cleared.');
        } else {
            console.error('Failed to clear Idreport session.');
        }
    })
    .catch(error => {
        console.error('An error occurred while clearing Idreport session:', error);
    });
}


function closeviewModal() {


    var modal = document.getElementById('Viewform');

    // Hide the modal
    modal.style.display = 'none';
     // Add a delay before the first reload
     setTimeout(function() {
        location.reload();

        // Add a delay before the second reload
        setTimeout(function() {
            location.reload();
        }, 100); // 2 seconds
    }, 100); // 2 seconds
    
}




function closeviewModal1() {
    var modal = document.getElementById('Viewsupport');

    // Hide the modal
    modal.style.display = 'none';
}

function loadModalContent() {
    // Make an AJAX request to get the new content
    fetch('/load_modal_content', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        // Update the modal content with the new data
        const modalContent = document.getElementById('modal-content1');
        modalContent.innerHTML = data.content;

        // Display the modal
        const modal = document.getElementById('Viewform');
        modal.style.display = 'block';
    })
    .catch(error => {
        console.error('Failed to load modal content:', error);
    });
}

// JavaScript function to make an AJAX request
function getAlgorithmResult(complaintText) {

    // Show the loading screen
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "block";
    // Make an AJAX request to the 'algorithm' endpoint
    $.ajax({
        type: "POST",  // Use POST or GET based on your endpoint
        url: "/algorithm/" + encodeURIComponent(complaintText), // Pass the complaint text as a parameter
        success: function (response) {
            // Handle the response here, e.g., display it in a modal
            loadingScreen.style.display = "none";
            openAlgorithmModal(response,complaintText);
        },
        error: function (error) {
            // Handle errors, if any
            console.error("Error:", error);
        }
    });
}

function openAlgorithmModal(result,complain) {
    // Display the result in a modal or any other way you prefer
    const modal = document.getElementById("myModal21");
    const offenseList = modal.querySelector("#offense-list");
    var reportContent1 = modal.querySelector('#reportContent1');

    // Clear previous content
    offenseList.innerHTML = '';

    var modalContent = '';

    console.log(complain)
    
 
    modalContent += '<b>Report Text:</b><br>' + complain + '<br><br>';



    if (result && result.top_10_offense_scores) {
        result.top_10_offense_scores.forEach(offense => {
            // Create a list item for each offense and score
            const listItem = document.createElement('li');
            listItem.textContent = 'Offense ID: ' + offense.offense_id + ', Score: ' + offense.score + '%';

            // Add the list item to the offense list
            offenseList.appendChild(listItem);
        });
    }

    reportContent1.innerHTML = modalContent;

    modal.style.display = "block";

    
}
function closeAlgoModal() {
    var modal = document.getElementById('myModal21');

    // Hide the modal
    modal.style.display = 'none';
}

$(document).ready(function () {
    // Get references to the modal and button
    var modal6 = $("#myModal6");
    var openModalBtn6 = $("#openModalBtn6");

    // Add a click event listener to the button
    openModalBtn6.on("click", function () {
        modal6.css("display", "block");
    });
    closeModalBtn6.on("click", function () {
        modal6.css("display", "none");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the canvas element
    var ctx = document.getElementById("myPieChart").getContext("2d");

    $.ajax({
        type: "POST",
        url: "/count",
        success: function (data) {
            // Create the data for the pie chart based on the response
            var chartData = {
                labels: ["Reports", "Request"],
                datasets: [
                    {
                        data: [data.Reports, data.Request], // Values for each segment
                        backgroundColor: ["#FF5733", "#33FF57"], // Colors for each segment
                    },
                ],  
            };

            // Create the pie chart
            var myPieChart = new Chart(ctx, {
                type: "pie",
                data: chartData,
            });
        },
        error: function (error) {
            console.error("Error fetching student data:", error);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {


                $.ajax({
                    type: "POST",
                    url: "/check",
                    success: function (data) {
                        var dataFound = data.Reports; // Set to true if data is found, otherwise set to false.
                        console.log(dataFound);
            
                        if (dataFound == "true") {
                            // Data is found, open the modal
                            var autoOpenModal = document.getElementById("autoOpenModal");
            
                            // Close the modal when the close button is clicked
                                autoOpenModal.style.display = "none";
            
                            // You can also add other actions here when the modal is displayed.
                        }
                        else{
                             // Data is found, open the modal
                             var autoOpenModal = document.getElementById("autoOpenModal");
                             autoOpenModal.style.display = "block";
             
                             // Close the modal when the close button is clicked
                             var closeAutoOpenModalBtn = document.getElementById("closeAutoOpenModalBtn");
                             closeAutoOpenModalBtn.onclick = function () {
                                 autoOpenModal.style.display = "none";
                             };

                        }
                    },
                    error: function (error) {
                        console.error("Error fetching student data:", error);
                    }
                });

    

});