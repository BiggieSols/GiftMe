GiftMe.Models.WantedUserItem = Backbone.Model.extend({
  url: "/wanted_user_items",

  // methodUrl: {
  //   'create': '/wanted_user_items',
  //   'delete': '/wanted_user_items'
  // },

  // sync: function(method, model, options) {
  //   if (model.methodUrl && model.methodUrl[method.toLowerCase()]) {
  //     options = options || {};
  //     options.url = model.methodUrl[method.toLowerCase()];
  //   }
  //   Backbone.sync(method, model, options);
  // }

});