window.GiftMe = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new GiftMe.Routers.Router({$rootEl: $('#content')});
    Backbone.history.start();
    // this.loadNav();
  },

  loadNav: function() {
    var friendSearchView = new GiftMe.FriendSearchView();
    $('#friend-search-form').html(friendSearchView.render().$el);
  }
};

$(document).ready(function(){
  GiftMe.initialize();
});

