GiftMe.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    GiftMe.items = new GiftMe.Collections.Items({category: "all", minPrice: 0, maxPrice: 100000000});
    GiftMe.items.fetch();
  },

  routes: {
    "users/:id": "user",
    "items": "all_items",
    "items/:id": "item"
  },

  user: function(id) {

  },

  all_items: function() {
    if(GiftMe.items.length === 0) GiftMe.items.fetch();
    var itemsView = new GiftMe.Views.ItemsView({collection: GiftMe.items});
    this._swapView(itemsView);
  },

  item: function(id) {
    var that = this;

    this._getItem(id, function(item) {
      // var itemView = new GiftMe.Views.ItemView({model: item});
      itemView = new GiftMe.Views.ItemView({model: item});
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

  _swapView: function(view) {
    if(this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;

    this.$rootEl.html(view.render().$el);
    $('body').animate({ scrollTop: 0 }, 0);
  }

});


  // initialize: function(options) {
  //   this.$rootEl = options.$rootEl;
  //   // initializing collections to track previously loaded info
  //   EggsBook.users = new EggsBook.Collections.Users();
  //   EggsBook.posts = new EggsBook.Collections.Posts();
  //   EggsBook.comments = new EggsBook.Collections.Comments();
  //   EggsBook.foods = new EggsBook.Collections.Foods();
  //   EggsBook.currentUser = new EggsBook.Models.User({'id': 'current'});
  //   EggsBook.feed = new EggsBook.Collections.Feed();

  //   EggsBook.foods.fetch();
  //   EggsBook.posts.fetch();
  // },

  // routes: {
  //   'feed': 'feed',
  //   'users/:id' : 'user',
  //   'posts/:id' : 'post'
  // },

  // post: function(id) {
  //   if(!EggsBook.currentUser.get('name')) EggsBook.currentUser.fetch();
  //   console.log("on show post route");
  //   var that = this;

  //   this._getPost(id, function(post) {
  //     var postView = new EggsBook.Views.PostView({model: post});
  //     that._swapView(postView);
  //   });
  // },

  // feed: function() {
  //   EggsBook.currentUser.fetch();
  //   var feedView = new EggsBook.Views.FeedView({collection: EggsBook.feed});
  //   this._swapView(feedView);

  //   // begin pre-loading users
  //   if(EggsBook.users.models.length === 0) EggsBook.users.fetch();
  // },

  // user: function(id) {
  //   $(document).scrollTop();
  //   if(!EggsBook.currentUser.get('name')) EggsBook.currentUser.fetch();

  //   var that = this;
  //   this._getUser(id, function(user) {
  //     var userProfileView = new EggsBook.Views.UserProfileView({model: user});
  //     that._swapView(userProfileView);
  //   });
  // },

  // _getPost: function(id, callback) {
  //   var post = EggsBook.posts.get(id);
  //   if (!post) {
  //     EggsBook.posts.fetch({
  //       success: function() {
  //         callback(EggsBook.posts.get(id));
  //       }
  //     });
  //   } else {
  //     callback(post);
  //   }
  // },

  // // change this to pull down all users. less secure, but will be faster.
  // _getUser: function(id, callback) {
  //   var user = EggsBook.users.get(id);
  //   if (!user) {
  //     EggsBook.users.fetch({
  //       success: function() {
  //         callback(EggsBook.users.get(id));
  //       }
  //     });
  //   } else {
  //     callback(user);
  //   }
  // },

  // _swapView: function(view) {
  //   if(this.currentView) {
  //     this.currentView.remove();
  //   }
  //   this.currentView = view;

  //   this.$rootEl.html(view.render().$el);
  //   $('body').animate({ scrollTop: 0 }, 0);
  // }