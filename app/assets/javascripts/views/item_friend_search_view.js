GiftMe.Views.ItemFriendSearchView = GiftMe.Views.FriendSearchView.extend({
  initialize: function() {
    this.placeholder = "Recommend to a friend...";
    this.width = "180px";
  },

  test: function(event) {
    alert("triggered");
  },

  _formAction: function(params) {
    params.item_id = $(event.currentTarget).closest(".item").data("id");
    console.log(params);
    rec = new GiftMe.Models.UserItemRecommendation(params);

    userName = this.$('.select2-search-choice div').text();

    console.log("recommended to " + userName);

    GiftMe.dispatcher.trigger("recommendation", {userName: userName});

    rec.save();
    this._clearForm();
  },
});