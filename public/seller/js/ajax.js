$.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    }
});

$('#seller-form').on('submit', function(e) {

    e.preventDefault()

    const button = $('.seller-register-button')

    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        beforeSend: function() {
            button.html('Please wait...')
        },
        success: function(data) {

            iziToast.success({
                title: 'Success',
                message: data.message,
            });

            setTimeout(() => {
                location.href = '/seller/login'
            }, 1500);

        },
        error: function(e) {

            var response = JSON.parse(e.responseText);

            iziToast.error({
                title: 'Error',
                message: response.message,
            });

            button.html('Register')
        }
    })
    
})

$('#seller-login-form').on('submit', function(e) {

    e.preventDefault()

    const button = $('.seller-login-button')

    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        beforeSend: function() {
            button.html('Please wait...')
        },
        success: function(data) {

            iziToast.success({
                title: 'Success',
                message: data.message,
            });

            setTimeout(() => {
                location.href = '/seller/dashboard'
            }, 1500);

        },
        error: function(e) {

            var response = JSON.parse(e.responseText);

            iziToast.error({
                title: 'Error',
                message: response.message,
            });

            button.html('Login')
        }
    })
    
})