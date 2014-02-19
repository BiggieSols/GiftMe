GiftMe.Views.ItemView = Backbone.View.extend({
  template: JST["items/show"],

  tagName: "span",

  render: function() {
    var price = parseInt(this.model.get("price")) / 100;
    var tempPriceStr = price.toString();
    var priceStr = (price % 1 > 0) ? price : tempPriceStr + ".00";

    var renderedContent = this.template({
      item: this.model,
      price: priceStr
    });
    
    this.$el.html(renderedContent);
    return this;
  }
});