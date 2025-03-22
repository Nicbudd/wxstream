import $ from 'jquery';
import { Feed } from "./feeds";
import { addNewRawMessages } from './filter_format';

const ajax_timeout = 3000; // 3s timeout

var i = 0;

var prev_seqnum = 0;
var new_seqnum = 0;

var new_messages: Map<string, Poller> = new Map();

// export function refreshAll(feeds: any) {
//     // make the blinker slowly turn red while we wait
//     // $("#blinker").addClass("responseWait")

//     new_messages = new Map();

//     // make the calls
//     for (const f of feeds) {
//         pollChannel(f)
//     }

//     prev_seqnum = new_seqnum


//     // // fake delay of 500ms for now
//     // setTimeout(function() {




//     //     // // when the call returns successful, add the blink animation class
//     //     // $("#blinker").removeClass("responseWait")
//     //     // $("#blinker").addClass("blinkAnimation")
//     //     // setTimeout(function() {
//     //     //     $("#blinker").removeClass("blinkAnimation")
//     //     // }, 2000)

//     //     // handle the returned data

//     //     // for (const f of feeds) {
//     //     //     for (const channel of f.config.channels) {
//     //     //         console.log(channel, new_messages)
//     //     //         const messages = new_messages.get(channel);
//     //     //         console.log(messages)
//     //     //         if (messages !== undefined) {
//     //     //             for (const message of messages) {
//     //     //                 f.addMessage(message)
//     //     //             }
//     //     //         } else {
//     //     //             console.log(messages)
//     //     //         }
//     //     //     }
//     //     // }


//     // }, 500)
// }

class Poller {
    channel: string;
    feeds: Array<Feed>;
    seqnum: number

    constructor(channel: string, feed: Feed, poll_freq: number) {
        this.channel = channel
        this.feeds = [feed]
        this.seqnum = 0
        setInterval(pollChannel, poll_freq, this)
    }
}

function pollChannel(poller: Poller) {
    var req = $.ajax({
        dataType : "json",
        url: `${proxy_url}?https://weather.im/iembot-json/room/${poller.channel}?seqnum=${prev_seqnum}`,
        // upon success do this
        success: function(data) {
            const channel_messages = data["messages"]

            var seqnum;
            if (channel_messages.length > 0) {
                seqnum = channel_messages.at(-1)["seqnum"]
            } else {
                seqnum = new_messages
            }
            
            console.log("New messages:", new_messages, seqnum)

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