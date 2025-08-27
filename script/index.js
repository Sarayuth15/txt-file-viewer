$(document).ready(function () {
    // When hamburger is clicked → toggle sidebar visibility
    $("#toggleSidebar").on("click", function () {
        $("#sidebar").toggle(); // show/hide sidebar

        // If sidebar is hidden → content becomes full width
        if ($("#sidebar").is(":visible")) {
            $("#contentWrapper").removeClass("full-width");
        } else {
            $("#contentWrapper").addClass("full-width");
        }
    });

    // When user clicks on a file from sidebar
    $(".file-link").on("click", function () {
        let filePath = $(this).data("file"); // get file path from data-file attribute

        // Load file content with AJAX
        $.get(filePath, function (data) {
            // Put file content inside #contentArea, inside a <pre> to preserve formatting
            $("#contentArea").html(`<pre>${data}</pre>`);
        }).fail(function () {
            // If loading fails → show error
            $("#contentArea").html(`<div class="alert alert-danger">Failed to load file: ${filePath}</div>`);
        });
    });
});