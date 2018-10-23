const observableModule = require("data/observable");
const fetchModule = require("fetch");
const config = require("~/shared/config");
const ObservableArray = require("data/observable-array").ObservableArray;

function InfoViewModel() {
    const viewModel = observableModule.fromObject({
        isBusy:false,
        lastnotificationTime: "",
        notifications: new ObservableArray([]),
        addButtonVisibility: 'visible',
        getNotifications: function() {
            this.isBusy = true;
            fetchModule.fetch(config.azNotificationsTableUrl, {
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
