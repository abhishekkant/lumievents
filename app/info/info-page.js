const InfoViewModel = require("./info-view-model");

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;
    const notificationList = new InfoViewModel();
    page.bindingContext = notificationList;
    notificationList.emptyNotifications();
    notificationList.getNotifications();
    const lView = page.getViewById("notificationsListView");
    lView.animate({
        opacity: 1,
        duration: 1000
    });
}

exports.onNavigatingTo = onNavigatingTo;
