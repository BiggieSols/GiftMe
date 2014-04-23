GiftMe.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    GiftMe.items = new GiftMe.Collections.Items({});
    GiftMe.users = new GiftMe.Collections.Users();
    GiftMe.currentUser = new GiftMe.Models.User({id: "current"});
    // GiftMe.users.add(GiftMe.currentUser);

    GiftMe.items.fetch();
    GiftMe.currentUser.fetch();
    GiftMe.users.fetch({
      success: function() {
        GiftMe.loadNav();
      }
    });
  },

  routes: {
    "users/:id/recommended": "recommended_items",
    "users/:id": "user",
    "items/:id": "item",
    "items": "all_items",
    "friends":"friends",
    "onboard":"onboard"
  },

  all_items: function() {
    GiftMe.items.fetch({remove: false});
    itemsView = new GiftMe.Views.ItemsView({collection: GiftMe.items, showRecForm: true});
    this._swapView(itemsView);
  },

  friends: function() {
    if(GiftMe.users.length > 1) {
      var friendsView = new GiftMe.Views.FriendsView({collection: GiftMe.users});
      this._swapView(friendsView);
    } else {    
      var that = this;
      GiftMe.users.fetch({
        success: function() {
          var friendsView = new GiftMe.Views.FriendsView({collection: GiftMe.users});
          that._swapView(friendsView);
        }
      });
    }
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

  onboard: function() {
    // TODO: have the user's friends load in the background here instead of at login to improve efficiency
    var onboardView = new GiftMe.Views.OnboardView({model: GiftMe.currentUser});
    this._swapView(onboardView);
  },

  recommended_items: function(id) {
    this._showItems({id: id, recommended: true});
  },

  user: function(id) {
    this._showItems({id: id});
  },


  _getItem: function(id, callback) {
    var item = GiftMe.items.get(id);
    if (!item) {
      GiftMe.items.fetch({
        success: function() {
          callback(GiftMe.items.get(id));
        }
      });
    } else {
      callback(item);
    }
  },


  _getUser: function(id, callback) {
    var user = GiftMe.users.get(id);

    console.log("un-fetched user is below");
    console.log(user);

    if (!user) {
      console.log("fetching");
      GiftMe.users.fetch({
        success: function() {
          console.log("fetched user is below");
          console.log(user);
          callback(GiftMe.users.get(id));
        }
      });
    } else {
      callback(user);
    }
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

  _swapView: function(view) {
    if(this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;

    this.$rootEl.html(view.render().$el);
    // $('body').animate({ scrollTop: 0 }, 0);
  }
});