GiftMe.Views.OnboardView = Backbone.View.extend({
  template: JST['onboard/start'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  }
});