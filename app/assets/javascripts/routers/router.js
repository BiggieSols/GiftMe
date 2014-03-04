GiftMe.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    GiftMe.items = new GiftMe.Collections.Items({});
    GiftMe.users = new GiftMe.Collections.Users();
    GiftMe.currentUser = new GiftMe.Models.User({id: "current"});
    GiftMe.users.add(GiftMe.currentUser);

    GiftMe.items.fetch();
    GiftMe.currentUser.fetch();
  },

  routes: {
    "users/:id": "user",
    "items": "all_items",
    "items/:id": "item"
  },

  user: function(id) {
    // optimize with _getUser method
    var user = new GiftMe.Models.User({id: id});
    var that = this;
    user.fetch({
      success: function() {
        console.log("it works!");
        var userView = new GiftMe.Views.UserView({model: user});
        that._swapView(userView);
      }
    });
  },

  all_items: function() {
    if(GiftMe.items.length === 0) GiftMe.items.fetch();
    var itemsView = new GiftMe.Views.ItemsView({collection: GiftMe.items});
    this._swapView(itemsView);
  },

  item: function(id) {
    var that = this;

    this._getItem(id, function(item) {
      var itemView = new GiftMe.Views.ItemView({model: item});
      that._swapView(itemView);
    });
  },

  _getItem: function(id, callback) {
    var item = GiftMe.items.get(id);
    if (!item) {
      GiftMe.items.fetch({
        success: function() {
          // console.log("here's the item!");
          // console.log(GiftMe.items.get(id));
          callback(GiftMe.items.get(id));
        }
      });
    } else {
      callback(item);
    }
  },

  _getUser: function(id, callback) {
    var item = GiftMe.users.get(id);
    if (!item) {
      GiftMe.items.fetch({
        success: function() {
          // console.log("here's the item!");
          // console.log(GiftMe.items.get(id));
          callback(GiftMe.items.get(id));
        }
      });
    } else {
      callback(item);
    }
  },


  _swapView: function(view) {
    if(this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;

    this.$rootEl.html(view.render().$el);
    // $('body').animate({ scrollTop: 0 }, 0);
  }
});