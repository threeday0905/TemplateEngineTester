var tmpFn = function(source) {
  var str = [], i, len, d;
  str.push('<h1>', source.header, '</h1>', '<ul>');
  for (i = 0, len = source.catalog.length; i < len; i++) {
    d = source.catalog[i];
    str.push('<li class="', d.type, '">', 
              '<mark>', d.year, '</mark>', ' - ', 
              '<span>', d.title, '</span>', ' - ', '<span>', d.artist, '</span>', 
             '</li>');
  }
  str.push('</ul>');
  return str.join('');
};