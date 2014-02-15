GiftMe.Views.ItemsView = Backbone.View.extend({ 
  template: JST["items/index"],
  itemsSkeleton: JST["items/index_skeleton"],
  initialize: function() {
    this.listenToOnce(this.collection, "sync", this.render);
  },
  render: function() {
    this._renderSkeleton()._renderItems();
    return this;
  },

  _renderSkeleton: function() {
    var renderedContent = this.template({items: this.collection});
    this.$el.html(renderedContent);
    return this;
  },

  _renderItems: function() {
    var itemView, $elToFill;
    $elToFill = this.$el.find('.items');

    this.collection.models.forEach(function(item) {
      itemView = new GiftMe.Views.ItemView({model: item});
      $elToFill.append(itemView.render().$el);
    });
    return this;
  }
});