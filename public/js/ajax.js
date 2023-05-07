$.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    }
});

$('#register-form').on('submit', function(e) {

    e.preventDefault()

    const button = $('.register-button')

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

            $('#register-form')[0].reset()

            setTimeout(() => {
                location.href = '/login'
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

$('#login-form').on('submit', function(e) {

    e.preventDefault()

    const button = $('.login-button')

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

            $('#login-form')[0].reset()

            setTimeout(() => {
                location.href = '/'
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