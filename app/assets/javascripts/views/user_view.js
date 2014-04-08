GiftMe.Views.UserView = Backbone.View.extend({
  template: JST["users/show"],

  initialize: function(options) {
    this.recommended = options.recommended;
    this.pageStatus = options.pageStatus;
  },

  events: {
    "click .item-type-selection":"changeFocus"
  },

  changeFocus: function(event) {
    event.preventDefault();
    this.$(".active").removeClass("active");
    $(event.target).parent().addClass("active");
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