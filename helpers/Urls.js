sap.ui.define([], function() {
    "use strict";
    var root = jQuery.sap.getModulePath("ipms.atm.app") + '/data/';
    var user = function() { return root + 'user.json' };
    var map = function() { return root + 'map.json' };
    return {
        user: user,
        map: map,
    };
});
