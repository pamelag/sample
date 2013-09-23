define(function(require) {
    var $= require('jquery'),
        Backbone = require('backbone'),
        _= require('underscore'),
        Marionette = require('marionette'),
        template = _.template(require('text!./templates/workarea.html'));

    var orderStatus;
    return Marionette.ItemView.extend({
        events: {


        },

        initialize: function(el) {
            _.bindAll(this);
        },

        render: function(el) {
            orderStatus = this.options.orderStatusObject;
            this.$el.html(template());

            this.$el.find('#newOrders').html("");
            this.$el.find('#approvedOrders').html("");
            this.$el.find('#pendingOrders').html("");

            this.$el.find('#newOrders').html(orderStatus.get("newOrders"));
            this.$el.find('#approvedOrders').html(orderStatus.get("approvedOrders"));
            this.$el.find('#pendingOrders').html(orderStatus.get("pendingOrders"));


            return this;
        }
    });


});
