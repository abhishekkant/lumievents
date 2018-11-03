const connectivityModule = require("tns-core-modules/connectivity");
const browserUtil = require("utils/utils");
const dialog = require("ui/dialogs");

exports.launch = function(url) {
    browserUtil.openUrl(url);
};


exports.scheduleNotification = function() {
  /* LocalNotifications.addOnMessageReceivedCallback(
        (notificationData) => {
            dialog.alert({
                "title": notificationData.title,
                "message": notificationData.message
            });
          console.log("ID: {0}", notificationData.id);
          console.log("Title: {0} ", notificationData.title);
          console.log("Body: {0}", notificationData.body);
        }
    ).then(
        () => {
          console.log("Listener added");
        }
    );

    LocalNotifications.requestPermission()
    .then(
        (granted) => {
            LocalNotifications.schedule([{
                id: 1,
                title: "The title",
                body: "Recurs every minute until cancelled",
                ticker: "The ticker",
                badge: 1,
                groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
                groupSummary:"Summary of the grouped messages above", //android only
                ongoing: true, // makes the notification ongoing (Android only)
                icon: "res://heart",
                image: "https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg",
                thumbnail: true,
                interval: "minute",
                channel: "My Channel", // default: 'Channel'
                sound: "customsound-ios.wav", // falls back to the default sound on Android
                at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
              }]).then(
                  () => {
                    console.log("Notification scheduled");
                  },
                  (error) => {
                    console.log("scheduling error: {0}", error);
                  }
              )
        }
    );*/
    //  LocalNotifications.cancelAll();
};
exports.onLogoutTap = function() {
    alert('in');
},
module.exports = {
    azNotificationsTableUrl:"https://lumievents.azurewebsites.net/tables/notifications",
    azLoginTableUrl:"https://lumievents.azurewebsites.net/tables/userlist",
    azEventsTableUrl:"https://lumievents.azurewebsites.net/tables/eventslist",
    azPhotosTableUrl:"https://lumievents.azurewebsites.net/tables/photos",
    AZURE_STORAGE_CONNECTION_STRING: "DefaultEndpointsProtocol=https;AccountName=eventresources;AccountKey=gZJNy2J0LnZYKN+jhbs0ZjrFhCIRhX4/LBQtwv96+V0TO+x/OazEF7zQ3EWNnBYYi7oVYH1JdWNIwDZsoonw1A==;EndpointSuffix=core.windows.net",
    AzureContainer:"thailand",
    EventStartDate: "2018-12-15T00:00:00.000Z",
    checkConnectivity: function() {
        // result is ConnectionType enumeration (none, wifi or mobile)
        const myConnectionType = connectivityModule.getConnectionType();
        switch (myConnectionType) {
            case connectivityModule.connectionType.none:
                // Denotes no Internet connection.
                console.log("No connection");
                break;
            case connectivityModule.connectionType.wifi:
                // Denotes a WiFi connection.
                console.log("WiFi connection");
                break;
            case connectivityModule.connectionType.mobile:
                // Denotes a mobile connection, i.e. cellular network or WAN.
                console.log("Mobile connection");
                break;
            case connectivityModule.connectionType.ethernet:
                // Denotes a ethernet connection.
                console.log("Ethernet connection");
                break;
            default:
                break;
        }
    }
};

