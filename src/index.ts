import $ from 'jquery';
import { Poller } from "./polling";
// import "./xmpp.ts"
import { Feed, ThemeClass } from "./feeds";
import "./style.css";
import IdleTracker from "idle-tracker";
import { prebuiltFeeds } from "./defaults";

var feeds: Array<Feed> = [];
var pollers: Map<string, Poller> = new Map();
const PollingInterval = 5*1000;

$(function() {
    // new Feed(prebuiltFeeds["all"], feeds, pollers, PollingInterval);
    new Feed(prebuiltFeeds["default"], feeds, pollers, PollingInterval);
    new Feed(prebuiltFeeds["severe"], feeds, pollers, PollingInterval);
    new Feed(prebuiltFeeds["tornado"], feeds, pollers, PollingInterval);
    
    const idleTracker = new IdleTracker({
        timeout: 1000 * 60 * 30, // 30 minutes
        onIdleCallback: (callback) => {
            
            // suspend all of the polling
            if (callback.idle) {
                console.log("Idle!");
                $("#idlescreen").removeClass("none");
                for (const p of pollers) {
                    p[1].suspend();
                }

            // unsuspend all of the polling
            } else {
                console.log("Unidle!");
                $("#idlescreen").addClass("none");
                for (const p of pollers) {
                    p[1].unsuspend();
                }
            }
        }
    })

    $("#infobutton").on("click", () => {
        $("#info").toggleClass("none")
    })

    $("#info").on("click", () => {
        $("#info").toggleClass("none")
    })

    idleTracker.start();

})

