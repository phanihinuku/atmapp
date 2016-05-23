sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(JSONModel) {
    "use strict";

    var objectCopy = function(data) {
        return JSON.parse(JSON.stringify(data))
    };

    return {
        objectCopy: objectCopy
    };
});
