GiftMe.Views.ItemsView = Backbone.View.extend({ 
  template: JST["items/index"],
  itemsSkeleton: JST["items/index_skeleton"],
  initialize: function() {
    this.listenToOnce(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.render);
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
      // $('.item').removeClass("loading");
    });

    this.listenForScroll();

    return this;
  },

  listenForScroll: function () {
    $(window).off("scroll"); // remove past view's listeners
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    var self = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      console.log("scrolled to bottom!");
      if (self.collection.page_number < self.collection.total_pages) {
        self.collection.fetch({
          data: { page: ++self.collection.page_number + 1 },
          remove: false,
          wait: true,
          success: function () {
            console.log("successfully fetched page " + self.collection.page_number);
          }
        });
      }
    }
  },

});