GiftMe.Views.RecommendationConfirmView = Backbone.View.extend({
  template: JST['alerts/recommendation_confirm'],

  initialize: function() {
    var that = this;
    GiftMe.dispatcher.on("recommendation", function(args) {        
      that.render(args.userName);
    });
  },

  render: function(userName) {
    // event.preventDefault();
    var renderedContent = this.template({userName: userName});
    this.$el.html(renderedContent);
    // console.log(this.$('recommendation-confirm'));
    if(userName) {
      this.$('.recommendation-confirm').slideDown("fast")
                                       .delay(1500)
                                       .slideUp("fast");      
    }

    return this;
  }
});