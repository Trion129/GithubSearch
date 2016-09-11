$("document").ready(function(){
  $.material.init();
  $.material.ripples();
});

var language = 'None',stars = 500, data,filter='';

function displayItems(results){
  html = '';
  for(var i = 0;i < results.length;i++){
    html += `<a target="_blank" href="`+results[i].html_url+`"><div class="project">
                  <img class="image" src=`+results[i].owner.avatar_url+`>
                  <div class="project-text">
                      <div class="heading">
                        `+results[i].name+`
                      </div>
                      <div class="body">
                        `+results[i].description+`
                      </div>
                  </div>
              </div></a>`
  }

  $('.project-list')[0].innerHTML = html;

}

function retrieve(){
  filter = $('#search').val();
  $.getJSON('https://api.github.com/search/repositories?q='+(filter?filter+'+':'')+'stars%3A>%3D'+stars+(language != 'None'?'+language%3A'+language:'')+'&page=1&per_page=100', function(res){
    data = res;
    displayItems(res.items);
    $('.items-count')[0].innerHTML = res.total_count + ' results ' + (res.total_count > 100?'(100 shown)':'');
  })
}

function search(){
  console.log('Triggered');
  filter = $('#search').val();
  var reg = new RegExp(filter);
  var results = [];
  for(var i = 0;i < data.items.length;i++){
    if(reg.test(data.items[i].name)){
      results.push(data.items[i]);
    }
  }
  displayItems(results);
  $('.items-count')[0].innerHTML = results.length + ' results';
}

$(document).ready(function(){
  $('#search').on('change', retrieve);
  $('input[name="stars"]').on('change',function(){
    stars = $(this).val();
    $('#starCount')[0].innerHTML = 'Min Stars : ' + stars;
    retrieve();
  })
  $(document).on('change','select',function(){
    language = $(this).val();
    retrieve();
  })
  $('#reset').on('click',function(){
    language = 'None',stars = 500;
    $('input[name="stars"]').val('500');
    $('#search').val('');
    $('select').val('None');
    retrieve();
  })
})

retrieve();
