(function(window, undefined){
	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
    };
    var txt ="";

	window.Asc.plugin.init = function (text) {

        txt = text;
    };

	$(document).ready(function () {

        $("#correct").click(function() {
            var locale = document.getElementsByClassName("prefs__set-locale")[0].value;
            var tp = new Typograf({locale: [locale]});
            var rules = document.getElementsByClassName("prefs__rule-checkbox");

            for (var rule = 0; rule < rules.length; rule++) {
                if (rules[rule].checked) {
                    tp.enableRule(rules[rule].getAttribute("data-id"));
                }
                else {
                    tp.disableRule(rules[rule].getAttribute("data-id"));
                }
            }

            var allParasInSelection = txt.split(/\n/);
            var allTypografedParas = [];

            for (var Item = 0; Item < allParasInSelection.length; Item++) {
                typografedText = tp.execute(allParasInSelection[Item]);
                allTypografedParas.push(typografedText);
            }

            Asc.scope.arr = allTypografedParas;
            window.Asc.plugin.info.recalculate = true;

            window.Asc.plugin.callCommand(function() {
                Api.ReplaceTextSmart(Asc.scope.arr);
            });
        })
    });

    window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

	window.Asc.plugin.onExternalMouseUp = function()
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
	};

})(window, undefined);
