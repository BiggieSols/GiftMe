GiftMe.Views.FriendsView = Backbone.View.extend({
  template: JST["users/friends"],

  initialize: function() {
    this.listenToOnce(this.collection, "sync", this.render);
  },

  // test: function() {
  //   console.log("re-rendering view");
  // },

  render: function() {
    var renderedContent = this.template({friends: this.collection});
    this.$el.html(renderedContent);
    return this;
  }
});