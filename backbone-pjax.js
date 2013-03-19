Backbone.Pjax = (function () {
  "use strict";
 
  var History = Backbone.History.extend({
    "navigate": function(fragment, options) {
      if (!Backbone.History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;
 
      if (!this._hasPushState) {
        if (this._wantsHashChange) {
          this._updateHash(this.location, fragment, options.replace);
          if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
            if(!options.replace) this.iframe.document.open().close();
            this._updateHash(this.iframe.location, fragment, options.replace);
          }
        } else {
          return this.location.assign(url);
        }
      }
      if (options.trigger) this.loadUrl(fragment);
    }
  });
  var Router = Backbone.Router.extend({
    "pjax" : {
    },
    "getPjaxContainer" : function () {
      return this.pjax.container;
    },
    "getPjaxOptions" : function () {
      return this.pjax.options;
    },
    "pjaxInit" : function () {
      $(document).pjax('a', this.getPjaxContainer(), this.getPjaxOptions());
      this.registerPjaxEvents();
      this.on('pjax:complete', this.pjaxNavigate);
    },
    "pjaxNavigate" : function () {
      this.navigate(location.pathname.substr(1), true);
    },
    "registerPjaxEvents" : function () {
      var router = this;
      var $document = $(document);
      _.each(['start', 'end'], function(name) {
        $document.on('pjax:'+name, function(e, options) {
          router.trigger('pjax:'+name, e, options);
        });
      });
      _.each(['beforeSend', 'send', 'complete', 'success', 'error', 'timeout'], function (name) {
        $document.on('pjax:'+name, function(e, args) {
          router.trigger('pjax:'+name, e, args);
        });
      });
      return router;
    },
    "navigate" : function (fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    }
  });
 
  Backbone.history = new History();
 
  return {
    "History" : History,
    "Router"  : Router
  };
})();
