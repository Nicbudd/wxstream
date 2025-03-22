import $ from 'jquery';
import { refreshAll } from "./polling";
// import "./xmpp.ts"
import { Feed, prebuiltFeeds } from "./feeds";
import "./style.css";

var feeds: Array<Feed> = [];
const PollingInterval = 5*1000;

$(function() {
    feeds.push(new Feed(prebuiltFeeds["default"]));
    refreshAll(feeds);
    setInterval(refreshAll, PollingInterval, feeds);
})



