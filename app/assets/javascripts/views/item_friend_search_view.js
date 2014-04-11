GiftMe.Views.ItemFriendSearchView = GiftMe.Views.FriendSearchView.extend({
  initialize: function() {
    this.placeholder = "Recommend to a friend...";
    this.width = "180px";
  },

  _formAction: function(params) {
    params.item_id = $(event.currentTarget).closest(".item").data("id");
    console.log(params);
    // GiftMe.Models.
    // Backbone.history.navigate("/users/" + params.user_id, {trigger: true});
    this._clearForm();
  },

});