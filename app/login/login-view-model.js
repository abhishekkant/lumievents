const observableModule = require("data/observable");
const frameModule = require("tns-core-modules/ui/frame");
const dialogsModule = require("ui/dialogs");
const appSettings = require("application-settings");
const fetchModule = require("fetch");
const config = require("~/shared/config");

function LoginViewModel() {
    const viewModel = observableModule.fromObject({
        email: "3701",
        password: "3701",
        role:"",
        isBusy: false,

        signIn: function () {

            const email = this.email;
            const password = this.password;

            /* ***********************************************************
            * Call your custom signin logic using the email and password data.
            *************************************************************/
           this.doLogin(email, password);
      
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
            if (data !== undefined) {
                if (data.length === 0) {
                        // Unsuccessful login
                        appSettings.clear();
                        this.email = "";
                        this.password = "";

                        dialogsModule.alert({
                            message:"Login Failed",
                            okButtonText: "OK"
                        });
                    }
                    else {
                    data.forEach((noti) => {
                        this.role = noti.role;
                        });
                    this.isBusy = false;
                        if (this.role !== null) {
                            dialogsModule.alert({
                                message:"Login Successful",
                                okButtonText: "OK"
                            });       
                            appSettings.setString("username", this.email);
                            appSettings.setString("role", this.role);
                        }
                        else {
                            dialogsModule.alert({
                                message:"Login Failed",
                                okButtonText: "OK"
                            });
                        }
                    }          
            }
            else {
                dialogsModule.alert({
                    message:"Login Failed",
                    okButtonText: "OK"
                }); 
            }
        });
        },

        checkSignedIn: function() {
            // will return false if there is no "noBoolKey"
            const noBoolKey = appSettings.hasKey("username");
            if (noBoolKey) {
            this.username = appSettings.getString("username");
            this.role = appSettings.getString("role");
            }
            else {
                const topFrame = frameModule.topmost();
                topFrame.navigate("login/login-page");
            }   
        },

        logout: function() {
            // Removes all values.
            appSettings.clear();    
        }
    });

    return viewModel;
}

module.exports = LoginViewModel;
