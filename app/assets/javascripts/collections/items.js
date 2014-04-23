GiftMe.Collections.Items = Backbone.Collection.extend({
  initialize: function(options) {
    var options = options || {};
    if(options.minPrice) this.minPrice = options.minPrice * 100;
    if(options.maxPrice) this.maxPrice = options.maxPrice * 100;
    this.category = options.category;
    this.userId = options.userId;
    this.recommended = options.recommended;
    this.from_current_user = options.from_current_user;
  },

  url: function() {
    var root = "/items?";
    var page_number = this.page_number || 1;
    root += "&page_number=" + page_number;
    if(this.category) root += ("&category=" + this.category);
    if(this.minPrice) root += ("&min_price=" + this.minPrice);
    if(this.maxPrice) root += ("&max_price=" + this.maxPrice);
    if(this.userId) root += ("&user_id=" + this.userId);
    if(this.recommended) root += ("&recommended=" + this.recommended);
    if(this.from_current_user) root += ("&from_current_user=" + this.from_current_user);
    return root;
  },

  parse: function(response) {
    this.page_number = parseInt(response.page_number);
    this.total_pages = parseInt(response.total_pages);
    return response.models;
  },

  model: GiftMe.Models.Item
});