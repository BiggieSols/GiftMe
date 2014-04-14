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
    var navFriendSearchView = new GiftMe.Views.NavFriendSearchView();
    $('#friend-search-form').html(navFriendSearchView.render().$el);
  },

  dispatcher: _.clone(Backbone.Events)
};

$(document).ready(function(){
  GiftMe.initialize();
});

