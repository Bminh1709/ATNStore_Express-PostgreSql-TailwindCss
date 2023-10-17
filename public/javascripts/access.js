$('#togglePassword').click(function() {
    var passwordInput = $('#passwordInput');
    var currentType = passwordInput.attr('type');
    
    if (currentType === 'password') {
        passwordInput.attr('type', 'text');
    } else {
        passwordInput.attr('type', 'password');
    }
});

$('#loginShopForm').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: '/access',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (rs) {
            if (rs.success) {
                $('#Message').attr('style', 'color: #FFCC00').text('Navigating to Home in 2s!');
                setTimeout(function() {
                    window.location.href = '/shop';
                }, 2000); 
            } else {
                $('#Message').attr('style', 'color: rgb(206, 59, 45)').text('Wrong username or password!');
                $('#Message').fadeOut(3000);
            }
        }
    });
});