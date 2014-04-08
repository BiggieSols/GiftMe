window.GiftMe = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new GiftMe.Routers.Router({$rootEl: $('#content')});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  GiftMe.initialize();
});