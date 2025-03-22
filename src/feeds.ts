import $ from 'jquery';

export class Feed {
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
    channel: Array<string>;
    whitelist: Array<RegExp>;
    blacklist: Array<RegExp>;
    themes: Array<[RegExp, Array<ThemeClass>]>;
}

type ThemeClass = "red" | "green" | "blue" | "purple" | "orange" | "black" | "white" |
"redbg" | "greenbg" | "bluebg" | "purplebg" | "orangebg" | "blackbg" | "whitebg";

// light configuration

export const prebuiltFeeds = {
    default: {
        channel: "botstalk",
        whitelist: [],
        blacklist: [],
        themes: []
    }
}


