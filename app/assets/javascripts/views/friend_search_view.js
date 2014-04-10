GiftMe.FriendSearchView = Backbone.View.extend({
  tagName: "span",

  template: JST['nav/friend_search'],

  initialize: function() {
    this.listenToOnce(GiftMe.users, "sync", this.render);
  },

  events: {
    "submit #friend-search": "runSearch"
  },

  render: function() {
    console.log("Rendering nav");
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.$('#friend-selector').select2({width: "300px"});
    this.$('.select2-choice').css("padding", "0px 10px");
    this._identifyFieldChanges();
    return this;
  },

  _identifyFieldChanges: function() {
    this.$('.select2-chosen').bind("DOMSubtreeModified", function() {
      console.log("changed field");
    });
  },

  runSearch: function(event) {
    event.preventDefault();
    console.log("testing run search");
  }
});