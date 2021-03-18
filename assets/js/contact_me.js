$(function() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbySxIx4d2Tzez3yVcDYcbMrqFrAsaPX8TIKBGLhUBV409HJQiCnx-3fjZYgd8-OXm5r/exec';
  const form = document.forms['contact-form'];

  $('#contact-form input, #contact-form textarea').jqBootstrapValidation({
    preventSubmit: true,
    submitSuccess: function($form, event) {
      event.preventDefault();
      $('#contact-form button[type=submit]').toggleClass('d-none').siblings('button').toggleClass('d-none');

      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
          $('#status').html(`
            <div class="alert alert-success">
              <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
              <strong>Thank you! Your message has been sent.</strong>
            </div>
          `);
          
          form.reset();
          console.log('Success!', response);
        })
        .catch(error => {
          const firstName = $('#contact-form input[name]').val().split(' ')[0];
          
          $('#status').html(`
            <div class="alert alert-success">
              <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
              <strong>Sorry ${ firstName }, it seems that my mail server is not responding. Please try again later!</strong>
            </div>
          `);
          
          console.error('Error!', error.message);
        })
        .then(() => {
          $('#contact-form button[type=submit]').toggleClass('d-none').siblings('button').toggleClass('d-none');
        });
    }
  });
});