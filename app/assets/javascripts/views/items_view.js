GiftMe.Views.ItemsView = Backbone.View.extend({ 
  template: JST["items/index"],
  itemsSkeleton: JST["items/index_skeleton"],
  initialize: function() {
    this.listenToOnce(this.collection, "sync", this.render);
  },
  render: function() {
    this._renderSkeleton()._renderItems();
    // initialize masonry
    return this;
  },

  _renderSkeleton: function() {
    var renderedContent = this.template({items: this.collection});
    this.$el.html(renderedContent);
    return this;
  },

  _renderItems: function() {
    var itemView, $container;
    $container = this.$el.find('.items');

    this.collection.models.forEach(function(item) {
      itemView = new GiftMe.Views.ItemView({model: item});
      $container.append(itemView.render().$el);
    });

    // initialize Masonry after all images have loaded
    $container.imagesLoaded( function() {
      $container.masonry();
      $('.item').removeClass("loading");
    });

    return this;
  }
});