var tmpFn = function(source) {
  var $main = $('<h1></h1><ul></ul>'), 
      $list = $('<li><mark></mark> - <span class="title"></span> - <span class="artist"></span></li'), 
      $container = $('<div></div>'), i, len, d, $ul, $li;
      
  $container.append($main.clone()).find('h1').text(source.header);
  $ul = $container.find('ul');
  for (i = 0, len = source.catalog.length; i < len; i += 1) {
    d = source.catalog[i];
    $li = $list.clone();
    $li.attr('class', d.type);
    $li.find('mark').text(d.year);
    $li.find('.title').text(d.title);
    $li.find('.artist').text(d.artist);
    $ul.append($li);
  }
  return $container.html();
};