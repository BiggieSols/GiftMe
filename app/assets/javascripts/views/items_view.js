GiftMe.Views.ItemsView = Backbone.View.extend({ 
  template: JST["items/index"],
  itemsSkeleton: JST["items/index_skeleton"],
  loading: JST["items/loading"],

  initialize: function() {
    this.listenToOnce(this.collection, "sync", this.render);
    // this.listenTo(this.collection, "add", this.render);
  },
  render: function() {
    this._renderSkeleton()._renderItems()._renderLoadingBar();
    return this;
  },

  _renderSkeleton: function() {
    var renderedContent = this.template({items: this.collection});
    this.$el.html(renderedContent);
    return this;
  },

  _renderLoadingBar: function() {
    var renderedContent = this.loading();
    this.$el.append(renderedContent);
    return this;
  },

  _renderItems: function() {
    var itemView, $container;

    // initialize on load
    if(!$container) {
      // TODO: move all masonry rules into js. running into some rendering issues here
      $container = this.$el.find('.items');
      $container.masonry({
        isFitWidth: true
      });
    }

    var itemsToAdd = this.collection.models.slice(this.collection.models.length - 20);

    itemsToAdd.forEach(function(item) {
      itemView = new GiftMe.Views.ItemView({model: item});
      $container.append(itemView.render().$el);
      $container.masonry('addItems', itemView.render().$el);
    });

    // initialize Masonry after all images have loaded
    $container.imagesLoaded( function() {
      $('.item').removeClass("loading");
      $container.masonry();
    });

    this.listenForScroll();
    console.log("all pages rendered");
    return this;
  },

  listenForScroll: function () {
    $(window).off("scroll"); // remove past view's listeners
    var throttledCallback = _.throttle(this.nextPage.bind(this), 1000);
    $(window).on("scroll", throttledCallback);
  },

  toggleLoadingBar: function() {
    $('.loading-bar').slideDown("slow");
  },

  nextPage: function () {
    var that = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 10) {
      console.log("scrolled to bottom!");
      that.toggleLoadingBar();

      if (that.collection.page_number < that.collection.total_pages) {
        that.collection.fetch({
          data: { page: ++that.collection.page_number },
          remove: false,
          wait: true,
          success: function () {
            console.log("successfully fetched page " + that.collection.page_number);
            that._renderItems();
          }
        });
      }
    }
  },
});