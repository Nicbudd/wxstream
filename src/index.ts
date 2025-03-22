import $ from 'jquery';
import { Poller } from "./polling";
// import "./xmpp.ts"
import { Feed, ThemeClass } from "./feeds";
import "./style.css";
import IdleTracker from "idle-tracker";

var feeds: Array<Feed> = [];
var pollers: Map<string, Poller> = new Map();
const PollingInterval = 5*1000;

$(function() {
    new Feed(prebuiltFeeds["default"], feeds, pollers, PollingInterval);
    new Feed(prebuiltFeeds["box"], feeds, pollers, PollingInterval);

    const idleTracker = new IdleTracker({
        timeout: 1000 * 10,
        onIdleCallback: (callback) => {
            
            if (callback.idle) {
                console.log("Idle!");
                $("#idlescreen").removeClass("none");
                for (const p of pollers) {
                    p[1].suspend();
                }

            } else {
                console.log("Unidle!");
                $("#idlescreen").addClass("none");
                for (const p of pollers) {
                    p[1].unsuspend();
                }
            }
        }
    })
    idleTracker.start();
})

function idleChange() {

}

// const timeout = idleTimeout(
//     () => {
//         for (const p of pollers) {
//             p[1].suspend()
//         }
//     },
// )

// timeout.timeout = 1000 * 10;





const standard_blacklist = [/PIREP/, /Climate Report:/, /Routine pilot report/, 
    /Terminal Aerodrome Forecast/, /SIGMET/, /Zone Forecast Package/, 
    /Area Forecast Discussion/, /^METAR/, /^METAR/]

const standard_themes: Array<[RegExp, Array<ThemeClass>]> = [
    [/\[[^\]]*(GYX|BOX|BOS|BTV|NH|ME|VT|MA|MASS|CT|RI|Manchester,? NH)[^\[]*\]/g, ["whitebg", "black"]]
]

const prebuiltFeeds = {
    default: {
        channels: ["botstalk"],
        whitelist: [],
        blacklist: standard_blacklist,
        themes: standard_themes
    },
    box: {
        channels: ["boxchat"],
        whitelist: [],
        blacklist: standard_blacklist,
        themes: standard_themes
    },
    all: {
        channels: ["botstalk"],
        whitelist: [],
        blacklist: [],
        themes: standard_themes
    }
}
