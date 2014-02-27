GiftMe.Views.FavoriteButtonView = Backbone.View.extend({
  template: JST["items/favorite_button_view"],

  initialize: function() {
    this.listenTo(GiftMe.currentUser, "sync", this.render);
  },

  events: {
    "click .add-favorite": "favorite",
    "click .remove-favorite": "removeFavorite"
  },

  render: function() {
    var renderedContent = this.template({
      user: GiftMe.currentUser,
      item: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }, 

  favorite: function(event) {
    var item_id = $(event.currentTarget).closest(".item").data("id");
    var wanted_item_ids = GiftMe.currentUser.get("wanted_item_ids");
    wanted_item_ids = wanted_item_ids.concat(item_id);

    console.log("wanted item id is " + item_id);
    console.log("wanted item ids are " + wanted_item_ids);

    GiftMe.currentUser.set("wanted_item_ids", wanted_item_ids);
    GiftMe.currentUser.save();
  },

  removeFavorite: function() {
    var item_id = $(event.currentTarget).closest(".item").data("id");
    var wanted_item_ids = GiftMe.currentUser.get("wanted_item_ids");
    wanted_item_ids = _.without(wanted_item_ids, item_id);

    console.log("un-wanted item id is " + item_id);
    console.log("wanted item ids are " + wanted_item_ids);

    GiftMe.currentUser.set("wanted_item_ids", wanted_item_ids);
    GiftMe.currentUser.save();
  }
});