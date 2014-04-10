GiftMe.Views.UserView = Backbone.View.extend({
  template: JST["users/show"],

  initialize: function(options) {
    this.recommended = options.recommended;
    this.pageStatus = options.pageStatus;
    // console.log(options.model);
  },

  events: {
    "click .item-type-selection":"changeFocus"
  },

  changeFocus: function(event) {
    event.preventDefault();
    this.$(".active").removeClass("active");
    var jqTab = $(event.target).parent();
    jqTab.addClass("active");

    var id = jqTab.attr("id");

    console.log(jqTab.attr("id"));

    switch(jqTab.attr("id")) {
      case "all-recommended":
        console.log("all-recommended");
        this.recommended = true;
        this.from_current_user = false;
        break;
      case "recommended-by-you":
        console.log("recommended-by-you");
        this.recommended = true;
        this.from_current_user = true;
        break;
      case "wishlist":
        console.log("wishlist");
        this.recommended = false;
        this.from_current_user = false;
        break;
    }
    this._renderItems();




    /*
      swap out the items when the user selects a new option
      look at the id from the jqTab to figure out how to switch out items
      should just modify items and call call _renderItems
        also save previous states so the user can switch back and forth between tabs without waiting
    */
  },

  render: function() {
    return this._renderSkeleton()._renderItems();
  },

  _renderSkeleton: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  _renderItems: function() {
    params = {userId: this.model.id};
    if(this.recommended) params.recommended = true;
    if(this.from_current_user) params.from_current_user = true;

    var items = new GiftMe.Collections.Items(params);
    var $elToFill = this.$el.find(".wanted-items");
    items.fetch({
      success: function() {
        console.log("success!");
        // var itemsView = new GiftMe.Views.ItemsView({collection: items});
        itemsView = new GiftMe.Views.ItemsView({collection: items});
        $elToFill.html(itemsView.render().$el);
        // return this;
      }
    });
    return this;
  },
});