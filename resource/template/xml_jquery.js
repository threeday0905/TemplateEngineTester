var tmpFn = function(source) {
  var $xml = $(source), str = [];
  str.push('<h1>', $xml.find('data > header').text(), '</h1>', '<ul>');
  $xml.find('data > catalog > cd').each(function() {
    var $this = $(this);
    str.push('<li class="', $this.find('type').text(), '">', 
      '<mark>', $this.find('year').text(), '</mark>', ' - ', 
      '<span>', $this.find('title').text(), '</span>', ' - ', '<span>', $this.find('artist').text(), '</span>', 
            '</li>');
  });
  str.push('</ul>');
  return str.join('');
};