GiftMe.Views.UserView = Backbone.View.extend({
  template: JST["users/show"],

  initialize: function() {
  },

  render: function() {
    return this._renderSkeleton()._renderWantedItems();
  },

  _renderSkeleton: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  _renderWantedItems: function() {
    var items = new GiftMe.Collections.Items({userId: this.model.id});
    var $elToFill = this.$el.find(".wanted-items");
    items.fetch({
      success: function() {
        console.log("success!");
        var itemsView = new GiftMe.Views.ItemsView({collection: items});
        $elToFill.html(itemsView.render().$el);
        // return this;
      }
    });
    return this;
  },

  // _renderWantedItems: function() {

  // }
});