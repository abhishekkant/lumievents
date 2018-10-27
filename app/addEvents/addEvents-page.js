const AddEventsViewModel = require("./addEvents-view-model");
const isAndroid = require("tns-core-modules/platform").isAndroid;
const isIOS = require("tns-core-modules/platform").isIOS;
const frameModule = require("tns-core-modules/ui/frame");
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new AddEventsViewModel();
}
function onPickerLoaded(args) {
    const timePicker = args.object;

    if (isAndroid) {
        timePicker.android.setIs24HourView(java.lang.Boolean.TRUE);
        //timePicker.hour = 23;
       // timePicker.minute = 59;
    } else if (isIOS) {
        // a bit hacky solution
        // important set the country not the language for locale
        const local = NSLocale.alloc().initWithLocaleIdentifier("IN");
        timePicker.ios.locale = local;
       // timePicker.hour = 23;
       // timePicker.minute = 59;
    }
}

function addevent(args) {
   
    const button = args.object;
    const bindingContext = button.bindingContext;
    bindingContext.addevent();
  
    //alert(index);
};

function Cancel() {
    var navigationOptions={
      moduleName:'home/home-items-page'
   
       }

       frameModule.topmost().navigate(navigationOptions);
};
exports.Cancel = Cancel;
exports.addevent = addevent;
exports.onPickerLoaded = onPickerLoaded;
exports.onNavigatingTo = onNavigatingTo;
