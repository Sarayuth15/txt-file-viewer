$(document).ready(function () {
    // When hamburger is clicked → toggle sidebar visibility
    $("#toggleSidebar").on("click", function () {
        $("#sidebar").toggleClass("hidden"); 
    });

    // When user clicks on a file from sidebar
    $(".file-link").on("click", function () {
        let filePath = $(this).data("file"); // get file path from data-file attribute
        let fileName = $(this).text().replace(/[📂📝💼📒✏️]/g, '').trim(); // clean name for title

        // Set active state
        $(".file-link").removeClass("active");
        $(this).addClass("active");

        // Update title
        $("#contentTitle .text").text(fileName);

        // Show loading state
        $("#contentArea").html(`
            <div class="d-flex justify-content-center mt-5 text-muted">
                <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `);

        // Load file content with AJAX
        $.get(filePath, function (data) {
            // Put file content inside #contentArea, inside a <pre> to preserve formatting
            $("#contentArea").html(`<pre>${data}</pre>`);
        }).fail(function () {
            // If loading fails → show error
            $("#contentArea").html(`
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>Failed to load file: ${filePath}</div>
                </div>
            `);
        });
    });
});