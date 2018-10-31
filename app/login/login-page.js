const LoginViewModel = require("./login-view-model");
const frameModule = require("ui/frame");
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new LoginViewModel();
    page.actionBarHidden = true;
}


function onSigninButtonTap(args) {
    const button = args.object;
    const bindingContext = button.bindingContext;
   
    if(bindingContext.signIn())
    {
        
        var navigationOptions={
            moduleName:'home/home-items-page'
             }
     frameModule.topmost().navigate(navigationOptions);
    }
   
    
}

function onForgotPasswordTap() {
    /* ***********************************************************
    * Call your Forgot Password logic here.
    *************************************************************/
}

exports.onNavigatingTo = onNavigatingTo;
exports.onSigninButtonTap = onSigninButtonTap;
exports.onForgotPasswordTap = onForgotPasswordTap;
