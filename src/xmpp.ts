// XMPP
const { client, xml } = require("@xmpp/client");
const debug = require("@xmpp/debug");

const proxy_url="https://cloudflare-cors-anywhere.niczippy775894.workers.dev/"

const xmpp = client({
    // service: "conference.weather.im",
    service: `${proxy_url}?https://conference.weather.im/http-bind`,
    // service: "wss://conference.weather.im/http-bind",
    // service: "xmpp://129.186.185.33:5223",
    // domain: "conference.weather.im",
    resource: "wxstream (by Nicolas Zerbinopoulos)",
    credentials: () => Promise.resolve({ username: '', password: '' })
})

// debug(xmpp, true);

xmpp.on("error", (err: any) => {
    console.error("XMPP Error:", err);
});

xmpp.on("offline", () => {
    console.log("offline");
});

xmpp.on('online', async (address: any) => {
    console.log('Connected as', address.toString());

    const roomJid = 'botstalk@conference.weather.im';
    const nick = 'AnonymousBot';
    
    // Join MUC room anonymously
    const presence = xml(
        'presence',
        { to: `${roomJid}/${nick}` },
        xml('x', { xmlns: 'http://jabber.org/protocol/muc' })
    );
    xmpp.send(presence);
    console.log(`Joined room: ${roomJid} as ${nick}`);
});

xmpp.on('stanza', (stanza: any) => {
    if (stanza.is('message') && stanza.attrs.type === 'groupchat') {
        const from = stanza.attrs.from;
        const body = stanza.getChildText('body');
        if (body) {
            console.log(`[${from}]: ${body}`);
        }
    }
});
  
xmpp.start().catch(console.error);
