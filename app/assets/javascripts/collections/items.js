GiftMe.Collections.Items = Backbone.Collection.extend({
  initialize: function(options) {
    this.minPrice = options.minPrice;
    this.maxPrice = options.maxPrice;
    this.category = options.category;
  },

  url: function() {
    var root = "/items?";
    if(this.category) root += ("&category=" + this.category);
    if(this.minPrice) root += ("&min_price=" + this.minPrice);
    if(this.maxPrice) root += ("&max_price=" + this.maxPrice);
    return root;
  },

  model: GiftMe.Models.Item
});