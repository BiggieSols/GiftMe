GiftMe.Views.FriendSearchView = Backbone.View.extend({
  tagName: "span",

  template: JST['nav/friend_search'],

  // needs to be overridden in subclasses
  initialize: function() {
  },

  render: function() {
    var renderedContent = this.template({users: GiftMe.users});
    this.$el.html(renderedContent);
    this._initalizeSelect2();

    // TODO: move to another view? doesn't work within the current element

    return this;
  },

  // override for various sizes
  dropdownFormat: function(state) {
  },

  chosenItemFormat: function(state) {
    return "<span data-id='" + state.id +"'/>" + state.text + "</span>";
  },

  _clearForm: function() {
    this.render();
    this.$('.select2-input').focus();
  },

  // needs to be overridden in subclasses
  _formAction: function(params) {
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
    this.$('.friend-selector').on("change", function(event) {
      params = {};
      params.user_id = that.$('.select2-search-choice div span').data("id");
      that._formAction(params);
    });
  },

  _initalizeSelect2: function() {
    this.$('.friend-selector').select2({
      data: this._generateSelect2Data(),
      minimumInputLength: 3,
      placeholder: this.placeholder,
      width: this.width,
      formatResult: this.dropdownFormat,
      formatSelection: this.chosenItemFormat,
      multiple: true
    });

    this.$('.select2-choice').css("padding", "0px 10px");
    this._identifyFieldChanges();
  },

  // _lazyLoadInitialize: function() {
  //   this.$('img.lazy').lazyload({threshold: 100});
  // }
});