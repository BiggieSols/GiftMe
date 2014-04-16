GiftMe.Views.ItemFriendSearchView = GiftMe.Views.FriendSearchView.extend({
  initialize: function() {
    this.placeholder = "Recommend to a friend...";
    this.width = "180px";
  },

  dropdownFormat: function(state) {
    return "<div class='row'><div class='col-xs-4'><img src='" + state.url + "' class='dropdown-img'/></div><div class='col-xs-8 user-name-dropdown'>" + state.text  + "</div></div>";
  },


  _formAction: function(params) {
    params.item_id = $(event.currentTarget).closest(".item").data("id");
    console.log(params);
    rec = new GiftMe.Models.UserItemRecommendation(params);
    rec.save();

    userName = this.$('.select2-search-choice div').text();
    GiftMe.dispatcher.trigger("recommendation", {userName: userName});

    this._clearForm();
  },
});