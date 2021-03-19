$.ajax({
  url: 'assets/json/technologies.json',
  method: 'GET',
  dataType: 'JSON',
  success: function(result) {
    result.forEach(function(item) {
      const logo = item.name.toLowerCase().split(' ').join('-') + '.png';

      $('#technologies-box').append(`
        <div class="col-md-6 col-lg-4">
          <div class="card technology-item text-center">
            <div class="row no-gutters">
              <div class="col-4">
                <img src="assets/img/technology/${ logo }" class="technology-logo" alt="${ item.name }">
              </div>
              <div class="col-8">
                <h5 class="card-title technology-name">${ item.name }</h5>
                <div class="progress">
                  <div class="progress-bar" role="progressbar" aria-valuenow="${ item.percentage }" aria-valuemin="0" aria-valuemax="100">${ item.percentage }%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
    });
  }
});



$.ajax({
  url: 'assets/json/services.json',
  method: 'GET',
  dataType: 'JSON',
  success: function(result) {
    result.forEach(function(item) {
      $('#services .row').append(`
        <div class="col-6 col-md-3">
          <div class="frame" data-toggle="modal" data-target="#servicesModal${ item.id }">
            <span class="fa-stack fa-3x">
              <i class="fas fa-circle fa-stack-2x text-primary"></i>
              <i class="fas fa-${ item.icon } fa-stack-1x fa-inverse"></i>
            </span>
            <h5 class="my-3">${ item.title }</h5>
          </div>
        </div>
      `);

      $('#services-modal').append(`
        <div class="modal fade" id="servicesModal${ item.id }" tabindex="-1" role="dialog" aria-labelledby="servicesModalTitle${ item.id }" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="servicesModalTitle${ item.id }">${ item.title }</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">${ item.description }</div>
              <div class="modal-footer">
                <a class="btn btn-dark text-white rounded-0" href="${ item.link }" target="_blank">Read more</a>
              </div>
            </div>
          </div>
        </div>
      `);
    });
  }
});



let total = 0;
$.ajax({
  url: 'assets/json/projects.json',
  method: 'GET',
  dataType: 'JSON',
  success: function(result) {
    total = result.length;
    $('#total').html(total);

    // index.html
    for (let i = 0; i < 6; i++) {
      let item = result[i];
      $('.portfolio #main .row').append(`
        <div class="col-lg-4 col-sm-6">
          <div class="portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${ item.id }">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content text-center">
                  <div class="portfolio-caption-heading">${ item.name }</div>
                  <div class="portfolio-caption-subheading text-muted">${ item.category }</div>
                </div>
              </div>
              <img class="img-fluid" src="${ item.picture }" alt="${ item.name }">
            </a>
          </div>
        </div>
      `);
    }

    // portfolio.html
    result.forEach(function(item) {
      $('.portfolio #portfolio .row').append(`
        <div class="col-lg-4 col-sm-6 mb-4">
          <div class="portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${ item.id }">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="${ item.picture }" alt="${ item.name }">
            </a>
            <div class="portfolio-caption">
              <div class="portfolio-caption-heading">${ item.name }</div>
              <div class="portfolio-caption-subheading text-muted">${ item.category }</div>
            </div>
          </div>
        </div>
      `);
      
      let previewButton = '';
      let previewProject = `<img class="img-fluid d-block mx-auto" src="${ item.picture }" alt="${ item.name }">`;

      if (item.preview != null) {
        previewButton = `
          <br class="break">
          <a class="btn btn-primary btn-preview" href="${ item.preview }" target="_blank">
            <i class="fas fa-globe mr-2"></i>
            Project Preview
          </a>
        `;

        previewProject = `<a href="${ item.preview }" target="_blank">${ previewProject }</a>`;
      }

      $('#portfolio-modal').append(`
        <div class="portfolio-modal modal fade" id="portfolioModal${ item.id }" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="close-modal" data-dismiss="modal">
                <img src="assets/img/close-icon.svg" alt="Close modal">
              </div>
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <div class="modal-body">
                      <h2 class="text-uppercase">${ item.name }</h2>
                      <p class="item-intro text-muted">${ item.category }</p>
                      ${ previewProject }
                      <p>${ item.description }</p>
                      <ul class="list-inline">
                        <li>Technologies: ${ item.technologies }</li>
                        <li>Author: ${ item.author }</li>
                      </ul>
                      <a class="btn btn-dark" href="${ item.github }" target="_blank">
                        <i class="fab fa-github mr-2"></i>
                        GitHub
                      </a>
                      ${ previewButton }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
    });
  }
});