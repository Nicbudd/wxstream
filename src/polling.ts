import $ from 'jquery';
import { Feed } from "./feeds";
import { addNewRawMessages } from './filter_format';

const ajax_timeout = 3000; // 3s timeout

var i = 0;

export class Poller {
    channel: string;
    feeds: Array<Feed>;
    seqnum: number;
    suspended: boolean;

    constructor(channel: string, poll_freq: number, feed: Feed) {
        this.channel = channel;
        this.feeds = [];
        this.seqnum = 0;
        this.suspended = false;
        this.feeds.push(feed);
        pollChannel(this);
        setInterval(pollChannel, poll_freq, this)
    }

    addFeed(feed: Feed) {
        this.feeds.push(feed)
    }
    suspend() {
        this.suspended = true
    }
    unsuspend() {
        this.suspended = false
    }
}

function pollChannel(poller: Poller) {
    
    if (poller.feeds.length <= 0) {
        return
    }
    if (poller.suspended) {
        return
    }
    
    console.log(`Pinging channel ${poller.channel}`)

    var req = $.ajax({
        dataType : "json",
        url: `${proxy_url}?https://weather.im/iembot-json/room/${poller.channel}?seqnum=${poller.seqnum}`,
        // upon success do this
        success: function(data) {
            const channel_messages = data["messages"]

            if (channel_messages.length > 0) {
                poller.seqnum = channel_messages.at(-1)["seqnum"]
                console.log("New messages:", channel_messages, poller.seqnum)
                            
                for (const f of poller.feeds) {
                    addNewRawMessages(f, channel_messages)
                }
            }

        }
    }).fail(function() {
        for (const f of poller.feeds) {
            f.addErrorMessage(`Failed to access data from channel [${poller}].`) 
        }
    })
}

const proxy_url="https://cloudflare-cors-anywhere.niczippy775894.workers.dev/"