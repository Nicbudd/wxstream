import { Feed } from "./feeds";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function addNewRawMessages(feed: Feed, messages: Array<any>) {
    console.log(feed, messages)
    for (const message of messages) {
        addNewRawMessage(feed, message)
    } 
}

function addNewRawMessage(feed: Feed, message: any) {
    var txt: string = message["message"];
    txt = strip(txt)

    
    var include = true;
    if (feed.config.whitelist.length > 0) {
        include = false;
    }

    // whitelist
    for (const re of feed.config.whitelist) {
        if (re.test(txt)) {
            include = true
        }
    }

    // blacklist
    for (const re of feed.config.blacklist) {
        if (re.test(txt)) {
            include = false
        }
    }

    if (!include) {
        return
    }

    // themes
    for (const th of feed.config.themes) {
        const classList = th[1].join(" ");
        // var sdfff: String = String(txt)
        txt = txt.replaceAll(th[0], (match) => `<span class="${classList}">${match}</span>`)
    }

    const time = dayjs(message["ts"] + " +0000", "YYYY-MM-DD HH:mm:ss ZZ")
    const formatted_time = time.utc().format("HH:mm:ss")
    // const time = "12:34:56";
    txt = `<span class='time'>${formatted_time}</span> ${txt}`
    
    const link = getLink(message["message"]);
    feed.addMessage(txt, link)
}

// https://stackoverflow.com/questions/822452/strip-html-tags-from-text-using-plain-javascript/47140708#47140708
function strip(html: string): string {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
}

function getLink(html: string): string {
    let doc = new DOMParser().parseFromString(html, "text/html");
    let linktag = doc.getElementsByTagName("a")[0];
    if (linktag === undefined) {
        return ""
    } else {
        return linktag.getAttribute("href") || "";
    }
}