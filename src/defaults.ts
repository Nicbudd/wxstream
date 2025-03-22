import { ThemeClass } from "./feeds"

const standard_blacklist = [/PIREP/, /Climate Report:/, /Routine pilot report/, 
    /Terminal Aerodrome Forecast/, /SIGMET/, /Zone Forecast Package \(ZFP\)/, 
    /Area Forecast Discussion/, /^METAR/, /^METAR/, /Recreational Forecast \(REC\)/,
    /Fire Weather Planning Forecast \(FWF\)/]

const standard_themes: Array<[RegExp, Array<ThemeClass>]> = [
    // New England Locale
    [/\[[^\]]*(GYX|BOX|BOS|BTV|NH|ME|VT|MA|MASS|CT|RI|Manchester,? NH)[^\[]*\]/gi, ["whitebg", "black"]],
    [/(?<=[^\w\[])(GYX|BOX|BOS|BTV|NH|ME|VT|MA|MASS|CT|RI|Manchester,? NH)(?=[^\w\]])/gi, ["bold"]],
    
    // Tornado emergency
    [/(?<!(expires|cancels) )(tornado emergency)/gi, ["emergency"]],
    // PDS (not sure if this will work)
    [/( pds |particularly dangerous situation)/gi, ["emergency"]],
    // Tornado watch
    [/(?<!(expires|cancels) )(tornado watch)/gi, ["bold"]],
    // Severe thunderstorm warnings with tornado possible
    [/(?<!(expires|cancels) )(tornado: possible)/gi, ["bold"]],
    // new tornado warning or tornado possible
    [/(?<!(expires|cancels) )(tornado warning|tornado(?!( watch|: possible| emergency)))/gi, ["red"]],
    // confirmed tornado on the ground
    [/(tornado: radar indicated|tornado: observed)/gi, ["redbg", "black"]],
    
    // severe thunderstorm watch
    [/(?<!(expires|cancels) )(severe thunderstorm watch|severe thunderstorm(?! watch))/gi, ["orange"]],
    // severe thunderstorm (warning)
    [/(?<!(expires|cancels) )severe thunderstorm warning/gi, ["orangebg", "black"]],
    // mesoscale discussions
    [/mesoscale discussion \#\d+/gi, ["greenbg"]],

    // winter storm watch
    [/(?<!(expires|cancels) )winter storm watch/gi, ["blue"]],
    // winter storm/weather warnings/advisories
    [/(?<!(expires|cancels) )(winter storm warning|winter storm(?! watch)|winter weather advisory|winter weather(?! watch))/gi, ["bluebg"]],

    // flash flood warning
    [/(?<!(expires|cancels) )(flash flood warning)/gi, ["greenbg"]], 
    // flood warning
    [/(?<=issues )(flood warning)/gi, ["greenbg"]], 
    // flood warning
    [/flood(ing)? (?!(warning|cancels))/gmi, ["blue"]], 

    // hail side
    [/hail:?\s*(of\s*)?[><+-]?\d+\.?\d*\s?(inches|inch|in)(hail)?/gi, ["blue"]],

    // snowfall amounts
    [/(heavy\s*)?snow:?\s*(of\s*)?[><+-]?\d+\.?\d*\s?(inches|inch|in|)(of)?(snow)?/gi, ["bluebg"]],

    // reports of damage
    [/DMG|damage/gi, ["purplebg", "black"]],

    // wind speeds
    [/(sust |sustained |peak )?(gust|wind|winds)?\:? ?(of )?M?(\d{2}G)?\d+\.?\d*\s?(mph|kts|kt|knots|knot)/gi, ["green"]], 

    // reports
    [/(\] )(.* reports ((tstm|wnd|gst|non-tstm|gust|snow|hail) )*)/gi, ["purple"]],

    // space weather
    [/(aurora(?!,? co))|geomagnetic|(space weather prediction center)|(swpc)/gi, ["purple"]],

    // k-index
    [/(k-index (of )?\d)/gi, ["purplebg", "black"]]
]

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
    all: {
        channels: ["botstalk"],
        whitelist: [],
        blacklist: [],
        themes: standard_themes
    }
}