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

    if (poller.channel == "test") {
        for (const f of poller.feeds) {
            var msgs: Array<Object> = [];
            for (const txt of test_msgs) {
                msgs.push({"message": txt, "ts": "2000-01-01 00:00:00", "seqnum": 0})
            }
            addNewRawMessages(f, msgs)
        }
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

const test_msgs = [
    "BOX issues Tornado Warning for Hillsborough [NH]",
    "BOX issues Tornado Emergency for Middlesex [MA]",
    "BOX issues Flash Flood Warning",
    "BOX expires Flash Flood Warning",
    "BOX issues Flood Warning",
    "BOX expires Flood Warning",
    "BOU issues Geomagnetic Storm Warning for Aurora, CO",
    "4 ENE Hanover [Oxford Co, ME] Fire Dept/Rescue reports Ice Jam at 10:00 AM EDT -- A mile long ice jam was present along the Androscoggin River along Rumford Center. The jam was not resulting in flooding at the time of the report."
]

const proxy_url="https://cloudflare-cors-anywhere.niczippy775894.workers.dev/"