GiftMe.Views.FavoriteButtonView = Backbone.View.extend({
  template: JST["items/favorite_button_view"],

  initialize: function() {
    this.listenTo(GiftMe.currentUser, "sync", this.render);
  },

  render: function() {
    var renderedContent = this.template({
      user: GiftMe.currentUser,
      item: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});