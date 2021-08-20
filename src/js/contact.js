$(function() {
  const contactField = $('#contact').find('input, textarea');
  
  contactField.on('focus', function() {
    $(this).siblings('.form-text').empty();
  });

  contactField.jqBootstrapValidation({
    preventSubmit: true,
    submitSuccess: function($form, event) {
      event.preventDefault();

      const data = Object.fromEntries(new FormData(document.querySelector('#contact form')));
      
      window.location = `
        https://api.whatsapp.com/send?phone=6282362361344&text=
        Name%3A+${ data.name }%0A
        Email%3A+${ data.email }%0A
        Message%3A+${ data.message }%0A
      `.replace(/\s+/g, '');  
    },
    submitError: function ($form, event, errors) {
      $.each(errors, function(key, value) {
        $('[name=' + key + ']').siblings('.form-text').html(value.join('. '));
      });
    }
  });
});