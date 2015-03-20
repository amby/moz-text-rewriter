var data = require("sdk/self").data,
    pageMod = require("sdk/page-mod"),
    prefs = require("sdk/simple-prefs"),
    tabs = require("sdk/tabs"),
    ss = require("sdk/simple-storage"),
    tag = "rewrites",
    tag_in = "words_in",
    default_data = [{
        "from": "mispell",
        "to": "misspell",
        "ic": false,
        "mw": false
    }];

// array of {from:str, to:str, ic: bool, mw: bool} objects
if (ss.storage.replacements === undefined)
    ss.storage.replacements = JSON.stringify(default_data);

// Send JSON data to the content script.
function emitWords(worker) {
    worker.port.emit(tag, ss.storage.replacements);
}

// Activate on all pages.
pageMod.PageMod({
    include: "*",
    contentScriptFile: data.url("text-rewriter.js"),
    onAttach: emitWords
});

// For preferences page.
pageMod.PageMod({
    include: /.*text-rewriter\/data\/prefs.html/,
    contentScriptFile: data.url("prefs.js"),
    onAttach: function(worker) {
        emitWords(worker);
        worker.port.on(tag_in, function(data) {
            ss.storage.replacements = data;
        });
    }
});

prefs.on("Preferences", function() {
    tabs.open(data.url("prefs.html"));
});