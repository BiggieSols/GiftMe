GiftMe.Views.ItemView = Backbone.View.extend({
  template: JST["items/show"],

  tagName: "span",

  initialize: function(options) {
    // this.model = options.model;
    this.showRecForm = options.showRecForm;
  },

  events: {
    'mouseenter .item':'showRecommendForm',
    // 'mouseleave .item':'_removeRecommendForm'
  },

  highlight: function(event) {
    $(event.currentTarget).addClass("highlight");
  },

  unHighlight: function(event) {
    $(event.currentTarget).removeClass("highlight");
  },

  showRecommendForm: function() {
    if(this.showRecForm) {
      GiftMe.dispatcher.trigger("newRecFormRender");
      this._renderRecommendForm();
    }
  },

  render: function() {
    return this._renderItem()
               ._renderFavoriteButton();
  },

  _renderItem: function() {
    var price = parseInt(this.model.get("price")) / 100;
    var tempPriceStr = price.toString();
    var priceStr = (price % 1 > 0) ? price : tempPriceStr + ".00";

    var renderedContent = this.template({
      item: this.model,
      price: priceStr,
      user: GiftMe.currentUser,
      showRecForm: this.showRecForm
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
    this.recommendBoxView = new GiftMe.Views.ItemFriendSearchView();
    $elToUpdate.html(this.recommendBoxView.render().$el);
    return this;
  },

  _removeRecommendForm: function() {
    if(this.recommendBoxView) this.recommendBoxView.remove();
  }
});