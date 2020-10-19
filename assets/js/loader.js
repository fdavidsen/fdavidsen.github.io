$.ajax({
    url: baseURL + 'core/json/technologies.json',
    dataType: 'JSON',
    type: 'GET',
    success: function(result) {
        result.forEach(function(item) {
            $('#technologies-box').append('<div class="col-md-6 col-lg-4"><div class="card technology-item text-center"><div class="row no-gutters"><div class="col-4"><img src="assets/img/technology/' + item.logo + '" class="technology-logo" alt="' + item.name + '"></div><div class="col-8"><h5 class="card-title technology-name">' + item.name + '<span id="percentage">(' + item.percentage + '%)</span></h5><div class="progress"><div class="determinate" style="width: ' + item.percentage + '%"></div></div></div></div></div></div>');
        });
    }
});

let total = 0;
$.ajax({
    url: baseURL + 'core/json/projects.json',
    dataType: 'JSON',
    type: 'GET',
    success: function(result) {
        total = result.length;
        $('#total').html(total);

        // index.html
        for (let i = 0; i < 6; i++) {
            let item = result[i];
            $('.portfolio #main .row').append('<div class="col-lg-4 col-sm-6"><div class="portfolio-item"><a class="portfolio-link" data-toggle="modal" href="#portfolioModal' + item.id + '"><div class="portfolio-hover"><div class="portfolio-hover-content text-center"><div class="portfolio-caption-heading">' + item.name + '</div><div class="portfolio-caption-subheading text-muted">' + item.category + '</div></div></div><img class="img-fluid" src="' + item.picture + '" alt="' + item.name + '" /></a></div></div>');
        }

        result.forEach(function(item) {
            // portfolio.html
            $('.portfolio #portfolio .row').append('<div class="col-lg-4 col-sm-6 mb-4"><div class="portfolio-item"><a class="portfolio-link" data-toggle="modal" href="#portfolioModal' + item.id + '"><div class="portfolio-hover"><div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div></div><img class="img-fluid" src="' + item.picture + '" alt="' + item.name + '" /></a><div class="portfolio-caption"><div class="portfolio-caption-heading">' + item.name + '</div><div class="portfolio-caption-subheading text-muted">' + item.category + '</div></div></div></div>');
            
            let preview = '';
            if (item.preview != null) {
                preview = '<br class="break"><a class="btn btn-primary btn-preview" href="' + item.preview + '" target="_blank"><i class="fas fa-globe mr-2"></i>Project Preview</a>';
            }

            $('#portfolio-modal').append('<div class="portfolio-modal modal fade" id="portfolioModal' + item.id + '" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="close-modal" data-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal"></div><div class="container"><div class="row justify-content-center"><div class="col-lg-8"><div class="modal-body"><h2 class="text-uppercase">' + item.name + '</h2><p class="item-intro text-muted">' + item.category + '</p><a href="' + item.picture + '" target="_blank"><img class="img-fluid d-block mx-auto" src="' + item.picture + '" alt="' + item.name + '"></a><p>' + item.description + '</p><ul class="list-inline"><li>Technologies: ' + item.technologies + '</li><li>Author: ' + item.author + '</li></ul><a class="btn btn-dark" href="' + item.github + '" target="_blank"><i class="fab fa-github mr-2"></i>GitHub</a>' + preview + '</div></div></div></div></div></div></div>');
        });
    }
});

$('.tabs-icon').on('click', 'li', function() {
    $(this).addClass('active').siblings().removeClass('active');
    const tab = $(this).data('tab').split('-').join(' ');
    let hidden = 0;

    $('.portfolio #portfolio .row').children().each(function() {
        if (tab == 'all') {
            $(this).fadeIn();
        } else {
            const type = $(this).find('.portfolio-caption-subheading').html().toLowerCase();
            if (type == tab) {
                $(this).fadeIn();
            } else {
                $(this).hide();
                hidden += 1;
            }
        }
    });

    $('#total').html(total - hidden);
});