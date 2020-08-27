import React from "react";
import {Redirect} from "react-router-dom";

// Import Layouts
import {BaseLayout} from "./layouts";

// Import Views
import DashboardView from "./views/DashboardView";
import AddEventView from "./views/AddEventView";
import JoinToEventView from "./views/JoinToEventView";
import CalendarView from "./views/CalendarView";
import InfoView from "./views/InfoView";
import StatsView from "./views/StatsView";
import LoginView from "./views/LoginView";
import EventView from "./views/EventView";
import ErrorView from "./views/ErrorView"
import CreatedEvents from "./views/CreatedEventsView"
import ListParticipantsView from "./views/ListParticipantsView";
import EditEventView from "./views/EditEventView";
import AnalyzeEventView from "./views/AnalyzeEventView";

export default [
    {
        path:"/",
        name:"Dashboard",
        component: () => <Redirect to="/dashboard"></Redirect>,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: false,
        needAdminPermission: false,
    },
    {
        path:"/dashboard",
        name:"Dashboard",
        component: DashboardView,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: false,
        needAdminPermission: false,
    },
    {
        path:"/add-new-event",
        name:"Add New Event",
        component: AddEventView,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: true,
        needAdminPermission: true,
    },
    {
        path:"/join-to-event",
        name:"Join An Event",
        component: JoinToEventView,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: true,
        needAdminPermission: false,
    },
    {
        path:"/:ownerName/events/*-:eventId",
        name:"Event",
        component: EventView,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: false,
        needAdminPermission: false,
    },
    {
        path:"/:ownerName/events/*-:eventId/edit",
        name:"Edit Event",
        component: EditEventView,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: true,
        needAdminPermission: true,
    },
    {
        path:"/:ownerName/events/*-:eventId/analyze",
        name:"Analyze Event",
        component: AnalyzeEventView,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: true,
        needAdminPermission: true,
    },

    {
        path:"/:ownerName/events/*-:eventId/participants",
        name:"Participants",
        component: ListParticipantsView,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: true,
        needAdminPermission: true,
    },
    {
        path:"/calendar",
        name:"Calendar",
        component: CalendarView,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: false,
        needAdminPermission: false,
    },
    {
        path:"/info",
        name:"Info",
        component: InfoView,
        exact: true,
        layout: BaseLayout, needLoggedIn: false,
        needAdminPermission: false,
    },
    {
        path:"/stats",
        name:"Stats",
        component: StatsView,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: true,
        needAdminPermission: true,
    },
    {
        path:"/login",
        name:"Login",
        component: LoginView,
        exact: true,
        layout: "LoginLayout",
        needLoggedIn: false,
        needAdminPermission: false,
    },
    {
        path:"/error",
        name:"Error",
        component: ErrorView,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: false,
        needAdminPermission: false,
    },
    {
        path:"/my-events",
        name:"My Events",
        component: CreatedEvents,
        exact: true,
        layout: BaseLayout,
        needLoggedIn: true,
        needAdminPermission: true,
    },

]