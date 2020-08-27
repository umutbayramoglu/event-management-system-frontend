
function getSidebarItems() {

    return [
        {
            title: "Home Page",
            to: "/dashboard",
            icon: '<i class="material-icons">home</i>',
            needAdminPermission: false,
        },
        {
            title: "Add New Event",
            to: "/add-new-event",
            icon: '<i class="material-icons">add</i>',
            needAdminPermission: true,
        },
        {
            title: "Calendar",
            to: "/calendar",
            icon: '<i class="material-icons">calendar_today</i>',
            needAdminPermission: false,
        },
        {
            title: "Info",
            to: "/info",
            icon: '<i class="material-icons">info</i>',
            needAdminPermission: false,
        },
        
    ];
}

export default getSidebarItems;