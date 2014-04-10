GiftMe.FriendSearchView = Backbone.View.extend({
  tagName: "span",

  template: JST['nav/friend_search'],

  initialize: function() {
    this.listenTo(GiftMe.users, "sync", this.render);
  },

  events: {
    "submit #friend-search": "runSearch"
  },

  render: function() {
    console.log("Rendering nav");
    var renderedContent = this.template({users: GiftMe.users});
    this.$el.html(renderedContent);

    this.$('#friend-selector').select2({
      data: function() {
        var data = [];
        GiftMe.users.models.forEach(function(user) {
          data.push({
            id: user.id,
            text: user.escape("name"),
            url: user.escape("small_picture_url")
          });
        });
        return {results: data};
      },
      minimumInputLength: 2,
      placeholder: "Select a friend...",
      width: "300px",
      formatResult: this.format,
      // formatSelection: this.format
    });

    this.$('.select2-choice').css("padding", "0px 10px");
    this._identifyFieldChanges();

    return this;
  },

  format: function(state) {
    originalOption = state.element;
    console.log("state is below");
    console.log(state);
    return "<img src='" + state.url + "' class='dropdown-img'/>" + state.text;
    // return state.text;
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