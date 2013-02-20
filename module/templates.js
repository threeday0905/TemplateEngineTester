(function(window, $) {
  'use strict';
  var Engine = window.Engine, templates;
  templates = {
    xml_xslt: new Engine('xml_xslt', '[XML] XSLT Process', 'xml', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script', url: './library/template/jquery.xslt.min.js'} );
      $.ajax({ async: false, dataType: 'xml',   url: './resource/template/xml_xslt.xml'} )
        .done(function(data) { that.template = data; });
    },function(source, template) {
      var result;
      $.xslt({xml: source, xsl: template, callback: function(data) { result = data; }});
      this.result = result;
      return this.result;
    }),
    xml_jquery: new Engine('xml_jquery', '[XML] jQuery Find', 'xml', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script',   url: './resource/template/xml_jquery.js'} )
        .done(function() { 
          (function(tmpFn) { that.template = tmpFn; }(window.tmpFn));
        });
    },function(source, template) {
      this.result = template(source);
      return this.result;
    }), 
    js_handlebars: new Engine('js_handlebars', '[Library] handlebars.js','json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script', url: './library/template/handlebars.min.js'} );
      $.ajax({ async: false, dataType: 'text',   url: './resource/template/js_handlebars.txt'} )
        .done(function(data) { that.template = data; });
    },function(source, template) {
      var engine = window.Handlebars.compile(template);
      this.result = engine(source);
      return this.result;
    }),
    js_underscore: new Engine('js_underscore', '[Library] underscore.js', 'json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script', url: './library/template/underscore.min.js'} );
      $.ajax({ async: false, dataType: 'text',   url: './resource/template/js_underscore.txt'} )
        .done(function(data) { that.template = data; });
    },function(source, template) {
      this.result = window._.template(template, {data: source});
      return this.result;
    }),
    js_dust: new Engine('js_dust', '[Library] dust.js', 'json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script', url: './library/template/dust.min.js'} );
      $.ajax({ async: false, dataType: 'text',   url: './resource/template/js_dust.txt'} )
        .done(function(data) { that.template = data; });
    },function(source, template) {
      var result, tpl, dust = window.dust;
      tpl = dust.compile(template, 'tpl');
      dust.loadSource(tpl);
      dust.render('tpl', source, function(err, html) {
        result = html;
      });
      this.result = result;
      return this.result;
    }),
    js_mustache: new Engine('js_mustache', '[Library] mustache.js', 'json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script', url: './library/template/mustache.js'} );
      $.ajax({ async: false, dataType: 'text',   url: './resource/template/js_mustache.txt'} )
        .done(function(data) { that.template = data; });
    },function(source, template) {
      this.result = window.Mustache.to_html(template, source);
      return this.result;
    }),
    js_pure: new Engine('js_pure', '[Library] pure.js', 'json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script', url: './library/template/pure.min.js'} );
      $.ajax({ async: false, dataType: 'text',   url: './resource/template/js_pure_template.txt'} )
        .done(function(data) { that.template = data; });
      $.ajax({ async: false, dataType: 'json',   url: './resource/template/js_pure_binding.txt'} )
        .done(function(data) { that.binding = data; });
    }, function(source, template) {
      var html = template;
      this.result = $('<div></div>').html(template).render(source, this.binding).html();
      return this.result;
    }),
    js_dot: new Engine('js_dot', '[Library] doT.js', 'json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script', url: './library/template/doT.js'} );
      $.ajax({ async: false, dataType: 'text',   url: './resource/template/js_dot.txt'} )
        .done(function(data) { that.template = data; });
    },function(source, template) {
      var tempFn = window.doT.template(template);
      this.result = tempFn(source);
      return this.result;
    }),
    js_jqote2: new Engine('js_jqote2', '[Library] jQote2.js', 'json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script', url: './library/template/jquery.jqote2.min.js'} );
      $.ajax({ async: false, dataType: 'text',   url: './resource/template/js_jqote2.txt'} )
        .done(function(data) { that.template = data; });
    },function(source, template) {
      this.result = $('<script/>').html(template).jqote(source);
      return this.result;
    }),
    js_jquerytmpl: new Engine('js_jquerytmpl', '[Library] jQuery template.js', 'json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script', url: './library/template/jquery.tmpl.min.js'} );
      $.ajax({ async: false, dataType: 'text',   url: './resource/template/js_jquerytmpl.txt'} )
        .done(function(data) { that.template = data; });
    },function(source, template) {
      $.template( "test", template);
      this.result = $.tmpl( "test", source );
      return this.result;
    }), 
    native_array_join: new Engine('native_array_join', '[Native Code] Array.join()', 'json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script',   url: './resource/template/native_array_join.js'} )
        .done(function() { 
          (function(tmpFn) { that.template = tmpFn; }(window.tmpFn));
        });
    }, function(source, template) {
      this.result = template(source);
      return this.result;
    }),
    native_string_concat: new Engine('native_string_concat', '[Native Code] String.concat()', 'json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script',   url: './resource/template/native_string_concat.js'} )
        .done(function() { 
          (function(tmpFn) { that.template = tmpFn; }(window.tmpFn));
        });
    }, function(source, template) {
      this.result = template(source);
      return this.result;
    }),
    native_string_plus: new Engine('native_string_plus', '[Native Code] String + String', 'json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script',   url: './resource/template/native_string_plus.js'} )
        .done(function() { 
          (function(tmpFn) { that.template = tmpFn; }(window.tmpFn));
        });
    }, function(source, template) {
      this.result = template(source);
      return this.result;
    }),
    native_html_replace: new Engine('native_html_replace', '[Native Code] jQuery Replace', 'json', function() {
      var that = this;
      $.ajax({ async: false, dataType: 'script',   url: './resource/template/native_html_replace.js'} )
        .done(function() { 
          (function(tmpFn) { that.template = tmpFn; }(window.tmpFn));
        });
    }, function(source, template) {
      this.result = template(source);
      return this.result;
    })
  };
  
  window.templates = templates;
} (window, jQuery));