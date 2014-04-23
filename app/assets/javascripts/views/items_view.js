GiftMe.Views.ItemsView = Backbone.View.extend({
  itemsSkeleton: JST["items/index"],
  loading: JST["items/loading"],
  filters: JST["items/filters"],

  events: {
    'submit #item-filters':'resetCollection',
  },

  initialize: function() {
    this.listenToOnce(this.collection, "sync", this.render);

    var that = this;

    GiftMe.dispatcher.on("newRecFormRender", function() {
      that.$('.recommend-item').html("");
    });
  },

  resetCollection: function(event) {
    var newItems;

    event.preventDefault();

    formData = $(event.currentTarget).serializeJSON();
    newItems = new GiftMe.Collections.Items(formData);
    if(this.collection.userId) newItems.userId = this.collection.userId;

    this.collection = newItems;
    var that = this;
    this.collection.fetch({
      success: function() {
        that._removeLoadingBar();
        that.$container.html("");
        that.$container.masonry("destroy");

        // note: need to render loading bar first
        that._renderLoadingBar()._renderItems();
        that._showLoadingBar();
      }
    });
  },


  render: function() {
    this._renderSkeleton()
        ._renderFilters()
        ._renderLoadingBar()
        ._renderItems();

    this._showLoadingBar();
    return this;
  },

  _renderFilters: function() {
    var filterView = new GiftMe.Views.FilterView({collection: this.collection});
    this.$el.find("#filters").html(filterView.render().$el);
    return this;
  },

  _renderSkeleton: function() {
    var renderedContent = this.itemsSkeleton({items: this.collection});
    this.$el.html(renderedContent);
    return this;
  },

  _renderLoadingBar: function() {
    var renderedContent = this.loading();
    this.$el.append(renderedContent);
    return this;
  },

  _append: function(itemsToAdd) {
    if(itemsToAdd.length > 0) {
      var that = this;
      itemsToAdd.forEach(function(item) {
        itemView = new GiftMe.Views.ItemView({model: item});
        that.$container.append(itemView.render().$el);
        that.$container.masonry('addItems', itemView.render().$el);
      });

      // initialize Masonry after all images have loaded
      this.$container.imagesLoaded(function() {
        that.$container.masonry();
        that.$('.item').removeClass("loading");
      });

    } else {
      var errorView = new GiftMe.Views.NoItemsError();
      this.$container.html(errorView.render().$el);
    }


    this._checkLoadingBar();
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

  _showLoadingBar: function() {
    $('.loading-bar').slideDown("slow");
  },

  _removeLoadingBar: function() {
    // console.log("removing loading bar");
    this.$el.find('.loading-bar').remove();
  },

  _checkLoadingBar: function() {
    // console.log("testing loading bar");
    console.log("total pages: " + this.collection.total_pages);
    console.log("page number: " + this.collection.page_number);

    if(this.collection.page_number >= this.collection.total_pages) {
      this._removeLoadingBar();
    }
  },

  nextPage: function () {
    var that = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 300) {
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