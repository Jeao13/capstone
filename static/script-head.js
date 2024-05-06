function toggleInputTables1() {
  var kindSelect = document.getElementById("departmentx");
  var tablecontainer = document.getElementById("cics-table");
  var tablecontainer1 = document.getElementById("cit-table");
  var tablecontainer2 = document.getElementById("cafad-table");
  var tablecontainer3 = document.getElementById("coe-table");

  if (kindSelect.value === "CICS") {
    tablecontainer.style.display = "block";
    tablecontainer1.style.display = "none";
    tablecontainer2.style.display = "none";
    tablecontainer3.style.display = "none";
  } else if (kindSelect.value === "CIT") {
    tablecontainer.style.display = "none";
    tablecontainer1.style.display = "block";
    tablecontainer2.style.display = "none";
    tablecontainer3.style.display = "none";
  } else if (kindSelect.value === "CAFAD" || kindSelect.value === "") {
    // Display "CAFAD" table by default if value is "CAFAD" or not set
    tablecontainer.style.display = "none";
    tablecontainer1.style.display = "none";
    tablecontainer2.style.display = "block";
    tablecontainer3.style.display = "none";
  } else {
    tablecontainer.style.display = "none";
    tablecontainer1.style.display = "none";
    tablecontainer2.style.display = "none";
    tablecontainer3.style.display = "block";
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", toggleInputTables1);

function disableScroll() {
  // Get the current scroll position
  var scrollX = window.scrollX || window.pageXOffset;
  var scrollY = window.scrollY || window.pageYOffset;

  // Save the current scroll position
  window.onscroll = function () {
    window.scrollTo(scrollX, scrollY);
  };
}

// Enable scrolling
function enableScroll() {
  window.onscroll = null;
}

function w3_open() {
  document.getElementById("main").style.marginLeft = "10%";
  document.getElementById("mySidebar").style.width = "15%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = "none";
}
function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}

document.addEventListener("DOMContentLoaded", function () {
  function toggleContainer(containerId) {
    document
      .querySelectorAll("#table-container > div")
      .forEach(function (container) {
        container.style.display = "none";
      });

    // Show the selected container
    const selectedContainer = document.getElementById(containerId);
    if (selectedContainer) {
      selectedContainer.style.display = "block";
    }
  }

  // Add click event listeners to navbar items
  document
    .querySelectorAll(".modern-sleek-nav-item")
    .forEach(function (navItem) {
      navItem.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = navItem.getAttribute("data-target");
        toggleContainer(targetId);
        console.log("try");
      });
    });

  // Initially show the "Pending" container
  toggleContainer("pending");
});

