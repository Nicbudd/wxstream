import $ from 'jquery';
import { Poller } from "./polling"

export class Feed {
    config: FeedConfiguration;
    element: HTMLDivElement;

    constructor(config: FeedConfiguration, feeds: Array<Feed>, pollers: Map<string, Poller>, poll_freq: number) {
        const element = document.createElement("div")
        element.classList.add("feed")
        addToFeedGrid(element)
        this.config = config
        this.element = element

        for (const ch of config.channels) {

            var poller = pollers.get(ch);
            if (poller === undefined) {
                poller = new Poller(ch, poll_freq, this);
                pollers.set(ch, poller)
            } 

            poller.addFeed(this)
        }
    }

    addMessage(message: string) {
        const element = document.createElement("div")
        element.classList.add("message")
        element.innerHTML = message
        this.element.prepend(element);
        // console.log(this.element.innerHTML)
        // this.element.innerHTML = this.element.innerHTML + "<br>" + message;
    }

    addErrorMessage(message: string) {
        const element = document.createElement("div")
        element.classList.add("message", "error")
        element.innerHTML = message
        this.element.prepend(element);
    }
}

export function addToFeedGrid(element: HTMLDivElement) {
    var g = $("#feedgrid")
    g.append(element)
    var len = g.children().length
    g.css("grid-template-columns", `repeat(${len}, minmax(0, 1fr))`)
}

interface FeedConfiguration {
    channels: Array<string>;
    whitelist: Array<RegExp>;
    blacklist: Array<RegExp>;
    themes: Array<[RegExp, Array<ThemeClass>]>;
}

export type ThemeClass = "red" | "green" | "blue" | "purple" | "orange" | "black" | "white" |
"redbg" | "greenbg" | "bluebg" | "purplebg" | "orangebg" | "blackbg" | "whitebg";

// light configuration
