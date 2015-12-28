(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["press_item.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
["press"], 
[], 
function (l_press, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("press", l_press);
var t_2 = "";t_2 += "\n    <h3>";
t_2 += runtime.suppressValue(runtime.memberLookup((l_press),"title"), env.opts.autoescape);
t_2 += "</h3>\n    <span class=\"date\">";
t_2 += runtime.suppressValue(runtime.memberLookup((l_press),"date"), env.opts.autoescape);
t_2 += "</span>\n    ";
t_2 += runtime.suppressValue(runtime.memberLookup((l_press),"body"), env.opts.autoescape);
t_2 += "\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("press_item");
context.setVariable("press_item", macro_t_1);
output += "\n\n";
frame = frame.push();
var t_5 = runtime.contextOrFrameLookup(context, frame, "data");
if(t_5) {var t_4 = t_5.length;
for(var t_3=0; t_3 < t_5.length; t_3++) {
var t_6 = t_5[t_3];
frame.set("press", t_6);
frame.set("loop.index", t_3 + 1);
frame.set("loop.index0", t_3);
frame.set("loop.revindex", t_4 - t_3);
frame.set("loop.revindex0", t_4 - t_3 - 1);
frame.set("loop.first", t_3 === 0);
frame.set("loop.last", t_3 === t_4 - 1);
frame.set("loop.length", t_4);
output += "\n    ";
output += runtime.suppressValue((lineno = 7, colno = 15, runtime.callWrap(macro_t_1, "press_item", context, [t_6])), env.opts.autoescape);
output += "\n";
;
}
}
frame = frame.pop();
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["review_item.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
["review"], 
[], 
function (l_review, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("review", l_review);
var t_2 = "";t_2 += "\n    <h3>";
t_2 += runtime.suppressValue(runtime.memberLookup((l_review),"title"), env.opts.autoescape);
t_2 += "</h3>\n    <span class=\"date\">";
t_2 += runtime.suppressValue(runtime.memberLookup((l_review),"date"), env.opts.autoescape);
t_2 += "</span>\n    ";
t_2 += runtime.suppressValue(runtime.memberLookup((l_review),"body"), env.opts.autoescape);
t_2 += "\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("review_item");
context.setVariable("review_item", macro_t_1);
output += "\n\n";
frame = frame.push();
var t_5 = runtime.contextOrFrameLookup(context, frame, "reviews");
if(t_5) {var t_4 = t_5.length;
for(var t_3=0; t_3 < t_5.length; t_3++) {
var t_6 = t_5[t_3];
frame.set("review", t_6);
frame.set("loop.index", t_3 + 1);
frame.set("loop.index0", t_3);
frame.set("loop.revindex", t_4 - t_3);
frame.set("loop.revindex0", t_4 - t_3 - 1);
frame.set("loop.first", t_3 === 0);
frame.set("loop.last", t_3 === t_4 - 1);
frame.set("loop.length", t_4);
output += "\n    ";
output += runtime.suppressValue((lineno = 7, colno = 16, runtime.callWrap(macro_t_1, "review_item", context, [t_6])), env.opts.autoescape);
output += "\n";
;
}
}
frame = frame.pop();
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

