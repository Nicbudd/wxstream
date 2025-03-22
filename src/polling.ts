import $ from 'jquery';
import { Feed } from "./feeds";
import { addNewRawMessages } from './filter_format';

const ajax_timeout = 3000; // 3s timeout

var i = 0;

export class Poller {
    channel: string;
    feeds: Array<Feed>;
    seqnum: number

    constructor(channel: string, poll_freq: number) {
        this.channel = channel
        this.feeds = []
        this.seqnum = 0
        setInterval(pollChannel, poll_freq, this)
    }

    addFeed(feed: Feed) {
        this.feeds.push(feed)
    }
}

function pollChannel(poller: Poller) {
    console.log(poller)

    if (poller.feeds.length <= 0) {
        return
    }

    var req = $.ajax({
        dataType : "json",
        url: `${proxy_url}?https://weather.im/iembot-json/room/${poller.channel}?seqnum=${poller.seqnum}`,
        // upon success do this
        success: function(data) {
            const channel_messages = data["messages"]

            if (channel_messages.length > 0) {
                poller.seqnum = channel_messages.at(-1)["seqnum"]
            }
            
            console.log("New messages:", channel_messages, poller.seqnum)

            for (const f of poller.feeds) {
                addNewRawMessages(f, channel_messages)
            }
        }
    }).fail(function() {
        for (const f of poller.feeds) {
            f.addErrorMessage(`Failed to access data from channel [${poller}].`) 
        }
    })
}

const proxy_url="https://cloudflare-cors-anywhere.niczippy775894.workers.dev/"

// function pollChannel(feed: Feed) {
//     const channel = feed.config.channel;
//     const channel_messages = new_messages.get(channel);

//     if (channel_messages === undefined) {
//         var req = $.ajax({
//             dataType : "json",
//             url: `${proxy_url}?https://weather.im/iembot-json/room/${channel}?seqnum=${prev_seqnum}`,
//             // upon success do this
//             success: function(data) {
//                 const channel_messages = data["messages"]
//                 new_messages.set(channel, channel_messages)

//                 var seqnum;
//                 if (channel_messages.length > 0) {
//                     seqnum = channel_messages.at(-1)["seqnum"]
//                 } else {
//                     seqnum = new_messages
//                 }
                
//                 console.log("New messages:", new_messages, new_seqnum)

//                 addNewRawMessages(feed, channel_messages)
//             }
//         }).fail(function() {
//             feed.addErrorMessage(`Failed to access data from channel [${channel}].`) 
//         })

//     } else {
//         addNewRawMessages(feed, channel_messages)
//     }
// }