GiftMe.Views.ItemView = Backbone.View.extend({
  template: JST["items/show"],

  tagName: "span",

  events: {
    // 'mouseover .item':'highlight',
    // 'mouseout .item':'unHighlight'
  },

  highlight: function(event) {
    $(event.currentTarget).addClass("highlight");
  },

  unHighlight: function(event) {
    $(event.currentTarget).removeClass("highlight");
  },


  render: function() {
    return this._renderItem()
               ._renderFavoriteButton()
               ._renderRecommendForm();
  },

  _renderItem: function() {
    var price = parseInt(this.model.get("price")) / 100;
    var tempPriceStr = price.toString();
    var priceStr = (price % 1 > 0) ? price : tempPriceStr + ".00";

    var renderedContent = this.template({
      item: this.model,
      price: priceStr,
      user: GiftMe.currentUser
    });
    
    this.$el.html(renderedContent);

    this.$el.imagesLoaded(function() {
        $('.recommending-user').tooltip();
    });
    
    return this;
  },

  _renderFavoriteButton: function() {
    var $elToUpdate = this.$(".favorite-button");
    // console.log($elToUpdate.html());
    var favoriteButtonView = new GiftMe.Views.FavoriteButtonView({model: this.model});
    $elToUpdate.html(favoriteButtonView.render().$el);
    return this;
  },

  _renderRecommendForm: function() {
    var $elToUpdate = this.$(".recommend-item");
    var recommendBoxView = new GiftMe.Views.ItemFriendSearchView();
    $elToUpdate.html(recommendBoxView.render().$el);
    return this;
  }
});