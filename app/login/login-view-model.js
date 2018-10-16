const observableModule = require("data/observable");
const frameModule = require("tns-core-modules/ui/frame");
const dialogsModule = require("ui/dialogs");
const appSettings = require("application-settings");

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
