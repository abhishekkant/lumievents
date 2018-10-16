const observableModule = require("data/observable");
const frameModule = require("tns-core-modules/ui/frame");
const dialogsModule = require("ui/dialogs");
const appSettings = require("application-settings");
const fetchModule = require("fetch");
const config = require("~/shared/config");

function LoginViewModel() {
    const viewModel = observableModule.fromObject({
        email: "",
        password: "",

        signIn: function () {

            const email = this.email;
            const password = this.password;

            /* ***********************************************************
            * Call your custom signin logic using the email and password data.
            *************************************************************/
           
        if (email === "1234" && password === "1234") {
            dialogsModule.alert({
                message:"Login Correct",
            okButtonText: "OK"
        });
        appSettings.setString("username", "NickIliev");

           }
           else {

            const topFrame = frameModule.topmost();
            topFrame.navigate("browse/browse-page");
              
           }
        },

        doLogin: function(username, password) {
            //?$filter=sapcode%20eq%203701%20and%20password%20eq%203701%20and%20active%20eq%20true&$select=role
            let loginurl = config.azLoginTableUrl;
            loginurl = loginurl.concat("?$filter=sapcode%20eq%20", username, "%20and%20password%20eq%20", password, "%20and%20active%20eq%20true&$select=role");
            fetchModule.fetch(loginurl, {
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

        checkSignedIn: function() {
            // will return false if there is no "noBoolKey"
            const noBoolKey = appSettings.hasKey("username");
            const username = appSettings.getString("username");
            items.push(new Item("username", `${username}`));
            console.log(username);
        },

        logout: function() {
            // Removes all values.
            appSettings.clear();    
        }
    });

    return viewModel;
}

module.exports = LoginViewModel;
