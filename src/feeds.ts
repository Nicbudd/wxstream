import $ from 'jquery';
import { Poller } from "./polling"

export class Feed {
    config: FeedConfiguration;
    element: HTMLDivElement;
    container: HTMLDivElement;

    constructor(config: FeedConfiguration, title: string, feeds: Array<Feed>, pollers: Map<string, Poller>, poll_freq: number) {
        const container = document.createElement("div")
        container.classList.add("feedcontainer")

        const titlebar = document.createElement("div")
        titlebar.classList.add("titlebar")
        container.appendChild(titlebar)

        const left = document.createElement("div")
        left.classList.add("left")
        titlebar.appendChild(left)

        const titleElem = document.createElement("button")
        titleElem.addEventListener("click", this.openConfig);
        titleElem.classList.add("center")
        titleElem.classList.add("title")
        titleElem.textContent = title
        titlebar.appendChild(titleElem)

        const right = document.createElement("div")
        right.classList.add("right")
        titlebar.appendChild(right)

        const removeButton = document.createElement("button")
        const i = document.createElement("i");
        i.classList.add("ph")
        i.classList.add("ph-minus")
        removeButton.appendChild(i);
        removeButton.addEventListener("click", () => {
            this.remove(feeds, pollers)
        })
        right.appendChild(removeButton)


        const feed = document.createElement("div")
        feed.classList.add("feed")
        container.appendChild(feed)

        addToFeedGrid(container)
        this.config = config
        this.element = feed
        this.container = container

        for (const ch of config.channels) {

            var poller = pollers.get(ch);
            if (poller === undefined) {
                poller = new Poller(ch, poll_freq, this);
                pollers.set(ch, poller)
            } else {
                poller.addFeed(this)
            }
        }
    }

    remove(feeds: Array<Feed>, pollers: Map<string, Poller>) {
        for (const ch of this.config.channels) {
            var poller = pollers.get(ch);
            if (poller !== undefined) {
                poller.removeFeed(this)
            }
        }

        feeds = feeds.filter(f => f !== this);

        this.container.remove();
    }

    openConfig() {
        // alert("config!")
        console.log("Config clicked.")
    }

    addMessage(message: string) {
        const e = document.createElement("div")
        e.classList.add("message");
        // e.setAttribute("href", link);
        // e.setAttribute("target", "_blank");
        // e.setAttribute("rel", "noopener noreferrer"); 
        // thanks https://stackoverflow.com/questions/17711146/how-to-open-link-in-a-new-tab-in-html
        e.innerHTML = message
        this.element.prepend(e);
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
    // var len = g.children().length
    // g.css("grid-template-columns", `repeat(${len}, minmax(0, 1fr))`)
}

// export function removeFromFeedGrid(element: HTMLDivElement) {
//     var g = $("#feedgrid")
//     g.append(element)
//     // var len = g.children().length
//     // g.css("grid-template-columns", `repeat(${len}, minmax(0, 1fr))`)
// }

interface FeedConfiguration {
    channels: Array<string>;
    whitelist: Array<RegExp>;
    blacklist: Array<RegExp>;
    themes: Array<[RegExp, Array<ThemeClass>]>;
}

export type ThemeClass = "red" | "green" | "blue" | "purple" | "orange" |
    "black" | "white" | "lightgray" | "gray" |
    "redbg" | "greenbg" | "bluebg" | "purplebg" | "orangebg" | "blackbg" | 
    "whitebg" | "lightgraybg" | "graybg" | 
    "bold" | "extra-bold" | "emergency";

// light configuration
