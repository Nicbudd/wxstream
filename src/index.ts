import $ from 'jquery';
import { Poller } from "./polling";
// import "./xmpp.ts"
import { Feed, ThemeClass } from "./feeds";
import "./style.css";
import IdleTracker from "idle-tracker";
import { prebuiltFeeds } from "./defaults";

var feeds: Array<Feed> = [];
var pollers: Map<string, Poller> = new Map();
const PollingInterval = 5 * 1000;

// function addNewDefaultFeed(name: string) {
//     new Feed(prebuiltFeeds[name], feeds, pollers, PollingInterval);
// }

$(function () {
    new Feed(prebuiltFeeds["default"], "default", feeds, pollers, PollingInterval);
    new Feed(prebuiltFeeds["tornado"], "tornado", feeds, pollers, PollingInterval);
    new Feed(prebuiltFeeds["gyx"], "gyx", feeds, pollers, PollingInterval);
    // new Feed(prebuiltFeeds["all"], feeds, pollers, PollingInterval);
    // new Feed(prebuiltFeeds["damage"], "damage", feeds, pollers, PollingInterval);
    // new Feed(prebuiltFeeds["severe"], "damage", feeds, pollers, PollingInterval);

    $(":root").css("--itemcount", feeds.length);

    const idleTracker = new IdleTracker({
        timeout: 1000 * 60 * 15, // 15 minutes
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

    $("#addfeedbutton").on("click", () => {
        $("#addmenu").toggleClass("none")
    })
    $("#addmenu").on("click", () => {
        $("#addmenu").toggleClass("none")
    })

    Object.entries(prebuiltFeeds).forEach(([key, value]) => {
        if (value.name !== undefined) {
            $("<button />", {
                text: value.name,
                id: `add_feed_${value.name}`,
                class: "add_feed_button",
                click: function () {
                    new Feed(prebuiltFeeds[key as keyof typeof prebuiltFeeds], key, feeds, pollers, PollingInterval);

                    // add feed
                    console.log(feeds);
                    $(":root").css("--itemcount", feeds.length);
                }
            }).appendTo("#add_feed_buttons")
        }

    });


    // $("#adddefault").on("click", () => {
    //     new Feed(prebuiltFeeds["default"], "default", feeds, pollers, PollingInterval);

    //     // add feed
    //     console.log(feeds);
    //     $(":root").css("--itemcount", feeds.length);
    // })

    // $("#settingsbutton").on("click", () => {
    //     console.log("Change settings")
    // })

    $("#info").on("click", () => {
        $("#info").toggleClass("none")
    })

    idleTracker.start();

})

