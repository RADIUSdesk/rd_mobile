Ext.define("RdMobile.mixin.FloatingActionButton", {
  extend: "Ext.Mixin",

  mixinConfig: {
    configs: true,
    on: {
      show: "showFab",
    },
    after: {
      destroy: "destroyFab",
      hide: "hideFab",
    },
  },

  config: {
    // String, Function or Object config
    fab: null,
  },

  updateFab: function (fab) {
    this.destroyFab();

    var config = ['string', 'function'].includes(typeof fab)
      ? { handler: fab }
      : fab;

    if(config.handler) {
      config.handler = typeof config.handler === 'function' 
        ? config.handler 
        : this.getController()[config.handler]
    }

    Ext.applyIf(config, {
      viewModel: {
        parent: this.getViewModel(),
      },
      xtype: "button",
      ui: 'round',
      floated: true,
      iconCls: "x-fa fa-plus",
      right: 20,
      bottom: 140,
      border: false
    });

    this._FAB = Ext.create(config);
  },

  showFab: function () {
    this._FAB && this._FAB.show();
  },

  hideFab: function () {
    this._FAB && this._FAB.hide();
  },

  destroyFab: function () {
    this._FAB && this._FAB.destroy();
    delete this._FAB;
  },
});
