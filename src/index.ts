import $ from 'jquery';
import { Poller } from "./polling";
// import "./xmpp.ts"
import { Feed, ThemeClass } from "./feeds";
import "./style.css";

var feeds: Array<Feed> = [];
var pollers: Map<string, Poller> = new Map();
const PollingInterval = 5*1000;

$(function() {
    // refreshAll(feeds);
    // setInterval(refreshAll, PollingInterval, feeds);
    new Feed(prebuiltFeeds["default"], feeds, pollers, PollingInterval);
    new Feed(prebuiltFeeds["box"], feeds, pollers, PollingInterval);
})




const standard_blacklist = [/PIREP/, /Climate Report:/, /Routine pilot report/, 
    /Terminal Aerodrome Forecast/, /SIGMET/, /Zone Forecast Package/, 
    /Area Forecast Discussion/, /^METAR/, /^METAR/]

const standard_colorizing: Array<[RegExp, Array<ThemeClass>]> = [
    [/\[[^\]]*(GYX|BOX|BOS|BTV|NH|ME|VT|MA|MASS|CT|RI|Manchester,? NH)[^\[]*\]/g, ["whitebg", "black"]]
]

const prebuiltFeeds = {
    default: {
        channels: ["botstalk"],
        whitelist: [],
        blacklist: standard_blacklist,
        themes: standard_colorizing
    },
    box: {
        channels: ["boxchat"],
        whitelist: [],
        blacklist: standard_blacklist,
        themes: standard_colorizing
    },
    all: {
        channels: ["botstalk"],
        whitelist: [],
        blacklist: [],
        themes: standard_colorizing
    }
}
