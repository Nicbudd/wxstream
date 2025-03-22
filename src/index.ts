import $ from 'jquery';
import { Poller } from "./polling";
// import "./xmpp.ts"
import { Feed, prebuiltFeeds } from "./feeds";
import "./style.css";

var feeds: Array<Feed> = [];
var pollers: Map<string, Poller> = new Map();
const PollingInterval = 5*1000;

$(function() {
    // refreshAll(feeds);
    // setInterval(refreshAll, PollingInterval, feeds);
    new Feed(prebuiltFeeds["default"], feeds, pollers, PollingInterval);
})



