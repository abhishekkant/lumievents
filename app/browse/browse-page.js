const BrowseViewModel = require("./browse-view-model");
const frameModule = require("ui/frame");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new BrowseViewModel();
    component.bindingContext.onload();
}

function onButtonTap(args) {
    const top = frameModule.topmost();
   top.navigate("login/login-page");
}

exports.onNavigatingTo = onNavigatingTo;
exports.onButtonTap = onButtonTap;
