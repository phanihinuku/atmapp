sap.ui.define([
    'sap/ui/core/UIComponent',
    'sap/m/routing/Router',
    'sap/ui/model/resource/ResourceModel',
    'sap/ui/model/odata/ODataModel',
    'sap/ui/model/json/JSONModel'
], function(UIComponent,
    Router,
    ResourceModel,
    ODataModel,
    JSONModel) {

    return UIComponent.extend("ipms.atm.app.Component", {

        metadata: {
            includes: ["css/style.css"],
            config: {
                fullWidth: true
            },
            routing: {
                config: {
                    routerClass: Router,
                    viewType: "XML",
                    viewPath: "ipms.atm.app.views",
                    controlId: "mainApp",
                    controlAggregation: "pages",
                    transition: "slide"
                },
                routes: [{
                    pattern: "dashboard",
                    name: "Dashboard",
                    target: "Dashboard"
                }, {
                    pattern: ":all*:",
                    name: "All",
                    target: "Dashboard"
                }],
                targets: {
                    Dashboard: {
                        viewName: "Dashboard",
                        viewLevel: 1
                    }
                }
            }
        },

        init: function() {
            // call overwritten init (calls createContent)
            UIComponent.prototype.init.apply(this, arguments);

            // set i18n model
            var i18nModel = new ResourceModel({
                bundleName: "ipms.atm.app.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");
            jQuery.sap.registerModulePath('external.library', '');

            this._router = this.getRouter();

            // initialize the router
            this._router.initialize();
        },


        goBack: function() {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var oPrevHash = oHistory.getPreviousHash();
            if (oPrevHash !== undefined) {
                window.history.go(-1);
            } else {
                this._router.navTo("Dashboard", {}, true);
            }
        },

        createContent: function() {
            return sap.ui.view({
                viewName: "ipms.atm.app.views.App",
                type: "XML"
            });
        }
    });

});
