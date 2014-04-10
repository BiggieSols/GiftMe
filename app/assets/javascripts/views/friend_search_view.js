GiftMe.FriendSearchView = Backbone.View.extend({
  tagName: "span",

  template: JST['nav/friend_search'],

  events: {
    "submit #friend-search": "runSearch"
  },

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  runSearch: function(event) {
    event.preventDefault();
    console.log("testing run search");
  }
});