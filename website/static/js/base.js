(function($){
    $(function () {
        $('#sidebar-menu a').each(function() {
            if(!$(this).attr('ignore')){
                var href = $(this).attr('href')
                var text = $(this).children('.text').text();
                // $(this).attr('href', 'javascript:void(0);')
                if(href != undefined){
                    $(this).click(function(){
                        ajax_content(href);
                        return false;
                    });
                }
                if (text == '概况'){
                    $(this).click();
                }
            }
        });
    });
})(jQuery);

function ajax_content(url){
    $('#content-container').html('<div id="content-loader"></div>');
    $.ajax({
        type: 'get',
        url: url,
        data: 'ajax=true',
        dataType: 'html',
        timeout: 600000,
        success: function (html){
            $('#content-container').html(html);
        }
    });
}

function ajax_content_data(url, ctrl){
    // $('#content-container').html('<div id="content-loader"></div>');
    $.ajax({
        type: 'get',
        url: url,
        data: 'ajax=true',
        dataType: 'html',
        timeout: 600000,
        success: function (html){
            $('#' + ctrl).html(html);
        }
    });
}