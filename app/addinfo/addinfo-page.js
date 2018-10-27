const AddinfoViewModel = require("./addinfo-view-model");
const frameModule = require("tns-core-modules/ui/frame");

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new AddinfoViewModel();
}

function onSendTap(args)
{
    const button = args.object;
    const bindingContext = button.bindingContext;
    bindingContext.addinfo();
}
function Cancel() {
    var navigationOptions={
      moduleName:'info/info-page'
       }
       frameModule.topmost().navigate(navigationOptions);
};
exports.Cancel = Cancel;
exports.onNavigatingTo = onNavigatingTo;
exports.onSendTap=onSendTap;