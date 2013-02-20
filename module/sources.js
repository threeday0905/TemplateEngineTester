(function(window, $) {
  'use strict';
  var Source = function(type, num) {
    var total = (!isNaN(num) && num > 0) ? num : Source.defaultNum;
    this.type = type;
    switch(type) {
      case 'xml': 
        this.text = Source.outputXML(total);
        this.value = $.parseXML(this.text);
        break;
      case 'json':
        this.text = Source.outputJSON(total);
        this.value = $.parseJSON(this.text);
        break;
      default:
        this.value = '';
        break;
    }
  };

  Source.defaultNum = 30;
  Source.defaultNumMap = {
    't1': 30,
    't2': 100,
    's1': 1000,
    's2': 3000,
    's3': 5000,
    'm': 10000,
    'b': 30000,
    'h': 50000
  };
  Source.outputXML = function(num) {
    var str ='', total = parseInt((!isNaN(num) && num > 0) ? num : Source.defaultNum, 10), i;
    str = '\
<?xml version="1.0" encoding="UTF-8"?>\r\n\
<data>\r\n\
  <header>My CD Collection</header>\r\n\
  <catalog>\r\n\
  ';

    for (i=1;i<=total;i += 1) {
      str += '\
    <cd>\r\n\
      <type>' + ( ( i % 4 === 0) ? 'movie' : ( i % 4 === 1 ) ? 'music' : ( i % 4 === 2 ) ? 'opera' : 'sport' ) + '</type>\r\n\
      <title>Lord of the Rings Vol.' + i + '</title>\r\n\
      <artist>Bob Dylan</artist>\r\n\
      <year>' + new Array(5 - (i + '').length + 1).join('0') + i + '</year>\r\n\
    </cd>\r\n';
    }
    str += '\
  </catalog>\r\n\
</data>\
  ';
    return str;
  };

  Source.outputJSON = function(num) {
    var str ='', total = parseInt((!isNaN(num) && num > 0) ? num : Source.defaultNum, 10),i;
    str = '\
{\r\n\
  "header": "My CD Collection",\r\n\
  "catalog": [\r\n\
';

    for (i=1;i<=total;i+=1) {
      str += '\
    {\r\n\
      "type": "' + ( ( i % 4 === 0) ? 'movie' : ( i % 4 === 1 ) ? 'music' : ( i % 4 === 2 ) ? 'opera' : 'sport' ) + '",\r\n\
      "title": "Lord of the Rings Vol.' + i + '",\r\n\
      "artist": "Bob Dylan",\r\n\
      "year": "' + new Array(5 - (i + '').length + 1).join('0') + i + '"\r\n\
    }' + ((i === total) ? '' : ',') + '\r\n';
    }
    str += '\
  ]\r\n\
}\r\n\
';
    return str;//$.parseJSON(str);
  };

  Source.switchToNum = function(type) {
    var total = Source.defaultNum;
    if (type === 'string' && Source.defaultNumMap[type]) {
      total = Source.defaultNumMap[type];
    } else if (!isNaN(parseFloat(type)) && isFinite(type)) {
      total = type;
    }
    
    window.sources = {
      xml: new Source('xml', total),
      json: new Source('json', total)
    };
    
  };

  Source.genControler = function() {
    var key, value, id,
      $container = $('<div />'),
      $controler = $('<div />').html('<label>Row Num:<lable>').appendTo($container),
      $link = $('<div />').html('<label>Watch Source: <lable>').appendTo($container),
      fixRadio = function() { this.blur(); this.focus(); },
      switchTo = function() { Source.switchToNum($(this).val()); };
      
    for (key in Source.defaultNumMap) {
      if (Source.defaultNumMap.hasOwnProperty(key)) {
        value = Source.defaultNumMap[key];
        id = 'source_ctl_' + key;
        
        $('<input />', { 
          id: id, 
          type: 'radio', 
          name: 'source_ctl',
          checked: (value === Source.defaultNum),
          value: value,
          click: fixRadio,
          change: switchTo
        }).appendTo($controler);
        $('<label />', { 'for': id, 'text': value}).appendTo($controler);
      }
    }
    $('<a />', {
      href: '#', text: 'xml',
      click: function() {
        window.open('', 'xml_source', 'width=600,height=600,location=0,menubar=0,status=1,toolbar=0,resizable=1,scrollbars=1').document.write('<pre>' + window.sources.xml.text.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>');
      }
    }).appendTo($link);
    $('<a />', {
      href: '#', text: 'json',
      click: function() {
        window.open('', 'json_source', 'width=600,height=600,location=0,menubar=0,status=1,toolbar=0,resizable=1,scrollbars=1').document.write('<pre>' + window.sources.json.text + '</pre>');
      }
    }).appendTo($link);
    
    return $container;
  };

  window.Source = Source;
  window.sources = {};
  
  Source.switchToNum(Source.defaultNum);
  
}(window, jQuery));