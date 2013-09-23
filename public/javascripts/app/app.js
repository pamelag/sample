define(function (require) {

    var $ = require('jquery'),
        _ = require('underscore'),
        Bootstrap = require('bootstrap'),
        Backbone = require('backbone'),
        Marionette = require('marionette');

    var App = new Marionette.Application();

    var Models = {
        OrderStatus: require('entities/OrderStatus')
    };



    var Views = null;



    App.addRegions({
        appHeader: "#app-header",
        appBody: "#app-body"
    });

    App.on("initialize:before", function () {



    });

    App.on("initialize:after", function () {

        Backbone.history.start({ pushState: true });



    });



    App.addInitializer(function() {



        Views = {
            WorkAreaView:require('./views/WorkAreaView'),
            HeaderView:require('./views/HeaderView')
        };



        app.vent.trigger("showOrderStatus");


    });

    App.vent.on("showOrderStatus", function(){
        var orderStatus = new Models.OrderStatus();
        orderStatus.url='/orders';
        orderStatus.fetch({
            success: function(model, response, options) {

                orderStatus.set("newOrders", response.newOrders);
                orderStatus.set("approvedOrders", response.approvedOrders);
                orderStatus.set("pendingOrders", response.pendingOrders);

                var plainHeaderView = new Views.HeaderView({brand:response.project});
                var workAreaView = new Views.WorkAreaView({orderStatusObject:orderStatus});

                app.appHeader.show(plainHeaderView);
                app.appBody.show(workAreaView);

                //var ideView = new Views.IdeView({project:projectObject, member:member});

            }
        });
    });

    return App;

});

