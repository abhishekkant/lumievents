const EditEventViewModel = require("./editEvent-view-model");
const frameModule = require("tns-core-modules/ui/frame");
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

exports.onNavigatingTo = onNavigatingTo;
exports.update = update;
exports.Cancel = Cancel;