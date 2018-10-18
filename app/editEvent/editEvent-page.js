const EditEventViewModel = require("./editEvent-view-model");
const frameModule = require("tns-core-modules/ui/frame");
const isAndroid = require("tns-core-modules/platform").isAndroid;
const isIOS = require("tns-core-modules/platform").isIOS;
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;
    var gotData=page.navigationContext;
    ////alert(gotData);
    page.bindingContext = new EditEventViewModel(gotData);
    page.bindingContext.onload();  // edit data bind on load
   // onload
}

function update(args) {
    //var target = args.object;
   // var index = target.index;
    const button = args.object;
    const bindingContext = button.bindingContext;
    //var EventEditmodel = new EditEventViewModel();
    bindingContext.update();
  
    //alert(index);
};

function Cancel() {
      var navigationOptions={
        moduleName:'home/home-items-page'
     
         }
 
         frameModule.topmost().navigate(navigationOptions);
};




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
exports.onPickerLoaded = onPickerLoaded;

exports.onNavigatingTo = onNavigatingTo;
exports.update = update;
exports.Cancel = Cancel;