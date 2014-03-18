GiftMe.Views.NoItemsError = Backbone.View.extend({
  template: JST['items/no_items'],

  render: function() {
    var renderedContent = this.template({});
    this.$el.html(renderedContent);
    return this;
  }
});