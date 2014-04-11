GiftMe.Views.NavFriendSearchView = GiftMe.Views.FriendSearchView.extend({
  initialize: function() {
    this.placeholder = "Search for a friend...";
    this.width = "300px";
  },

  _formAction: function(params) {
    console.log(params);
    Backbone.history.navigate("/users/" + params.user_id, {trigger: true});
    this._clearForm();
  },

});