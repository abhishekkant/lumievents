const connectivityModule = require("tns-core-modules/connectivity");

module.exports = {
    azNotificationsTableUrl:"https://lumievents.azurewebsites.net/tables/notifications",
    azLoginTableUrl:"https://lumievents.azurewebsites.net/tables/userlist",
    azEventsTableUrl:"https://lumievents.azurewebsites.net/tables/eventslist",
    azPhotosTableUrl:"https://lumievents.azurewebsites.net/tables/photos",
    AZURE_STORAGE_CONNECTION_STRING: "DefaultEndpointsProtocol=https;AccountName=eventresources;AccountKey=gZJNy2J0LnZYKN+jhbs0ZjrFhCIRhX4/LBQtwv96+V0TO+x/OazEF7zQ3EWNnBYYi7oVYH1JdWNIwDZsoonw1A==;EndpointSuffix=core.windows.net",
    AzureContainer:"thailand",
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

