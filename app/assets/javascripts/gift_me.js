window.GiftMe = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  showRecommendationConfirm: function() {
    confirmation = new GiftMe.Views.RecommendationConfirmView();
    $('#recommendation-confirm-container').html(confirmation.render().$el);
  },

  initialize: function() {
    this.showRecommendationConfirm();
    
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

