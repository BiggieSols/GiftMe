GiftMe.Views.NavFriendSearchView = GiftMe.Views.FriendSearchView.extend({
  initialize: function() {
    this.placeholder = "Search for a friend...";
    this.width = "300px";
  },

  dropdownFormat: function(state) {
    return "<img data-original='" + state.url + "' class='dropdown-img lazy'/> " + state.text;
  },

  _formAction: function(params) {
    console.log(params);
    Backbone.history.navigate("/users/" + params.user_id, {trigger: true});
    this._clearForm();
  },
});