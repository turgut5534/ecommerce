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

$('body').on('click', '.delete-data', function(e) {

    e.preventDefault()

    const data = $(this).data('data')
    const title = $(this).data('title')

    Swal.fire({
        title: 'Are you sure?',
        text: title+ " will be deleted",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            const target = $(this).data('href')
            const id = $(this).data('id')

            $.ajax({
                type: 'DELETE',
                url: target,
                success: function(response) {

                    $('.'+data + '-' + id).remove()

                    iziToast.success({
                        title: 'Ok',
                        message: title + ' has been deleted successfully!',
                    });
                },
                error: function(e) {
                    iziToast.error({
                        title: 'Error',
                        message: 'An error occured deleting the data',
                    });
                }
            })

        }
      })
    
})