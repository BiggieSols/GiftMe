GiftMe.Views.ItemView = Backbone.View.extend({
  template: JST["items/show"],

  render: function() {
    console.log(this.model.get("category"));
    var renderedContent = this.template({
      item: this.model
    });
    
    this.$el.html(renderedContent);
    return this;
  }
});