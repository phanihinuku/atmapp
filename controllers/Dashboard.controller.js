sap.ui.define([
	"sap/m/MessagePopover",
	"sap/m/MessagePopoverItem",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageBox",
	"ipms/atm/app/helpers/Formatter",
	"ipms/atm/app/helpers/Utils",
	"ipms/atm/app/helpers/Data",
	"ipms/atm/app/helpers/Map"
	// "sap/suite/ui/microchart/AreaMicroChart"
], function(MessagePopover, MessagePopoverItem, Controller, JSONModel, BusyIndicator, MessageBox, Formatter, Utils, Data, Map) {
	"use strict";

	var oMessageTemplate = new MessagePopoverItem({
		type: '{type}',
		title: '{title}',
		description: '{description}'
	});
	var oMessagePopover3 = new MessagePopover({
		items: {
			path: '/',
			template: oMessageTemplate
		},
		initiallyExpanded: false
	});

	return Controller.extend("ipms.atm.app.controllers.Dashboard", {
		logout:function(){
				sap.ui.core.UIComponent.getRouterFor(this).navTo('login');
		}
			
		,
		onInit: function() {
			var oThis = this;
			var oComponent = oThis.getOwnerComponent();
			oThis.Formatter = Formatter;
			oThis._router = oComponent.getRouter();
			oThis._router.getRoute("Dashboard").attachMatched(oThis._init, oThis);
			oThis._router.getRoute("All").attachMatched(oThis._init, oThis);
			
			// 		var data =[{icon:"sap-icon://pushpin-on",text:"Pin ATM"},
			// 			{icon:"sap-icon://video",text:"View ATM Camera's Video"},
			// 			{icon:"sap-icon://task",text:"Raise a Ticket"},
			// 			{icon:"sap-icon://microphone",text:"Talk to Person at ATM"},
			// 			{icon:"sap-icon://marketing-campaign",text:"Listen to Person at ATM"}
			// 			];
			// 	var modelx = new sap.ui.model.json.JSONModel();
			// modelx.setData(data);
				// var oMessageTemplate = new sap.m.MessagePopoverItem({
				// 	icon: '{icon}',
				// 	title: '{Text}'
				// });
				
				// 	this.oMessagePopover1 = new MessagePopover({
				// 	items: {
				// 		path: '/',
				// 		template: oMessageTemplate
				// 	}
				// });
				// this.oMessagePopover1.setModel(modelx);
				
								
							
		
			var aMockMessages = [{
				type: 'Error',
				title: '1 Error message',
				description: 'First Error message description'
			}, {
				type: 'Warning',
				title: '1 Warning without description',
				description: ''
			}, {
				type: 'Success',
				title: '1 Success message',
				description: 'First Success message description'
			}, {
				type: 'Error',
				title: '2 Error message',
				description: 'Second Error message description'
			}, {
				type: 'Information',
				title: '1 Information message',
				description: 'Red - Critical, Orange - Medium, Green - All OK'
			}];

			var oModel = new JSONModel();
			oModel.setData(aMockMessages);

			var viewModel = new JSONModel();
			viewModel.setData({
				messagesLength: aMockMessages.length + ''
			});

			this.getView().setModel(viewModel);

			oMessagePopover3.setModel(oModel);

		},
		onDialogWithSizePress: function (oEvent) {
		var data =[{icon:"sap-icon://pushpin-on",text:"Pin ATM"},
						{icon:"sap-icon://video",text:"View ATM Camera's Video"},
						{icon:"sap-icon://task",text:"Raise a Ticket"},
						{icon:"sap-icon://microphone",text:"Talk to Person at ATM"},
						{icon:"sap-icon://marketing-campaign",text:"Listen to Person at ATM"}
						];
				var modelx = new sap.ui.model.json.JSONModel();
			modelx.setData(data);
			var dialog=this.getView().byId("dialHelp");
			if(dialog==null){
			 dialog = new sap.m.Dialog({id:"dialHelp",
				title: 'Help',
				contentWidth: "550px",
				contentHeight: "300px",
				content:
			[ new sap.m.List({
					items: {
						path: '/',
						template: new sap.m.StandardListItem({
							icon: "{icon}",
							title: "{text}"
						})
					}
				})
				
				]
				
				,
				beginButton: new sap.m.Button({
					text: 'Close',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					// dialog.destroy();
				}
			}).setModel(modelx);
			oEvent.getSource().addDependent(dialog);
			}
			dialog.open();
			
			// this.oMessagePopover1.openBy(oEvent.getSource());
			
			},
			
		showInfo: function(oEvent) {
			oMessagePopover3.openBy(oEvent.getSource());
		},

		i18n: function() {
			var oThis = this;
			var oComponent = oThis.getOwnerComponent();
			return oComponent.getModel('i18n').getResourceBundle();
		},

		_map: null,
		_markers: [],

		onAfterRendering: function() {
			var oThis = this;
			var oView = oThis.getView();
			Map.init(oThis);
		},

		_init: function(oEvent) {
			var oThis = this;
			var oView = oThis.getView();
			oView.setModel(new JSONModel({
				"viewType": "map",
				"atm_type": "All",
				"atm_count": 0
			}), "viewData");
			oView.setModel(new JSONModel([]), "pinnedATMs");
			Data.init(oThis);
		},

		openPinnedDetails: function(oEvent) {
			var oThis = this;
			Map.pinDetails(oThis, oEvent);
		},

		pinToKiosk: function(oEvent) {
			var oThis = this;
			Map.pin(oThis, oEvent);
		},

		deletePin: function(oEvent) {
			var oThis = this;
			Map.pinRemove(oThis, oEvent);
		},

		goToActions: function(oEvent) {
			var oThis = this;
			var oView = oThis.getView();
			var oNavContainer = sap.ui.getCore().byId("atm-details-popup-nc");
			oNavContainer.to(sap.ui.getCore().byId('atm-details-popup-page-2'), "slide");
		},

		goToDetails: function(oEvent) {
			var oThis = this;
			var oView = oThis.getView();
			var oNavContainer = sap.ui.getCore().byId("atm-details-popup-nc");
			oNavContainer.back();
		},

		handlePressVideo: function(oEvent) {
			var oThis = this;
			if (!oThis._oVideoDialog) {
				oThis._oVideoDialog = sap.ui.xmlfragment("ipms.atm.app.fragments.DialogVideo", oThis);
				oThis.getView().addDependent(oThis._oVideoDialog);
			}
			jQuery.sap.delayedCall(0, oThis, function() {
				oThis._oVideoDialog.open();
			});
		},

		closeVideo: function(oEvent) {
			var oThis = this;
			oThis._oVideoDialog.close();
		},

		showListView: function() {
			var oThis = this;
			var oView = oThis.getView();
			oView.getModel('viewData').setProperty('/viewType', "list");
			var oList = oView.byId("dashboard-page-list-atm");
			oView.getModel('viewData').setProperty('/atm_count', oList.getItems().length);
			oThis.getView().byId('dashboard-page-map').setVisible(false);
			oThis.getView().byId('dashboard-page-buttonsovermap').setVisible(false);
			oThis.getView().byId('dashboard-page-list-detail').setVisible(true);
			oThis.getView().byId('dashboard-page-map-pins').setVisible(false);
		},

		showMapView: function() {
			var oThis = this;
			var oView = oThis.getView();
			oView.getModel('viewData').setProperty('/viewType', "map");
				oThis.getView().byId('dashboard-page-map').setVisible(true);
				oThis.getView().byId('dashboard-page-list-detail').setVisible(false);
			oThis.getView().byId('dashboard-page-buttonsovermap').setVisible(true);
			oThis.getView().byId('dashboard-page-map-pins').setVisible(true);
			
			
		},

		criticalCount: function(sensors) {
			var count = 0;
			for (var i = 0; i < sensors.length; i++) {
				if (sensors[i].status === "critical") count++;
			};
			return count;
		},

		criticalSensors: function(sensors) {
			var cs = [];
			for (var i = 0; i < sensors.length; i++) {
				if (sensors[i].status === "critical") cs.push(Formatter.sensorText(sensors[i].type));
			};
			return cs.join(",");
		},

		onListSelectionChange: function(oEvent) {
			var oThis = this;
			var oView = oThis.getView();
			var oSource = oEvent.getParameter('listItem');
			var path = oSource.getBindingContext('atmsModel').sPath;
			var data = oView.getModel('atmsModel').getProperty(path);
			oView.setModel(new JSONModel(Utils.objectCopy(data)), "selectedListATM");
		},

		formatSensorText: function(sensor) {
			return Formatter.sensorText(sensor);
		},

		formatStatusType: function(status) {
			return Formatter.statusType(status);
		},

		formatSensorIcon: function(sensor) {
			return Formatter.sensorIcon(sensor);
		},

		formatStatusText: function(status) {
			return "Status: " + Formatter.statusText(status);
		},

		showFilters: function(oEvent) {
			var oThis = this;
			if (!oThis.oFilterDialog) {
				oThis.oFilterDialog = sap.ui.xmlfragment("ipms.atm.app.fragments.DialogFilters", oThis);
				oThis.getView().addDependent(oThis.oFilterDialog);
			}
			jQuery.sap.delayedCall(0, oThis, function() {
				oThis.oFilterDialog.open();
			});
		},

		closeFilters: function(oEvent) {
			var oThis = this;
			oThis.oFilterDialog.close();
		},

		showDetails: function(oEvent) {
			var oThis = this;
			var oSource = oEvent.getSource();
			/* if (!oThis._oUserDetailsPopover) {
			     oThis._oUserDetailsPopover = sap.ui.xmlfragment("ipms.atm.app.fragments.PopoverUser", oThis);
			     oThis.getView().addDependent(oThis._oUserDetailsPopover);
			 }*/
			oThis._oUserDetailsPopover.openBy(oSource);
		},

		goToListView: function(oEvent) {
			var oThis = this;
			var oView = oThis.getView();
			var oSource = oEvent.getSource();
		//	var type = oSource.data("mydata");
				var type = oSource.getSelectedKey();
			//clear all markers
			for (var i = 0; i < this._markers.length; i++) {
				var value = this._markers[i];
				value.setMap(null);
			}

			this._markers = [];

			//var type = 'total';
			var atm_type;
			switch (type) {
				case 'total':
					atm_type = 'All';
					type = '';
				//	Map.getData(oThis);
					break;
				case 'critical':
					atm_type = 'Critical';

					break;
				case 'medium':
					atm_type = 'Medium';
					break;
				case 'normal':
					atm_type = 'All Ok';
					break;
			}

			//add all markers
			Map.filterMarkers(oThis, type);

			oView.getModel('viewData').setProperty('/atm_type', atm_type);
			var filters = [];
			var filter = new sap.ui.model.Filter("status", sap.ui.model.FilterOperator.Contains, type);
			filters.push(filter);
			var oList = oView.byId("dashboard-page-list-atm");
			var binding = oList.getBinding("items");
			binding.filter(filters);
			oView.getModel('viewData').setProperty('/atm_count', oList.getItems().length);
			// oThis.showListView();

			// var oThis = this;
			//var oView = oThis.getView();
			//oView.getModel('viewData').setProperty('/viewType', "list");
			oView.getModel('viewData').setProperty('/viewType', "map");
			var oList = oView.byId("dashboard-page-list-atm");
			oView.getModel('viewData').setProperty('/atm_count', oList.getItems().length);

		}

	});
});