(function(window, $) {
  'use strict';
  var Timer, Engine, TemplateHandler;
  Timer = function(start, end, hasError) {
    this.start = start;
    this.end = end;
    this.during = end.valueOf() - start.valueOf();
    this.error = hasError;
  };

  Timer.compute = function(method, tryCatch) {
    var start, end, hasError = false;
    start = new Date();
    if (typeof method === 'function') {
      if (tryCatch) {
        try {
          method();
        } catch(err){
          hasError = true;
        } finally {
          end = new Date();
        }
      } else {
        method();
        end = new Date();
      }
    }
    
    return new Timer(start, end, hasError);
  };

  Engine = function(key, name, dataType, init, render) {
    var that = this;
    this.key = key;
    this.name = name;
    this.template = '';
    this.result = '';
    this.dataType = dataType;
    this.originalRender = render;
    this.originalInit = init;
    
    this.render = (typeof render === 'function') ? function() {
      if (!window.sources[dataType]) { throw new Error(that.key + ' Source Loading Fail'); }
      that.result = render.call(that, window.sources[dataType].value, that.template);
      return that.result;
    } : function(){};
    
    if (typeof init === 'function') {
      init.call(that);
    }
  };

  TemplateHandler = function(methods) {
    var that = this, templates = window.templates;
    this.engines = [];
    this.init = function() {
      var i, len, d;
      if (!methods || !methods.length) { return; }
      if (methods === 'all') {
        for ( i in templates) {
          if (templates.hasOwnProperty(i)) {
            that.engines.push({key: i, engine: templates[i] });
          }
        }
      } else {
        if (typeof methods === 'string') { methods = [ methods ]; }
        if (Object.prototype.toString.call( methods ) === '[object Array]'){
          for ( i = 0, len = methods.length; i < len; i += 1) {
            if (templates[methods[i]]) {
              that.engines.push( {key: methods[i], engine: templates[methods[i]] });
            }
          }
        }
      }
    };
    this.execute = function(key) {
      var method, i, len;
      if (that.engines.length) {
        if (key) {
          for ( i = 0, len = that.engines.length; i < len; i += 1) {
            if (that.engines[i].key === key) {
              method = that.engines[i].engine;
              break;
            }
          }
        } else {
          method = that.engines[0].engine;
        }
      }

      return (!!method) ? method.render() : '';
    };
    
    this.init();
  };
  
  window.Timer = Timer;
  window.Engine = Engine;
  window.TemplateHandler = TemplateHandler;
} (window, jQuery));