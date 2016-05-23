sap.ui.define([], function() {
    "use strict";

    var sensorIcon = function(sensor) {
        var icon = "sap-icon://";
        switch (sensor) {
            case "vibration":
                icon += "line-charts";
                break;
            case "heat":
                icon += "temperature";
                break;
            case "contact":
                icon += "detail-view";
                break;
            case "motion":
                icon += "step";
                break;
            case "pid":
                icon += "physical-activity";
                break;
            case "door":
                icon += "visits";
                break;
            case "battery":
                icon += "disconnected";
                break;
            case "smoke":
                icon += "upload-to-cloud";
                break;
        }
        return icon;
    };

    var sensorText = function(sensor) {
        var text = "";
        switch (sensor) {
            case "vibration":
                text = "Vibration";
                break;
            case "heat":
                text = "Heat";
                break;
            case "contact":
                text = "Contact";
                break;
            case "motion":
                text = "Motion";
                break;
            case "pid":
                text = "PID";
                break;
            case "door":
                text = "Door";
                break;
            case "battery":
                text = "Battery";
                break;
            case "smoke":
                text = "Smoke";
                break;
        }
        return text;
    };

    var statusText = function(status) {
        var text = 'All Ok';
        switch(status) {
            case 'critical':
                text = 'Critical';
                break;
            case 'medium':
                text = 'Medium';
                break;
        }
        return text;
    };

    var statusType = function(status) {
        var type = 'None';
        switch(status) {
            case 'critical':
                type = 'Error';
                break;
            case 'medium':
                type = 'Warning';
                break;
        }
        return type;
    };

    return {
        sensorIcon: sensorIcon,
        sensorText: sensorText,
        statusText: statusText,
        statusType: statusType,
    };
});
