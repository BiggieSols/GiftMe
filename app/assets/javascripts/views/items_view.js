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
        that.$container.html("");
        that.$container.masonry("destroy");
        that._renderItems();
      }
    });
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

  _append: function(itemsToAdd, $container) {
    var that = this;
    itemsToAdd.forEach(function(item) {
      itemView = new GiftMe.Views.ItemView({model: item});
      that.$container.append(itemView.render().$el);
      that.$container.masonry('addItems', itemView.render().$el);
    });

    // initialize Masonry after all images have loaded
    that.$container.imagesLoaded( function() {
      that.$container.masonry();
      that.$('.item').removeClass("loading");
    });
    return this;
  },

   _renderItems: function() {
    var itemView;

    // initialize masonry
    this.$container = this.$el.find('.items');
    this.$container.masonry({
      isFitWidth: true
    });

    var itemsToAdd = this.collection.models;
    this._append(itemsToAdd);

    this.listenForScroll();
    console.log("all pages rendered");
    return this;
  },

  _renderNewItems: function() {
    var itemsToAdd = this.collection.models.slice(this.collection.models.length - 20);
    this._append(itemsToAdd);
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
            that._renderNewItems();
          }
        });
      }
    }
  },

});