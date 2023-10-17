
    $('#togglePassword').click(function() {
        var passwordInput = $('#passwordInput');
        var currentType = passwordInput.attr('type');
        
        if (currentType === 'password') {
            passwordInput.attr('type', 'text');
        } else {
            passwordInput.attr('type', 'password');
        }
    });

    $('#loginUserForm').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: '/access/user',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (rs) {
            if (rs.success) {
                    if (rs.data == 1)
                    {
                        $('#Message').attr('style', 'color: #FFCC00').text('You are logged in as director!');
                        setTimeout(function() {
                            window.location.href = '/director';
                        }, 2000);
                    }
                    else if (rs.data == 2)
                    {
                        $('#Message').attr('style', 'color: #FFCC00').text('You are logged in as administrator!');
                        setTimeout(function() {
                            window.location.href = '/admin';
                        }, 2000);
                    }
                    else
                    {
                        $('#Message').attr('style', 'color: #FFCC00').text('Navigating to home page in 2s!');
                        setTimeout(function() {
                            window.location.href = '/';
                        }, 2000);
                    }
            } else {
                $('#Message').attr('style', 'color: rgb(206, 59, 45)').text('Wrong username or password!');
                $('#Message').fadeOut(3000);
            }
        }
    });
});