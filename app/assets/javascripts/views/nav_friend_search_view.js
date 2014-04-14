GiftMe.Views.NavFriendSearchView = GiftMe.Views.FriendSearchView.extend({
  initialize: function() {
    this.placeholder = "Search for a friend...";
    this.width = "300px";
    this.on("recommendation", function(args) {
      console.log("it worked!");
      console.log(args);
    });

  },

  _formAction: function(params) {
    console.log(params);
    Backbone.history.navigate("/users/" + params.user_id, {trigger: true});
    this._clearForm();
  },
});