document.addEventListener("DOMContentLoaded", function () {
  var minor_input = document.getElementById("sanctionsInputminor");
  var major_input = document.getElementById("sanctionsInputmajor");

  document.getElementById("minor").addEventListener("click", function () {
    console.log("minor");
    document.getElementById("sanctionsInputminor").style.display = "block";
    minor_input.required = true;
    document.getElementById("sanctionsInputmajor").style.display = "none";
    major_input.value = "";
    major_input.required = false;
  });

  document.getElementById("major").addEventListener("click", function () {
    console.log("major");
    document.getElementById("sanctionsInputmajor").style.display = "block";
    minor_input.required = false;
    document.getElementById("sanctionsInputminor").style.display = "none";
    minor_input.value = "";
    major_input.required = true;
  });

  var minor_input1 = document.getElementById("sanctionsInputminor1");
  var major_input1 = document.getElementById("sanctionsInputmajor1");

  document.getElementById("minor1").addEventListener("click", function () {
    document.getElementById("sanctionsInputminor1").style.display = "block";
    minor_input1.required = true;
    document.getElementById("sanctionsInputmajor1").style.display = "none";
    major_input1.value = "";
    major_input1.required = false;
  });

  document.getElementById("major1").addEventListener("click", function () {
    document.getElementById("sanctionsInputmajor1").style.display = "block";
    minor_input1.required = false;
    document.getElementById("sanctionsInputminor1").style.display = "none";
    minor_input1.value = "";
    major_input1.required = true;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButtonx");
  const searchInput = document.getElementById("searchInput");

  searchButton.addEventListener("click", function () {
    console.log("wow");
    const searchTerm = searchInput.value.toLowerCase().trim();
    const tableContainer = document.getElementById("table-containers");
    const table = tableContainer.querySelector("table");
    const tableBody = table.querySelector("tbody");
    const tableRows = tableBody.querySelectorAll("tr");

    tableRows.forEach(function (row) {
      const rowText = row.textContent.toLowerCase();
      if (rowText.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchButton1 = document.getElementById("searchButton1");
  const searchInput1 = document.getElementById("searchInput1");

  searchButton1.addEventListener("click", function () {
    console.log("wow");
    const searchTerm = searchInput1.value.toLowerCase().trim();
    const tableContainer = document.getElementById("cics-table");
    const table = tableContainer.querySelector("table");
    const tableRows = table.querySelectorAll("tbody tr");

    tableRows.forEach(function (row) {
      const rowText = row.textContent.toLowerCase();
      if (rowText.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  const searchButton2 = document.getElementById("searchButton2");
  const searchInput2 = document.getElementById("searchInput2");

  searchButton2.addEventListener("click", function () {
    const searchTerm = searchInput2.value.toLowerCase().trim();
    const tableContainer = document.getElementById("cit-table");
    const table = tableContainer.querySelector("table");
    const tableRows = table.querySelectorAll("tbody tr");

    tableRows.forEach(function (row) {
      const rowText = row.textContent.toLowerCase();
      if (rowText.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  const searchButton3 = document.getElementById("searchButton3");
  const searchInput3 = document.getElementById("searchInput3");

  searchButton3.addEventListener("click", function () {
    const searchTerm = searchInput3.value.toLowerCase().trim();
    const tableContainer = document.getElementById("cafad-table");
    const table = tableContainer.querySelector("table");
    const tableRows = table.querySelectorAll("tbody tr");

    tableRows.forEach(function (row) {
      const rowText = row.textContent.toLowerCase();
      if (rowText.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  const searchButton4 = document.getElementById("searchButton4");
  const searchInput4 = document.getElementById("searchInput4");

  searchButton4.addEventListener("click", function () {
    const searchTerm = searchInput4.value.toLowerCase().trim();
    const tableContainer = document.getElementById("coe-table");
    const table = tableContainer.querySelector("table");
    const tableRows = table.querySelectorAll("tbody tr");

    tableRows.forEach(function (row) {
      const rowText = row.textContent.toLowerCase();
      if (rowText.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const departmentSelect = document.getElementById("department1");
  const tableBody = document.querySelector("table tbody");
  const rows = tableBody.querySelectorAll("tr");

  departmentSelect.addEventListener("change", function () {
    console.log("wow");
    const selectedDepartment = departmentSelect.value;

    // Loop through the table rows and hide/show based on department
    rows.forEach(function (row) {
      const departmentColumn = row.querySelector("td:nth-child(4)"); // Adjust the index based on your table structure
      const department = departmentColumn.textContent.trim();

      if (selectedDepartment === "All" || department === selectedDepartment) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var ctx2 = document.getElementById("chart2").getContext("2d");

  $.ajax({
    type: "POST",
    url: "/count1",
    success: function (data) {
      console.log(data.Reports);
      // Create the data for the pie chart based on the response
      var chartData = {
        labels: [
          "Total Number of Complaints",
          "Total Pending of Complaints",
          "Total On-Going of Complaints",
          "Total Rejected of Complaints",
          "Total Resolved of Complaints",
        ],
        datasets: [
          {
            data: [
              data.Reports,
              data.Pending,
              data.Ongoing,
              data.Rejected,
              data.CaseClosed,
            ], // Values for each segment
            backgroundColor: [
              "#FF5733",
              "#33FF57",
              "#FF5733",
              "#33FF57",
              "#33FF57",
            ], // Colors for each segment
          },
        ],
      };

      // Create the pie chart
      var myPieChart = new Chart(ctx2, {
        type: "pie",
        data: chartData,
      });
    },
    error: function (error) {
      console.error("Error fetching student data:", error);
    },
  });

  // Add a delay of 2 seconds (2000 milliseconds) before running the next section
  setTimeout(function () {
    // Second section of code
    var ctx3 = document.getElementById("chart3").getContext("2d");

    $.ajax({
      type: "POST",
      url: "/countrequest1",
      success: function (data) {
        console.log(data.Reports);
        // Create the data for the pie chart based on the response
        var chartData = {
          labels: [
            "Total Number of Request",
            "Total Pending of Request",
            "Total On-Going of Request",
            "Total Rejected of Request",
            "Total Resolved of Request",
          ],
          datasets: [
            {
              data: [
                data.Reports,
                data.Pending,
                data.Ongoing,
                data.Rejected,
                data.CaseClosed,
              ],
              backgroundColor: [
                "#FF5733",
                "#33FF57",
                "#FF5733",
                "#33FF57",
                "#33FF57",
              ],
            },
          ],
        };

        // Create the pie chart
        var myPieChart = new Chart(ctx3, {
          type: "pie",
          data: chartData,
        });
      },
      error: function (error) {
        console.error("Error fetching student data:", error);
      },
    });
  }, 500);
});

function openModal1(id2) {
  const modal = document.getElementById("modalContainer9");
  modal.style.display = "block";
  // Create a new button element
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id2;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeForm0");
  form.appendChild(newButton);
}
function closeModal11() {
  var modal = document.getElementById("modalContainer9");

  // Hide the modal
  modal.style.display = "none";
}

function openModal6() {
  const modal = document.getElementById("reportModal6");
  modal.style.display = "block";
}
function closeModal12() {
  var modal = document.getElementById("reportModal6");

  // Hide the modal
  modal.style.display = "none";
}

function openModal7(id) {
  console.log(id);
  const modal = document.getElementById("modalContainer10");
  modal.style.display = "block";
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeForm1");
  form.appendChild(newButton);
}
function closeModal13() {
  var modal = document.getElementById("modalContainer10");
  const input = document.getElementById("complainant");
  const form = document.getElementById("statusChangeForm1");

  var newButton = document.getElementById("id");
  if (newButton) {
    // Add a delay of 1000 milliseconds (1 second)
    setTimeout(function () {
      // Remove the newButton from the form
      form.removeChild(newButton);

      // Clear the input value
      input.value = "";
    }, 1000);
  }

  // Hide the modal
  modal.style.display = "none";
}

function openModal8(id) {
  const modal = document.getElementById("modalContainer11");
  console.log(id);

  modal.style.display = "block";
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeForm3");
  form.appendChild(newButton);
}
function closeModal14() {
  var modal = document.getElementById("modalContainer11");
  const input = document.getElementById("complainant2");
  const form = document.getElementById("statusChangeForm3");

  var newButton = document.getElementById("id");

  var newButton = document.getElementById("id");
  if (newButton) {
    // Add a delay of 1000 milliseconds (1 second)
    setTimeout(function () {
      // Remove the newButton from the form
      form.removeChild(newButton);
      input.value = "";
    }, 1000);
  }

  // Hide the modal
  modal.style.display = "none";
}

function openModal9(id) {
  const modal = document.getElementById("modalContainer12");
  console.log(id);

  modal.style.display = "block";
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeForm4");
  form.appendChild(newButton);
}
function closeModal15() {
  var modal = document.getElementById("modalContainer12");
  const input = document.getElementById("complainant1");
  const form = document.getElementById("statusChangeForm4");

  var newButton = document.getElementById("id");
  if (newButton) {
    // Add a delay of 1000 milliseconds (1 second)
    setTimeout(function () {
      // Remove the newButton from the form
      form.removeChild(newButton);
      input.value = "";

      // Clear the input value
    }, 1000);
  }

  // Hide the modal
  modal.style.display = "none";
}

function openModal10(id) {
  const modal = document.getElementById("modalContainer13");
  console.log(id);

  modal.style.display = "block";
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeForm5");
  form.appendChild(newButton);
}
function closeModal16() {
  var modal = document.getElementById("modalContainer13");
  const input = document.getElementById("complainant3");
  const form = document.getElementById("statusChangeForm5");

  var newButton = document.getElementById("id");
  if (newButton) {
    // Add a delay of 1000 milliseconds (1 second)
    setTimeout(function () {
      // Remove the newButton from the form
      form.removeChild(newButton);

      // Clear the input value
      input.value = "";
    }, 1000);
  }

  // Hide the modal
  modal.style.display = "none";
}

function openModal2(id1) {
  const modal = document.getElementById("modalContainer0");
  modal.style.display = "block";
  // Create a new button element
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id1;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeForm00");
  form.appendChild(newButton);
}
function closeModalx() {
  console.log("wow");
  var modal = document.getElementById("modalContainer0");
  modal.style.display = "none";
}

function openModal3(id) {
  const modal = document.getElementById("modalContainer");
  modal.style.display = "block";
  // Create a new button element
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeForm");
  form.appendChild(newButton);
}
function closeModal7() {
  var modal = document.getElementById("modalContainer");

  // Hide the modal
  modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll(".sidebar a");
  const tabContents = document.querySelectorAll(".tab-content");

  // Add event listeners to the tab links
  tabLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);

      // Remove "active" class from all tab content elements
      tabContents.forEach((content) => {
        content.classList.remove("active");
      });

      // Add "active" class to the selected tab content element
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Automatically show the first tab (Tab 1) on page load
  document.getElementById("tab1").classList.add("active");
});

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

  textarea.addEventListener("input", function () {
    const remainingChars = 250 - textarea.value.length;
    charCount.textContent = remainingChars + " characters remaining";

    if (remainingChars < 0) {
      textarea.value = textarea.value.slice(0, 250);
      charCount.textContent = "0 characters remaining";
    }
  });

  textarea1.addEventListener("input", function () {
    const remainingChars = 250 - textarea1.value.length;
    charCount1.textContent = remainingChars + " characters remaining";

    if (remainingChars < 0) {
      textarea1.value = textarea1.value.slice(0, 250);
      charCount1.textContent = "0 characters remaining";
    }
  });

  textarea2.addEventListener("input", function () {
    const remainingChars = 250 - textarea2.value.length;
    charCount2.textContent = remainingChars + " characters remaining";

    if (remainingChars < 0) {
      textarea2.value = textarea2.value.slice(0, 250);
      charCount2.textContent = "0 characters remaining";
    }
  });

  textarea3.addEventListener("input", function () {
    const remainingChars = 250 - textarea3.value.length;
    charCount3.textContent = remainingChars + " characters remaining";

    if (remainingChars < 0) {
      textarea3.value = textarea1.value.slice(0, 250);
      charCount3.textContent = "0 characters remaining";
    }
  });

  textarea4.addEventListener("input", function () {
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
    location.reload();
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
window.onload = function () {
  showSuccessMessage();
};

function openModal(reportText, reportFileLink, supportingDocumentLink) {
  var modal = document.getElementById("reportModal");
  var reportContent = document.getElementById("reportContent");

  // Construct the HTML content for the modal
  var modalContent = "<b>Report Text:</b><br>" + reportText + "<br><br>";

  if (reportFileLink) {
    modalContent += "<b>Attached Report File:</b><br>";
    modalContent +=
      '<a href="' +
      reportFileLink +
      '" target="_blank">Download Report File</a><br>';
  }

  if (supportingDocumentLink) {
    modalContent += "<b>Attached Supporting Document:</b><br>";
    modalContent +=
      '<a href="' +
      supportingDocumentLink +
      '" target="_blank">Download Supporting Document</a>';
  }

  // Set the modal content
  reportContent.innerHTML = modalContent;

  // Show the modal
  modal.style.display = "block";
}

// Add an event listener for the search button in the "Tag Sanction" modal
document.addEventListener("DOMContentLoaded", function () {
  // Get references to elements in the "Tag Sanction" modal
  var modal2 = $("#myModal2");
  var btn2 = $("#openModalBtn2");
  var span2 = $("#closeModalBtn2");
  var searchForm = $("#searchSrCode");
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

            if (
              Array.isArray(response.sanctions) &&
              response.sanctions.length > 0
            ) {
              response.sanctions.sort(function (a, b) {
                return new Date(b.date_time) - new Date(a.date_time);
              });
              // Loop through the array of sanctions
              response.sanctions.forEach(function (sanction) {
                // Convert the date_time string to a JavaScript Date object
                var date = new Date(sanction.date_time);

                // Format the date in your desired way (adjust the format as needed)
                var formattedDate = date.toLocaleString(); // Example format: "Month Day, Year Hour:Minute:Second"

                var sanitizedSanctionsId = encodeURIComponent(
                  sanction.sanctions_id
                );

                console.log(sanitizedSanctionsId);

                // Create a delete button with a unique ID based on the sanction ID

                formattedSanctions += "<hr>";
                formattedSanctions +=
                  "<p><strong>Sanction Id:</strong> " +
                  sanction.sanctions_id +
                  "</p>";
                formattedSanctions +=
                  "<p><strong>Date and Time:</strong> " +
                  formattedDate +
                  "</p>";
                formattedSanctions +=
                  "<p><strong>Sanction:</strong> " + sanction.sanction + "</p>";
                formattedSanctions +=
                  '<p><strong>File:</strong> <a style="text-decoration: underline; cursor: pointer;" onclick= openModal10("' +
                  sanction.sanctions_id +
                  '")>' +
                  sanction.written_name +
                  "</a>";

                formattedSanctions += "<hr>"; // Add a horizontal line to separate sanctions
              });
            } else {
              // Handle the case when there are no sanctions
              formattedSanctions += "<p>No sanctions</p>";
            }

            // Update the DOM element with the formatted sanctions
            studentSanctions.html(formattedSanctions);
          },
          error: function (error) {
            console.error("Error fetching sanctions:", error);
          },
        });
      },
      error: function (error) {
        console.error("Error fetching student data:", error);
      },
    });
  });
});

$(document).ready(function () {
  $(".js-example-basic-single").select2();
});

$(document).ready(function () {
  // Attach a click event handler to the "My Sanctions" button
  $("#openModalBtn1").click(function () {
    // Make an AJAX request to fetch the user's sanctions data
    $.ajax({
      type: "GET",
      url: "/fetch_sanctions",
      success: function (data) {
        // Assuming 'data' is an array of objects with 'date' and 'sanction' properties
        var table =
          "<table><thead><tr><th>Date</th><th>Sanction</th></tr></thead><tbody>";

        // Loop through the data and build the table rows
        for (var i = 0; i < data.length; i++) {
          table +=
            "<tr><td>" +
            data[i].date +
            "</td><td>" +
            data[i].sanction +
            "</td></tr>";
        }

        table += "</tbody></table>";

        // Insert the table into a div with the id 'sanctionsTable'
        $("#sanctionsTable").html(table);
      },
    });
  });
});

$(document).ready(function () {
  // When the "Notifications" bar is clicked
  $("#notifications-bar").click(function () {
    // Toggle the visibility of the notifications container
    $("#notifications-container").toggle();
  });
});

function confirmStatusChange(reportId) {
  var confirmation = confirm(
    "Are you sure you want to change the status of report " + reportId + "?"
  );
  return confirmation;
}

setTimeout(function () {
  document.getElementById("flash-message").style.display = "none";
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
  } else if (kindSelect.value === "Request for Non-Wearing of Uniform") {
    formContainer2.style.display = "none";
    formContainer3.style.display = "block";
    formContainer4.style.display = "none";
  } else {
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
  } else if (kindSelect.value === "Written Reprimand") {
    formContainer5.style.display = "none";
    formContainer6.style.display = "block";
    formContainer7.style.display = "none";
    33;
  } else {
    formContainer5.style.display = "none";
    formContainer6.style.display = "none";
    formContainer7.style.display = "block";
  }
}

function toggleInputFields3() {
  var kindSelect = document.getElementById("forms1");
  var formContainer8 = document.getElementById("formContainer8");
  var formContainer9 = document.getElementById("formContainer9");
  var formContainer10 = document.getElementById("formContainer10");

  if (kindSelect.value === "Written Warning") {
    formContainer8.style.display = "block";
    formContainer9.style.display = "none";
    formContainer10.style.display = "none";
  } else if (kindSelect.value === "Written Reprimand") {
    formContainer8.style.display = "none";
    formContainer9.style.display = "block";
    formContainer10.style.display = "none";
  } else {
    formContainer8.style.display = "none";
    formContainer9.style.display = "none";
    formContainer10.style.display = "block";
  }
}

function toggleInputTables() {
  var kindSelect = document.getElementById("forms3");
  var tablecontainer = document.getElementById("table-container");
  var tablecontainer1 = document.getElementById("table-container1");
  var tablecontainer2 = document.getElementById("table-container2");
  var tablecontainer3 = document.getElementById("table-container3");
  var tablecontainer4 = document.getElementById("table-container4");

  if (kindSelect.value === "Written Warning") {
    tablecontainer.style.display = "block";
    tablecontainer1.style.display = "none";
    tablecontainer2.style.display = "none";
    tablecontainer3.style.display = "none";
    tablecontainer4.style.display = "none";
  } else if (kindSelect.value === "Written Reprimand") {
    tablecontainer.style.display = "none";
    tablecontainer1.style.display = "block";
    tablecontainer2.style.display = "none";
    tablecontainer3.style.display = "none";
    tablecontainer4.style.display = "none";
  } else if (kindSelect.value === "Call Slip") {
    tablecontainer.style.display = "none";
    tablecontainer1.style.display = "none";
    tablecontainer2.style.display = "none";
    tablecontainer3.style.display = "block";
    tablecontainer4.style.display = "none";
  } else if (kindSelect.value === "Notice of Case Dismissal") {
    tablecontainer.style.display = "none";
    tablecontainer1.style.display = "none";
    tablecontainer2.style.display = "none";
    tablecontainer3.style.display = "none";
    tablecontainer4.style.display = "block";
  } else {
    tablecontainer.style.display = "none";
    tablecontainer1.style.display = "none";
    tablecontainer2.style.display = "block";
    tablecontainer3.style.display = "none";
    tablecontainer4.style.display = "none";
  }
}

$(document).ready(function () {
  // When the page is loaded, check the initial state of the checkbox
  toggleSpecifyTextarea();

  // Attach a change event handler to the checkbox
  $("#specify").change(function () {
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

$(document).ready(function () {
  // When the page is loaded, check the initial state of the checkbox
  toggleSpecifyTextarea1();

  // Attach a change event handler to the checkbox
  $("#specify1").change(function () {
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
document.addEventListener("DOMContentLoaded", function () {
  const openModalLinks = document.querySelectorAll(".open-modal-link");

  openModalLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Call the preview_report_file function with the report ID
      previewReportFile();
    });
  });

  // Function to call the preview_report_file function with the report ID
  function previewReportFile() {
    // Construct the URL for the report with the specific report ID
    // Show the modal
    const modal = document.getElementById("Viewform");
    modal.style.display = "block";
  }
});

// JavaScript to open the modal when the link is clicked
document.addEventListener("DOMContentLoaded", function () {
  const openModalLinks = document.querySelectorAll(".open-modal-link1");

  openModalLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("data-target");
      const modal = document.getElementById(targetId);
      modal.style.display = "block";
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

function clearIdreportSession() {
  // Clear the 'Idreport' session value
  fetch("/clear_Idreport", {
    method: "POST",
  })
    .then((response) => {
      if (response.status === 204) {
        console.log("Idreport session cleared.");
      } else {
        console.error("Failed to clear Idreport session.");
      }
    })
    .catch((error) => {
      console.error(
        "An error occurred while clearing Idreport session:",
        error
      );
    });
}

function closeviewModal() {
  var modal = document.getElementById("Viewform");

  // Hide the modal
  modal.style.display = "none";
  // Add a delay before the first reload
  setTimeout(function () {
    location.reload();

    // Add a delay before the second reload
    setTimeout(function () {
      location.reload();
    }, 100); // 2 seconds
  }, 100); // 2 seconds
}

function closeviewModal1() {
  var modal = document.getElementById("Viewsupport");

  // Hide the modal
  modal.style.display = "none";
}

function loadModalContent() {
  // Make an AJAX request to get the new content
  fetch("/load_modal_content", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // Update the modal content with the new data
      const modalContent = document.getElementById("modal-content1");
      modalContent.innerHTML = data.content;

      // Display the modal
      const modal = document.getElementById("Viewform");
      modal.style.display = "block";
    })
    .catch((error) => {
      console.error("Failed to load modal content:", error);
    });
}

// JavaScript function to make an AJAX request
function getAlgorithmResult(complaintText) {
  // Show the loading screen
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "block";
  // Make an AJAX request to the 'algorithm' endpoint
  $.ajax({
    type: "POST", // Use POST or GET based on your endpoint
    url: "/algorithm/" + encodeURIComponent(complaintText), // Pass the complaint text as a parameter
    success: function (response) {
      // Handle the response here, e.g., display it in a modal
      loadingScreen.style.display = "none";
      openAlgorithmModal(response, complaintText);
    },
    error: function (error) {
      // Handle errors, if any
      console.error("Error:", error);
    },
  });
}

function openAlgorithmModal(result, complain) {
  // Display the result in a modal or any other way you prefer
  const modal = document.getElementById("myModal21");
  const offenseList = modal.querySelector("#offense-list");
  var reportContent1 = modal.querySelector("#reportContent1");

  var targetScrollPosition = modal.offsetTop;

  // Scroll the page downward to the modal
  window.scrollTo(0, targetScrollPosition);

  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";

  disableScroll();

  // Clear previous content
  offenseList.innerHTML = "";

  var modalContent = "";

  console.log(complain);
  console.log(result.type);

  modalContent += "<b>Report Text:</b><br>" + complain + "<br><br>";

  if (result.type == "english") {
    if (result && result.top_10_offense_scores) {
      result.top_10_offense_scores.forEach((offense) => {
        // Create a list item for each offense and score
        const listItem = document.createElement("li");
        listItem.textContent =
          "Offense ID: " +
          offense.offense_id +
          ", Score: " +
          offense.score +
          "%";

        // Add the list item to the offense list
        offenseList.appendChild(listItem);
      });
    }
  } else {
    const listItem = document.createElement("li");
    listItem.textContent = result.message;

    // Add the list item to the offense list
    offenseList.appendChild(listItem);
  }

  reportContent1.innerHTML = modalContent;

  modal.style.display = "block";
}
function closeAlgoModal() {
  var modal = document.getElementById("myModal21");
  enableScroll();

  // Hide the modal
  modal.style.display = "none";
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
    },
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
      } else {
        // Data is found, open the modal
        var autoOpenModal = document.getElementById("autoOpenModal");
        autoOpenModal.style.display = "block";

        // Close the modal when the close button is clicked
        var closeAutoOpenModalBtn = document.getElementById(
          "closeAutoOpenModalBtn"
        );
        closeAutoOpenModalBtn.onclick = function () {
          autoOpenModal.style.display = "none";
        };
      }
    },
    error: function (error) {
      console.error("Error fetching student data:", error);
    },
  });
});

function showRejectModal(id, code) {
  console.log(id);
  console.log(code);
  const modal = document.getElementById("rejectModal");
  modal.style.display = "block";

  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const newButton1 = document.createElement("input");
  newButton1.type = "hidden";
  newButton1.value = code;
  newButton1.id = "code";
  newButton1.name = "code";

  const form = document.getElementById("noticeformx");
  form.appendChild(newButton);
  form.appendChild(newButton1);
}

// JavaScript function to close the reject modal
function closeRejectModal() {
  const modal = document.getElementById("rejectModal");
  modal.style.display = "none";
}

function showCaseModal(id, code) {
  console.log(id);
  console.log(code);
  const modal = document.getElementById("caseModal");
  modal.style.display = "block";

  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const newButton1 = document.createElement("input");
  newButton1.type = "hidden";
  newButton1.value = code;
  newButton1.id = "code";
  newButton1.name = "code";

  const form = document.getElementById("noticeform1");
  form.appendChild(newButton);
  form.appendChild(newButton1);
}

// JavaScript function to close the reject modal
function closeCaseModal() {
  const modal = document.getElementById("caseModal");
  modal.style.display = "none";
}

// JavaScript function to check the selected status
function checkStatus(id, code) {
  const selectElement = document.getElementById("new_status_select_" + id);
  const selectedValue = selectElement.value;

  ReportId = id;
  console.log(ReportId);

  if (selectedValue === "Rejected") {
    showRejectModal(id, code);
    console.log("wew");
    return false; // Prevent the form submission
  } else if (selectedValue === "Case Closed") {
    $.ajax({
      type: "POST", // Or 'GET' if your server expects a GET request
      url: "/change_report_status/" + ReportId, // Replace with your server URL
      data: { new_status: "Case Closed" }, // Send data to the server
      success: function () {
        location.reload();
      },
      error: function (error) {
        // Handle errors, if any
        console.error(error);
      },
    });
    return false; // Prevent the form submission
  } else if (selectedValue === "On Going") {
    $.ajax({
      type: "POST", // Or 'GET' if your server expects a GET request
      url: "/change_report_status/" + ReportId, // Replace with your server URL
      data: { new_status: "On Going" }, // Send data to the server
      success: function () {
        location.reload();
      },
      error: function (error) {
        // Handle errors, if any
        console.error(error);
      },
    });
    return false; // Prevent the form submission
  }
  return true; // Continue with form submission for other status values
}

function toggleInput4() {
  var prolongedCheckbox = document.getElementById("prolonged");
  var specify2Input = document.getElementById("specify2");

  if (prolongedCheckbox.checked) {
    specify2Input.style.display = "block";
    specify2Input.required = true; // Make it required
  } else {
    specify2Input.style.display = "none";
    specify2Input.required = false;
    specify2Input.value = ""; // Not required if neither checkbox is checked
  }
}

function toggleInput5() {
  console.log("check");
  var prolongedCheckbox1 = document.getElementById("prolonged1");
  var specify3Input = document.getElementById("specify3");

  if (prolongedCheckbox1.checked) {
    specify3Input.style.display = "block";
    specify3Input.required = true; // Make it required
  } else {
    specify3Input.style.display = "none";
    specify3Input.required = false;
    specify3Input.value = ""; // Not required if neither checkbox is checked
  }
}

function validateCheckboxes() {
  var fieldworkCheckbox = document.getElementById("fieldwork");
  var prolongedCheckbox = document.getElementById("prolonged");

  if (!fieldworkCheckbox.checked && !prolongedCheckbox.checked) {
    alert("Please check at least one checkbox.");
    return false;
  }
}

function validateCheckboxes1() {
  var fieldworkCheckbox1 = document.getElementById("fieldwork1");
  var prolongedCheckbox1 = document.getElementById("prolonged1");

  if (!fieldworkCheckbox1.checked && !prolongedCheckbox1.checked) {
    alert("Please check at least one checkbox.");
    return false;
  }
}

function coordedit(id) {
  const modal = document.getElementById("modalContainery");
  var targetScrollPosition = modal.offsetTop;

  // Scroll the page downward to the modal
  window.scrollTo(0, targetScrollPosition);

  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";

  disableScroll();

  modal.style.display = "block";
  // Create a new button element
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeFormy");
  form.appendChild(newButton);
}
function closeModal6() {
  var modal = document.getElementById("modalContainery");
  enableScroll();

  // Hide the modal
  modal.style.display = "none";
}

function coordedit1(id) {
  const modal = document.getElementById("modalContainerx");
  console.log(id);

  disableScroll();
  modal.style.display = "block";
  // Create a new button element
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeFormx");
  form.appendChild(newButton);
}
function closeModal7() {
  var modal = document.getElementById("modalContainerx");
  enableScroll();

  // Hide the modal
  modal.style.display = "none";
}

function coordedit2(id) {
  const modal = document.getElementById("modalContainera");
  console.log(id);

  disableScroll();
  modal.style.display = "block";
  // Create a new button element
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeForma");
  form.appendChild(newButton);
}
function closeModal8() {
  var modal = document.getElementById("modalContainera");
  enableScroll();
  // Hide the modal
  modal.style.display = "none";
}

function coordedit3(id) {
  const modal = document.getElementById("modalContainerb");
  console.log(id);

  disableScroll();
  modal.style.display = "block";
  // Create a new button element
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeFormb");
  form.appendChild(newButton);
}
function closeModal9() {
  var modal = document.getElementById("modalContainerb");
  enableScroll();
  // Hide the modal
  modal.style.display = "none";
}

function coordedit4(id) {
  const modal = document.getElementById("modalContainerc");
  console.log(id);

  disableScroll();
  modal.style.display = "block";
  // Create a new button element
  const newButton = document.createElement("input");
  newButton.type = "hidden";
  newButton.value = id;
  newButton.id = "id";
  newButton.name = "id";

  const form = document.getElementById("statusChangeFormc");
  form.appendChild(newButton);
}
function closeModal10() {
  var modal = document.getElementById("modalContainerc");
  enableScroll();

  // Hide the modal
  modal.style.display = "none";
}

function toggleReadonly(button, id) {
  var changebutton = document.getElementById("changebutton_" + id);
  var row = button.parentNode.parentNode;
  var inputElements = row.getElementsByTagName("input");

  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].readOnly = !inputElements[i].readOnly;
    if (!inputElements[i].readOnly) {
      inputElements[i].classList.add("editable");
      changebutton.disabled = false; // Enable the button when the field is editable
    } else {
      inputElements[i].classList.remove("editable");
      changebutton.disabled = true; // Disable the button when the field is read-only
    }
  }
}

function updateRow(button) {
  var row = button.parentNode.parentNode;

  var coordId = row
    .querySelector("td[data-coord-id]")
    .getAttribute("data-coord-id");
  var picId = row.querySelector("td[data-pic-id]").getAttribute("data-pic-id");
  console.log(row);
  var inputElements = row.getElementsByTagName("input");
  console.log(inputElements);

  var data = {};
  for (var i = 0; i < inputElements.length; i++) {
    var inputElement = inputElements[i];
    data[inputElement.name] = inputElement.value;
  }

  data["coordId"] = coordId;
  data["picId"] = picId;

  // Send data to the server for database update
  $.ajax({
    url: "/update-database",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function () {
      // Database update successful
      alert("Database updated successfully.");
    },
    error: function () {
      // Database update failed
      alert("Database update failed.");
    },
  });
}

function toggleReadonly1(button, id) {
  var row = button.parentNode.parentNode;
  var inputElements = row.getElementsByTagName("input");
  var changebutton = document.getElementById("changebutton1_" + id);

  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].readOnly = !inputElements[i].readOnly;
    if (!inputElements[i].readOnly) {
      inputElements[i].classList.add("editable");
      changebutton.disabled = false; // Add the 'editable' class when the field is editable
    } else {
      inputElements[i].classList.remove("editable");
      changebutton.disabled = true; // Remove the 'editable' class when the field is read-only
    }
  }
}

function updateRow1(button) {
  console.log("check");
  var row = button.parentNode.parentNode;

  var coordId = row
    .querySelector("td[data-coord-id]")
    .getAttribute("data-coord-id");
  var picId = row.querySelector("td[data-pic-id]").getAttribute("data-pic-id");
  console.log(row);
  var inputElements = row.getElementsByTagName("input");
  console.log(inputElements);

  var data = {};
  for (var i = 0; i < inputElements.length; i++) {
    var inputElement = inputElements[i];
    data[inputElement.name] = inputElement.value;
  }

  console.log(data);

  data["coordId"] = coordId;
  data["picId"] = picId;

  // Send data to the server for database update
  $.ajax({
    url: "/update-database1",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function () {
      // Database update successful
      alert("Database updated successfully.");
    },
    error: function () {
      // Database update failed
      alert("Database update failed.");
    },
  });
}

function toggleReadonly2(button, id) {
  var row = button.parentNode.parentNode;
  var inputElements = row.getElementsByTagName("input");
  var changebutton = document.getElementById("changebutton2_" + id);

  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].readOnly = !inputElements[i].readOnly;
    if (!inputElements[i].readOnly) {
      inputElements[i].classList.add("editable");
      changebutton.disabled = false; // Add the 'editable' class when the field is editable
    } else {
      inputElements[i].classList.remove("editable");
      changebutton.disabled = true; // Remove the 'editable' class when the field is read-only
    }
  }
}

function updateRow2(button) {
  console.log("check");
  var row = button.parentNode.parentNode;

  var coordId = row
    .querySelector("td[data-coord-id]")
    .getAttribute("data-coord-id");
  var picId = row.querySelector("td[data-pic-id]").getAttribute("data-pic-id");
  console.log(row);
  var inputElements = row.getElementsByTagName("input");
  console.log(inputElements);

  var data = {};
  for (var i = 0; i < inputElements.length; i++) {
    var inputElement = inputElements[i];
    data[inputElement.name] = inputElement.value;
  }

  data["coordId"] = coordId;
  data["picId"] = picId;

  // Send data to the server for database update
  $.ajax({
    url: "/update-database2",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function () {
      // Database update successful
      alert("Database updated successfully.");
    },
    error: function () {
      // Database update failed
      alert("Database update failed.");
    },
  });
}

function toggleReadonly3(button, id) {
  var row = button.parentNode.parentNode;
  var inputElements = row.getElementsByTagName("input");
  var changebutton = document.getElementById("changebutton3_" + id);

  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].readOnly = !inputElements[i].readOnly;
    if (!inputElements[i].readOnly) {
      inputElements[i].classList.add("editable");
      changebutton.disabled = false; // Add the 'editable' class when the field is editable
    } else {
      inputElements[i].classList.remove("editable");
      changebutton.disabled = true; // Remove the 'editable' class when the field is read-only
    }
  }
}

function updateRow3(button) {
  console.log("check");
  var row = button.parentNode.parentNode;

  var coordId = row
    .querySelector("td[data-coord-id]")
    .getAttribute("data-coord-id");
  var picId = row.querySelector("td[data-pic-id]").getAttribute("data-pic-id");
  console.log(row);
  var inputElements = row.getElementsByTagName("input");
  console.log(inputElements);

  var data = {};
  for (var i = 0; i < inputElements.length; i++) {
    var inputElement = inputElements[i];
    data[inputElement.name] = inputElement.value;
  }

  data["coordId"] = coordId;
  data["picId"] = picId;

  // Send data to the server for database update
  $.ajax({
    url: "/update-database3",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function () {
      // Database update successful
      alert("Database updated successfully.");
    },
    error: function () {
      // Database update failed
      alert("Database update failed.");
    },
  });
}

function toggleReadonly4(button, id) {
  var row = button.parentNode.parentNode;
  var inputElements = row.getElementsByTagName("input");
  var changebutton = document.getElementById("changebutton4_" + id);

  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].readOnly = !inputElements[i].readOnly;
    if (!inputElements[i].readOnly) {
      inputElements[i].classList.add("editable");
      changebutton.disabled = false; // Add the 'editable' class when the field is editable
    } else {
      inputElements[i].classList.remove("editable");
      changebutton.disabled = true; // Remove the 'editable' class when the field is read-only
    }
  }
}

function updateRow4(button) {
  console.log("check");
  var row = button.parentNode.parentNode;

  var coordId = row
    .querySelector("td[data-coord-id]")
    .getAttribute("data-coord-id");
  var picId = row.querySelector("td[data-pic-id]").getAttribute("data-pic-id");
  console.log(row);
  var inputElements = row.getElementsByTagName("input");
  console.log(inputElements);

  var data = {};
  for (var i = 0; i < inputElements.length; i++) {
    var inputElement = inputElements[i];
    data[inputElement.name] = inputElement.value;
  }

  data["coordId"] = coordId;
  data["picId"] = picId;

  // Send data to the server for database update
  $.ajax({
    url: "/update-database4",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function () {
      // Database update successful
      alert("Database updated successfully.");
    },
    error: function () {
      // Database update failed
      alert("Database update failed.");
    },
  });
}

function sortTable() {
  var table = document.getElementById("coordinator-table");
  var rows = table.rows;
  var sortedRows = Array.from(rows).slice(1); // Skip the header row
  sortedRows.sort((a, b) => {
    var aCoordId = parseInt(
      a.querySelector("[data-coord-id]").getAttribute("data-coord-id")
    );
    var bCoordId = parseInt(
      b.querySelector("[data-coord-id]").getAttribute("data-coord-id")
    );
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

function openModal5(reportText, reportFileLink, supportingDocumentLink) {
  var modal = document.getElementById("reportModal5");
  var reportContent = document.getElementById("reportContent5");

  var targetScrollPosition = modal.offsetTop;

  // Scroll the page downward to the modal
  window.scrollTo(0, targetScrollPosition);

  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";

  // Construct the HTML content for the modal
  var modalContent =
    "<b>Reason of Rejection:</b><br>" + reportText + "<br><br>";

  if (reportFileLink) {
    modalContent += "<b>Attached Report File:</b><br>";
    modalContent +=
      '<a href="' +
      reportFileLink +
      '" target="_blank">Download Report File</a><br>';
  }

  if (supportingDocumentLink) {
    modalContent += "<b>Attached Supporting Document:</b><br>";
    modalContent +=
      '<a href="' +
      supportingDocumentLink +
      '" target="_blank">Download Supporting Document</a>';
  }

  // Set the modal content
  reportContent.innerHTML = modalContent;

  // Show the modal
  modal.style.display = "block";

  disableScroll();
}

// JavaScript function to close the modal
function closeModal5() {
  var modal = document.getElementById("reportModal5");

  // Hide the modal
  modal.style.display = "none";
  enableScroll();
}

function openModal(reportText, reportFileLink, supportingDocumentLink) {
  var modal = document.getElementById("reportModal");
  var reportContent = document.getElementById("reportContent");

  var targetScrollPosition = modal.offsetTop;

  // Scroll the page downward to the modal
  window.scrollTo(0, targetScrollPosition);

  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";

  // Construct the HTML content for the modal
  var modalContent = "<b>Report Text:</b><br>" + reportText + "<br><br>";

  if (reportFileLink) {
    modalContent += "<b>Attached Report File:</b><br>";
    modalContent +=
      '<a href="' +
      reportFileLink +
      '" target="_blank">Download Report File</a><br>';
  }

  if (supportingDocumentLink) {
    modalContent += "<b>Attached Supporting Document:</b><br>";
    modalContent +=
      '<a href="' +
      supportingDocumentLink +
      '" target="_blank">Download Supporting Document</a>';
  }

  // Set the modal content
  reportContent.innerHTML = modalContent;

  // Show the modal
  modal.style.display = "block";

  disableScroll();
}

// JavaScript function to close the modal
function closeModal() {
  var modal = document.getElementById("reportModal");

  // Hide the modal
  modal.style.display = "none";
  enableScroll();
}

function handleFileChange(fileInputId, textInputId) {
  var fileInput = document.getElementById(fileInputId);
  var textInputLabel = document.getElementById(textInputId + "Label");
  var textInput = document.getElementById(textInputId);

  if (fileInput.files.length > 0) {
    textInputLabel.style.display = "block";
    textInput.style.display = "block";
    textInput.required = true;
  } else {
    textInputLabel.style.display = "none";
    textInput.style.display = "none";
    textInput.required = false;
  }
}

function validateForm() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var atLeastOneChecked = false;

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      atLeastOneChecked = true;
    }
  });

  if (!atLeastOneChecked) {
    alert("Please check at least one checkbox");
    return false; // Prevent form submission
  }

  // Form is valid, continue with submission
  return true;
}

function digi() {
  var date = new Date(),
    hour = date.getHours(),
    minute = checkTime(date.getMinutes()),
    ss = checkTime(date.getSeconds());

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  if (hour >= 12) {
    if (hour > 12) {
      hour = hour - 12;
    }
    hour = checkTime(hour);
    document.getElementById("tt").innerHTML =
      hour + ":" + minute + ":" + ss + " PM";
  } else {
    if (hour === 0) {
      hour = 12;
    }
    hour = checkTime(hour);
    document.getElementById("tt").innerHTML =
      hour + ":" + minute + ":" + ss + " AM";
  }

  var time = setTimeout(digi, 1000);
}

function toggleActive(element) {
  // Remove 'active' class from all sidebar items
  var sidebarItems = document.querySelectorAll(".sidebar ul li");
  sidebarItems.forEach(function (item) {
    item.classList.remove("active");
  });

  // Add 'active' class to the clicked sidebar item
  element.classList.add("active");
}

function submitForm() {
  // Get the selected value
  var duration = document.getElementById("duration").value;

  // Set the session_duration hidden input field value
  document.getElementById("session_duration").value = duration;

  sessionStorage.setItem("duration", duration);

  // Submit the form
  document.getElementById("duration_form").submit();
}

function setDuration() {
  const dur = sessionStorage.getItem("duration");

  console.log(dur);

  if (dur === "all" || "") {
    document.getElementById("all").setAttribute("selected", "selected");
  } else if (dur === "yearly") {
    document.getElementById("year").setAttribute("selected", "selected");
  } else {
    document.getElementById("monthly").setAttribute("selected", "selected");
  }
}

function srcodechange() {
  const username = document.getElementById("student1").value;
  const studentName = document.getElementById("nameofstudent");
  const studentCourse = document.getElementById("secofstudent");

  console.log("Username:", username);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/lookup_student", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        // Update the DOM elements with the student's name and course
        studentName.textContent = "Name: " + data.Name;
        studentCourse.textContent = "Course: " + data.CourseOrPosition;

        // Make another AJAX request to fetch sanctions
      } else {
        console.error("Error fetching student data:", xhr.statusText);
      }
    }
  };
  xhr.send(JSON.stringify({ username: username }));
}
