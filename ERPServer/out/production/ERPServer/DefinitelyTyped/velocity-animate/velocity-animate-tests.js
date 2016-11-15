function basics_arguments() {
    var $el;
    $el.velocity({
        top: 10,
        left: 10
    }, {
        duration: 400,
        easing: "swing",
        queue: "",
        begin: null,
        progress: null,
        complete: null,
        loop: false,
        delay: false,
        display: false,
        mobileHA: true
    });
    $el.velocity({ top: 50 }, 1000);
    $el.velocity({ top: 50 }, 1000, "swing");
    $el.velocity({ top: 50 }, "swing");
    $el.velocity({ top: 50 }, 1000, function () { alert("Hi"); });
    $el.velocity({
        properties: { opacity: 1 },
        options: { duration: 500 }
    });
}
function basics_values() {
    var $el;
    $el.velocity({
        top: 50,
        left: "50%",
        width: "+=5rem",
        height: "*=2"
    });
}
function options_duration() {
    var $el;
    $el.velocity({ opacity: 1 }, { duration: 1000 });
    $el.velocity({ opacity: 1 }, { duration: "slow" });
}
function options_easing() {
    var $el;
    $el.velocity({ width: 50 }, "easeInSine");
    $el.velocity({ width: 50 }, [0.17, 0.67, 0.83, 0.67]);
    $el.velocity({ width: 50 }, [250, 15]);
    $el.velocity({
        borderBottomWidth: ["2px", "spring"],
        width: ["100px", [250, 15]],
        height: "100px"
    }, {
        easing: "easeInSine"
    });
}
function options_queue() {
    var $el;
    $el.velocity({ width: "500px" }, { duration: 10000 });
    setTimeout(function () {
        $el.velocity({ height: "500px" }, { queue: false });
    }, 5000);
}
function options_complete() {
    var $el;
    $el.velocity({
        opacity: 0
    }, {
        complete: function (elements) { console.log(elements); }
    });
}
function options_begin() {
    var $el;
    $el.velocity({
        opacity: 0
    }, {
        begin: function (elements) { console.log(elements); }
    });
}
function options_progress() {
    var $el;
    var $percentComplete;
    var $timeRemaining;
    $el.velocity({
        opacity: 0
    }, {
        progress: function (elements, percentComplete, timeRemaining, timeStart) {
            $percentComplete.html((percentComplete * 100) + "%");
            $timeRemaining.html(timeRemaining + "ms remaining!");
        }
    });
}
function options_mobileHA() {
    var $el;
    $el.velocity({ height: "10em" }, { mobileHA: false });
}
function options_loop() {
    var $el;
    $el.velocity({ height: "10em" }, { loop: 2 });
}
function options_delay() {
    var $el;
    $el.velocity({
        height: "+=10em"
    }, {
        loop: 4,
        delay: 100
    });
}
function options_display() {
    var $el;
    $el.velocity({ opacity: 0 }, { display: "none" });
    $el.velocity({ opacity: 1 }, { display: "block" });
}
function command_scroll() {
    var $el;
    $el
        .velocity("scroll", { duration: 1500, easing: "spring" })
        .velocity({ opacity: 1 });
    $el.velocity("scroll", { container: $("#container") });
    $el.velocity("scroll", { axis: "x" });
    $el
        .velocity("scroll", { duration: 750, offset: -50 })
        .velocity("scroll", { duration: 750, offset: 250 });
}
function command_stop() {
    var $el;
    $el.velocity("stop");
}
function command_reverse() {
    var $el;
    $el.velocity("reverse");
    $el.velocity("reverse", { duration: 2000 });
}
function command_fadeIn_fadeOut() {
    var $el;
    $el
        .velocity("fadeIn", { duration: 1500 })
        .velocity("fadeOut", { delay: 500, duration: 1500 });
}
function command_slideDown_slideUp() {
    var $el;
    $el
        .velocity("slideDown", { duration: 1500 })
        .velocity("slideUp", { delay: 500, duration: 1500 });
}
function feature_transforms() {
    var $el;
    $el.velocity({
        translateX: "200px",
        rotateZ: "45deg"
    });
    $el.velocity({
        translateZ: 0,
        translateX: "200px",
        rotateZ: "45deg"
    });
}
function feature_hooks() {
    var $el;
    $el.velocity({ textShadowBlur: "10px" });
}
function feature_colors() {
    var $el;
    $el.velocity({
        colorRed: "50%",
        colorBlue: "+=50",
        colorAlpha: 0.85
    });
}
function feature_sequences() {
    var $el;
    $.Velocity.Sequences.hover = function (element, options) {
        var duration = options.duration || 750;
        $.Velocity.animate(element, {
            translateY: "-=10px",
        }, {
            delay: duration * 0.033,
            duration: duration,
            loop: 3,
            easing: "easeInOutSine"
        });
    };
    $el.velocity("hover", { duration: 450 });
    $.Velocity.Sequences.hover = function (element, options) {
        var duration = options.duration || 750;
        var calls = [
            {
                properties: { translateY: "-10px" },
                options: {
                    delay: duration * 0.033,
                    duration: duration,
                    loop: 3,
                    easing: "easeInOutSine"
                }
            }
        ];
        $.each(calls, function (i, call) {
            $.Velocity.animate(element, call.properties, call.options);
        });
    };
}
function advanced_value_functions() {
    var $el;
    $el.velocity({
        opacity: function () { return Math.random(); }
    });
    $el.velocity({
        translateX: function (i, total) {
            return (i * 10) + "px";
        }
    });
}
function advanced_forcefeeding() {
    var $el;
    $el.velocity({
        translateX: [500, 0],
        opacity: [0, "easeInSine", 1]
    });
    $el
        .velocity({ translateX: [500, 0] })
        .velocity({ translateX: 1000 });
}
function advanced_utility_function() {
    var divs = document.getElementsByTagName("div");
    $.Velocity.animate(divs, { opacity: 0 }, { duration: 1500 });
    $.Velocity.animate({
        elements: divs,
        properties: { opacity: 0 },
        options: { duration: 1500 }
    });
}
function ui_pack_sequence_running() {
    var $element1;
    var $element2;
    var $element3;
    $element1.velocity({ translateX: 100 }, 1000, function () {
        $element2.velocity({ translateX: 200 }, 1000, function () {
            $element3.velocity({ translateX: 300 }, 1000);
        });
    });
    var mySequence = [
        { e: $element1, p: { translateX: 100 }, o: { duration: 1000 } },
        { e: $element2, p: { translateX: 200 }, o: { duration: 1000 } },
        { e: $element3, p: { translateX: 300 }, o: { duration: 1000 } }
    ];
    $.Velocity.RunSequence(mySequence);
    var mySequence2 = [
        { e: $element1, p: { translateX: 100 }, o: { duration: 1000 } },
        { e: $element2, p: { translateX: 200 }, o: { duration: 1000, sequenceQueue: false } },
        { e: $element3, p: { translateX: 300 }, o: { duration: 1000 } }
    ];
    $.Velocity.RunSequence(mySequence2);
}
function ui_pack_registration() {
    var $element;
    $.Velocity.RegisterEffect("callout.pulse", {
        defaultDuration: 900,
        calls: [
            [{ scaleX: 1.1 }, 0.50],
            [{ scaleX: 1 }, 0.50]
        ]
    });
    $element.velocity("callout.pulse");
    $.Velocity
        .RegisterEffect("transition.flipXIn", {
        defaultDuration: 700,
        calls: [
            [{ opacity: 1, rotateY: [0, -55] }]
        ]
    })
        .RegisterEffect("transition.flipXOut", {
        defaultDuration: 700,
        calls: [
            [{ opacity: 0, rotateY: 55 }]
        ],
        reset: { rotateY: 0 }
    });
    $element
        .velocity("transition.flipXIn")
        .velocity("transition.flipXOut", { delay: 1000 });
}
//# sourceMappingURL=velocity-animate-tests.js.map