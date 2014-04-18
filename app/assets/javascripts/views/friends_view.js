GiftMe.Views.FriendsView = Backbone.View.extend({
  template: JST["users/friends"],

  initialize: function() {
    this.listenToOnce(this.collection, "sync", this.render);
  },

  render: function() {
    var renderedContent = this.template({friends: this.collection});
    this.$el.html(renderedContent);
    this.$('img.lazy').lazyload({threshold: 100});
    return this;
  }
}); 
