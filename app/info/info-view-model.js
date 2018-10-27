const observableModule = require("data/observable");
const fetchModule = require("fetch");
const config = require("~/shared/config");
const ObservableArray = require("data/observable-array").ObservableArray;
const appSettings = require("application-settings");

function InfoViewModel() {
    const viewModel = observableModule.fromObject({
        isBusy:false,
        lastnotificationTime: "",
        notifications: new ObservableArray([]),
        addButtonVisibility: "collapsed",
        
        getNotifications: function() {
            this.isBusy = true;
            const notificationURL = config.azNotificationsTableUrl + "?$orderby=createdAt desc";
            fetchModule.fetch(notificationURL, {
                headers: {
                    "ZUMO-API-VERSION":"2.0.0"
                }
            })
            .then((response) => {
                if (!response.ok) {
                    console.log(JSON.stringify(response));
                }
                else {
                    console.log(JSON.stringify(response));

                    return response.json();
                }
            })
            .then((data) => {
                console.log(JSON.stringify(data));
                data.forEach((noti) => {
                    this.notifications.push({
                        message: noti.message
                    });
                });
                this.isBusy = false;
                const roll = appSettings.getString("role").toLowerCase();
                if (roll === "admin" || roll === "manager") 
                {
                    viewModel.addButtonVisibility = "visible";
                }
               
            });
        },

        emptyNotifications: function() {
            while (this.notifications.length) {
                this.notifications.pop();
            }
        }
    });

    return viewModel;
}

module.exports = InfoViewModel;
