GiftMe.Views.ItemView = Backbone.View.extend({
  template: JST["items/show"],

  tagName: "span",

  render: function() {
    var renderedContent = this.template({
      item: this.model
    });
    
    this.$el.html(renderedContent);
    return this;
  }
});