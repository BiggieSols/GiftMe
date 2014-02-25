GiftMe.Views.ItemsView = Backbone.View.extend({ 
  template: JST["items/index"],
  itemsSkeleton: JST["items/index_skeleton"],
  loading: JST["items/loading"],
  filters: JST["items/filters"],

  events: {
    'submit #item-filters':'resetCollection',
  },

  resetCollection: function(event) {
    event.preventDefault();
    formData = $(event.currentTarget).serializeJSON();
    this.collection = GiftMe.items = new GiftMe.Collections.Items(formData);
    var that = this;
    this.collection.fetch({
      success: function() {
        console.log("great success");
        that._renderItems();
      }
    });
    this.$el.find("#container").empty();
    // console.log("it works!");
  },

  initialize: function() {
    this.listenToOnce(this.collection, "sync", this.render);
  },

  render: function() {
    this._renderSkeleton()
        ._renderFilters()
        ._renderItems()
        ._renderLoadingBar();

    this._toggleLoadingBar();
    return this;
  },

  _renderFilters: function() {
    var renderedContent = this.filters();
    this.$el.find("#filters").html(renderedContent);
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
    var that = this;
    $container.imagesLoaded( function() {
      // $('.items').css("display", "block");
      $container.masonry();
      that.$('.item').removeClass("loading");
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

  _toggleLoadingBar: function() {
    $('.loading-bar').slideDown("slow");
  },

  nextPage: function () {
    var that = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 10) {
      console.log("scrolled to bottom!");

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