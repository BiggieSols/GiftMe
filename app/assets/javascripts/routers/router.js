GiftMe.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    GiftMe.items = new GiftMe.Collections.Items({});
    GiftMe.users = new GiftMe.Collections.Users();
    GiftMe.currentUser = new GiftMe.Models.User({id: "current"});
    GiftMe.users.add(GiftMe.currentUser);

    GiftMe.items.fetch();
    GiftMe.currentUser.fetch();
    GiftMe.users.fetch();
  },

  routes: {
    "users/:id/recommended": "recommended_items",
    "users/:id": "user",
    "items/:id": "item",
    "items": "all_items",
    "friends":"friends"
  },

  recommended_items: function(id) {
    this._showItems({id: id, recommended: true});
  },

  user: function(id) {
    this._showItems({id: id});
  },

  _showItems: function(options) {
    var id, recommended, params, userView, that;

    that = this;
    
    id = options.id;
    recommended = options.recommended;

    this._getUser(id, function(user) {
      params = {model: user};
      if(recommended) params.recommended = true;
      userView = new GiftMe.Views.UserView(params);
      that._swapView(userView);
    });
  },

  all_items: function() {
    GiftMe.items.fetch({remove: false});
    var itemsView = new GiftMe.Views.ItemsView({collection: GiftMe.items});
    this._swapView(itemsView);
  },

  // TODO: change visibility to "visible" to display item. will want a container view to give the necessary info here
  item: function(id) {
    console.log("attempting to render single item");

    var that = this;

    this._getItem(id, function(item) {
      var itemView = new GiftMe.Views.ItemView({model: item});
      that._swapView(itemView);
      console.log("swapped view");
    });
  },

  friends: function() {

    if(GiftMe.friends) {
      var friendsView = new GiftMe.Views.FriendsView({collection: GiftMe.friends});
      this._swapView(friendsView);
    } else {    
      GiftMe.friends = new GiftMe.Collections.Friends();
      var that = this;
      GiftMe.friends.fetch({
        success: function() {
          var friendsView = new GiftMe.Views.FriendsView({collection: GiftMe.friends});
          that._swapView(friendsView);
        }
      });
    }
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
    var user = GiftMe.users.get(id);
    if (!user) {
      GiftMe.users.fetch({
        success: function() {
          callback(GiftMe.users.get(id));
        }
      });
    } else {
      callback(user);
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