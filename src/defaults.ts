import { ThemeClass } from "./feeds"

const standard_blacklist = [/PIREP/, /Climate Report:/, /Routine pilot report/, 
    /Terminal Aerodrome Forecast/, /SIGMET/, /Zone Forecast Package \(ZFP\)/, 
    /Area Forecast Discussion/, /^METAR/, /^SPECI/, /Recreational Forecast \(REC\)/,
    /Fire Weather Planning Forecast \(FWF\)/, /center issues .+ for portions of [a-z]{3}'s area/i]

const standard_themes: Array<[RegExp, Array<ThemeClass>]> = [
    // New England Locale
    [/\[[^\]]*(NH|ME|VT|MA|MASS|CT|RI)\]/gi, ["whitebg", "black"]],
    [/(?<!\w)(NH|ME|VT|MA|MASS|CT|RI)(?!\w)/gi, ["bold"]],
    // local WFOs
    [/(?<!\w)(GYX|BOX|BOS|BTV)(?!\w)/gi, ["bold"]],
    
    // Tornado emergency
    [/(?<!(expires|cancels) )(tornado emergency)/gi, ["emergency"]],
    // PDS (not sure if this will work)
    [/(pds|particularly dangerous situation)/gi, ["emergency"]],
    // Tornado watch
    [/(?<!(expires|cancels) )(tornado watch)/gi, ["bold"]],
    // Severe thunderstorm warnings with tornado possible
    [/(?<!(expires|cancels) )(tornado: possible)/gi, ["red", "bold"]],
    // confirmed tornado on the ground
    [/(tornado: radar indicated|tornado: observed|confirmed tornado)/gi, ["redbg", "black", "bold"]],
    // tornado warning
    [/(?<!(expires|cancels) )(tornado warning)/gi, ["redbg", "black"]],
    // other mentions of tornado
    [/(?<!confirmed )tornado(?!( warning|: radar indicated|: observed| watch|: possible| emergency))/gi, ["red"]],
    
    // severe thunderstorm warning
    [/(?<!(expires|cancels) )severe thunderstorm warning/gi, ["orangebg", "black"]],
    // severe thunderstorm watch
    [/(?<!(expires|cancels) )(severe thunderstorm watch|severe thunderstorm(?!( watch| warning)))/gi, ["orange"]],
    // mesoscale discussions
    [/mesoscale discussion \#\d+/gi, ["greenbg"]],

    // winter storm watch
    [/(?<!(expires|cancels) )winter storm watch/gi, ["blue"]],
    // winter storm/weather warnings/advisories
    [/(?<!(expires|cancels) )(winter storm warning|winter storm(?! watch)|winter weather advisory|winter weather(?! watch))/gi, ["bluebg"]],

    // flash flood warning
    [/(?<!(expires|cancels) )(flash flood warning)/gi, ["greenbg", "bold"]], 
    // flood warning
    [/(?<!(expires|cancels|flash) )(flood warning)/gi, ["greenbg", "black"]], 
    // flood warning
    [/flood(ing)? (?!(warning|cancels))/gi, ["blue"]], 

    // fire
    [/(wildfire|fire)/gi, ["red"]],
    [/red flag warning/gi, ["red"]],
    // [/fire/gi, ["redbg", "black"]],

    // hail size
    [/hail:?\s*(of\s*)?[><+-]?\d+\.?\d*\s?(inches|inch|in)(hail)?/gi, ["blue"]],

    // fog
    [/(dense fog advisory|dense fog|fog)/gi, ["graybg", "black"]],

    // snowfall amounts
    [/(heavy\s*)?snow:?\s*(of\s*)?[><+-]?\d+\.?\d*\s?(inches|inch|in|)(of)?(snow)?/gi, ["bluebg"]],

    // reports of damage
    [/DMG|damage/gi, ["purplebg", "black"]],

    // wind speeds
    [/(sust |sustained |peak )?(gust|wind|winds)?\:? ?(of )?M?(\d{2}G)?\d+\.?\d*\s?(mph|kts|kt|knots|knot)/gi, ["green"]], 

    // reports
    [/(?<=\] )(.* reports ((tstm|wnd|gst|non-tstm|gust|snow|hail) )*)/gi, ["purple"]],

    // space weather
    [/(aurora(?!,? co))|geomagnetic|(space weather prediction center)|(swpc)/gi, ["purple"]],

    // k-index
    [/(k-index (of )?\d)/gi, ["purplebg", "black"]]
]

const tornado_whitelist = [/(tornado|mesoscale discussion)/gi]
const severe_whitelist = [/thunderstorm/gi, /(?<!non\-)tstm/gi].concat(tornado_whitelist)
const fire_whitelist = [/(fire|red flag)/gi]
const winter_whitelist = [/(winter|snow|sleet|graupel|wintry|freeze|freezing)/gi]
const metar_whitelist = [/(?<!\w)(metar|speci)(?!\w)/gi]

export const prebuiltFeeds = {
    default: {
        channels: ["botstalk"],
        whitelist: [],
        blacklist: standard_blacklist,
        themes: standard_themes
    },
    box: {
        channels: ["boxchat"],
        whitelist: [],
        blacklist: standard_blacklist,
        themes: standard_themes
    },
    gyx: {
        channels: ["gyxchat"],
        whitelist: [],
        blacklist: standard_blacklist,
        themes: standard_themes
    },
    test: {
        channels: ["test"],
        whitelist: [],
        blacklist: standard_blacklist,
        themes: standard_themes
    },
    severe: {
        channels: ["botstalk"],
        whitelist: severe_whitelist,
        blacklist: standard_blacklist,
        themes: standard_themes
    },
    tornado: {
        channels: ["botstalk"],
        whitelist: tornado_whitelist,
        blacklist: standard_blacklist,
        themes: standard_themes
    },
    winter: {
        channels: ["botstalk"],
        whitelist: winter_whitelist,
        blacklist: standard_blacklist,
        themes: standard_themes
    },
    fire: {
        channels: ["botstalk"],
        whitelist: fire_whitelist,
        blacklist: standard_blacklist,
        themes: standard_themes
    },
    all: {
        channels: ["botstalk"],
        whitelist: [],
        blacklist: [],
        themes: standard_themes
    },
    metar: {
        channels: ["botstalk"],
        whitelist: metar_whitelist,
        blacklist: [],
        themes: standard_themes
    }
}