GiftMe.Views.OnboardView = Backbone.View.extend({
  template: JST['onboard/start'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    "click #yourself":"loadOwnPage",
  },

  render: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  loadOwnPage: function() {
    Backbone.history.navigate("items", {trigger: true});
  }
});