GiftMe.FriendSearchView = Backbone.View.extend({
  tagName: "span",

  template: JST['nav/friend_search'],

  initialize: function() {
    this.listenTo(GiftMe.users, "sync", this.render);
  },


  render: function() {
    console.log("Rendering nav");
    var renderedContent = this.template({users: GiftMe.users});
    this.$el.html(renderedContent);
    this._initalizeSelect2();
    return this;
  },

  dropdownFormat: function(state) {
    return "<img src='" + state.url + "' class='dropdown-img'/>" + state.text;
  },

  chosenItemFormat: function(state) {
    return "<span data-id='" + state.id +"'/>" + state.text + "</span>";
  },

  _clearForm: function() {
    this.render();
  },

  _generateSelect2Data: function() {
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

  _identifyFieldChanges: function() {
    var that = this;
    this.$('#friend-selector').on("change", function(event) {
      var user_id = that.$('.select2-chosen').children().data("id");
      Backbone.history.navigate("/users/" + user_id, {trigger: true});
      that._clearForm();
    });
  },

  _initalizeSelect2: function() {
    this.$('#friend-selector').select2({
      data: this._generateSelect2Data(),
      minimumInputLength: 2,
      placeholder: "Select a friend...",
      width: "300px",
      formatResult: this.dropdownFormat,
      formatSelection: this.chosenItemFormat
    });

    this.$('.select2-choice').css("padding", "0px 10px");
    this._identifyFieldChanges();
  }
});