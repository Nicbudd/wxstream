import $ from 'jquery';

var feeds: Array<Feed> = [];
const PollingInterval = 3*1000;

var i = 0;

function poll() {

    // orange while we wait
    $("#blinker").addClass("responseWait")

    // fake delay of 500ms for now
    setTimeout(function() {
        // make the call (placeholder for now)
        for (const f of feeds) {
            f.addMessage(`the quick brown fox jumps over the lazy dog. ${i}`)
        }
        i++;

        // when the call returns successful, add the blink animation class
        $("#blinker").removeClass("responseWait")
        $("#blinker").addClass("blinkAnimation")
        setTimeout(function() {
            $("#blinker").removeClass("blinkAnimation")
        }, 2000)

        // handle the returned data
    }, 500)


}

$(function() {
    feeds.push(new Feed(prebuiltFeeds["default"]));
    setInterval(poll, PollingInterval);
    // $("#blinker").on("animationEnd", function(){
    //     $(this).removeClass("blinkAnimation")
    // })
})

class Feed {
    config: FeedConfiguration;
    element: HTMLDivElement;

    constructor(config: FeedConfiguration) {
        const element = document.createElement("div")
        element.classList.add("feed")
        addToFeedGrid(element)
        this.config = config
        this.element = element
    }

    addMessage(message: string) {
        const element = document.createElement("div")
        element.classList.add("message")
        element.innerHTML = message
        this.element.prepend(element);
    }
}

function addToFeedGrid(element: HTMLDivElement) {
    var g = $("#feedgrid")
    g.append(element)
    var len = g.children().length
    console.log(len)
    g.css("grid-template-columns", `repeat(${len}, minmax(0, 1fr))`)
}

interface FeedConfiguration {
    channels: Array<String>;
    whitelist: Array<RegExp>;
    blacklist: Array<RegExp>;
    themes: Array<[RegExp, Theme]>;
}

type Theme = Foreground | FgBg;

interface FgBg {
    foreground: Foreground
    background: Background
};



// light configuration

const prebuiltFeeds = {
    default: {
        channels: ["botstalk"],
        whitelist: [],
        blacklist: [],
        themes: []
    }
}

type Foreground = "red" | "green" | "blue" | "purple" | "orange" | "black" | "white";
type Background = "redbg" | "greenbg" | "bluebg" | "purplebg" | "orangebg" | "blackbg" | "whitebg";






