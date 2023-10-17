$(document).ready(function () {
    $('body').on('click', '#btnDeleteToy', function () {
        var tmpId = $(this).data("id");
        // -- Jquery --
        var conf = confirm("Are you sure to delete this toy?");
        // Ajax
        if (conf == true) {
            $.ajax({
            url: '/shop/delete',
            type: 'Post',
            data: { toyid: tmpId },
            success: function (rs) {
                if (rs.success == true) {
                    $('#trow_' + tmpId).remove();
                }
                else {
                    alert("An Error Occurred Please Try Again Later");
                }
            }
        });
        }
    });

    // GET TOY ON FORM
    $('body').on('click', '#btnUpdateToy', function () {
        var tmpId = $(this).data("id");
        $.ajax({
            url: '/shop/toy',
            type: 'GET',
            data: { toyid: tmpId }, // Sending 'toyid' as a query parameter
            success: function (rs) {
                if (rs.data != null) {
                    $('#inputToyId').val(rs.data.toyid);
                    $('#inputToyName').val(rs.data.toyname);
                    $('#inputToyDescription').val(rs.data.description);
                    $('#inputToyPrice').val(rs.data.price);
                    $('#inputToyOrigin').val(rs.data.origin);
                    $('#inputToyCategory option').each(function() {
                        if ($(this).val() == rs.data.category_id) {
                            $(this).prop('selected', true);
                        } else {
                            $(this).prop('selected', false);
                        }
                    });
                    if (rs.data.image)
                    { $('#inputToyImg').attr('src', '/images/toy/' + rs.data.image ); }
                    else { $('#inputToyImg').attr('src', '/images/system/no-photo-available.png' ); }
                }
            }
        });
    });

    $('#toyForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default action
        var formData = new FormData(this);
        $.ajax({
            url: '/shop/update',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (rs) {
                if (rs.success) {
                    alert("Update toy successfully!");
                    window.location.reload();
                } else {
                    alert("Failed to update toy!");
                    window.location.reload();
                }
            }
        });
    });

    // Preview Image
    $('body').on('change', '#fileChosen', function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(event) {
                $('#inputToyImg').attr('src', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });



});