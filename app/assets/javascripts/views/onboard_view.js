GiftMe.Views.OnboardView = Backbone.View.extend({
  template: JST['onboard/start'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    "click #yourself":"_loadOwnPage",
    "click #friends":"_navPopover"
  },

  render: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  _loadOwnPage: function() {
    Backbone.history.navigate("items", {trigger: true});
  },

  _navPopover: function() {
    var friendSearchJQObj = $('#friend-search');

    friendSearchJQObj
      .attr({
        "data-toggle": "body",
        "data-placement": "bottom",
        "data-content": "search for your facebook friends to see their wishlist and recommend",
        "data-title": "search for friends"
      })
      .popover('show');

    $('#lightbox').css("display", "inline-block");

    $('.select2-input')
      .on("focus", function(event){
        friendSearchJQObj.popover('hide');
        $('#lightbox').css("display", "none");
      }
    );
  }

});