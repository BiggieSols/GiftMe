GiftMe.Views.FilterView = Backbone.View.extend({
  template: JST['items/filters'],
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }
});