import { Feed } from "./feeds";

export function addNewRawMessages(feed: Feed, messages: Array<any>) {
    for (const message of messages) {
        addNewRawMessage(feed, message)
    } 
}

function addNewRawMessage(feed: Feed, message: any) {
    var txt: string = message["message"];
    txt = strip(txt)

    // whitelist
    for (const re of feed.config.whitelist) {
        if (!re.test(txt)) {
            return
        }
    }

    // blacklist
    for (const re of feed.config.blacklist) {
        if (re.test(txt)) {
            return
        }
    }

    // // themes
    // for (const th of feed.config.themes) {
    //     const classList = th[1].join(", ");
    //     // var sdfff: String = String(txt)
    //     txt = th[0].replaceAll(txt, `<span class="${classList}">$0</span>`)
    // }

    // console.log(txt)

    feed.addMessage(txt)
}

// https://stackoverflow.com/questions/822452/strip-html-tags-from-text-using-plain-javascript/47140708#47140708
function strip(html: string){
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
}