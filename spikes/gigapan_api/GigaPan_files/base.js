$(function () {

    // UI language selector
    $(".available-language").click(function () {
	$("#language-selection-field").val($(this).attr("rel"));
	$("#language-selection-form").submit();
    });


    // character entry
    var charmap = [
        ['À', 'Á', 'Â', 'Ã', 'Ç', 'È', 'É', 'Ê', 'Ë'],
        ['Í', 'Î', 'Ï', 'Ñ', 'Ó', 'Ô', 'Õ', 'Ù', 'Ú'],
        ['Û', 'Ü', 'Ÿ', 'Ġ', 'Ł', 'Ł̣', 'Ḷ', 'Ŋ', 'Œ'],
        ['à', 'á', 'â', 'ã', 'ç', 'è', 'é', 'ê', 'ë'],
        ['í', 'î', 'ï', 'ñ', 'ó', 'ô', 'õ', 'ù', 'ú'],
        ['û', 'ü', 'ÿ', 'ġ', 'ł', 'ł̣', 'ḷ', 'ŋ', 'œ'],
	['«', '»', '¿', '¡', '€']
    ];

    var character_entry = null;

    function show_character_entry(target, callback) {
	if (!character_entry) {
	    // construct it
	    character_entry = $('<span class="centry"></span>');
	    var i, j, c, tr;
	    var menu = $('<div class="centry-menu"></div>');
            var table = $('<table></table>');
	    for (i = 0; i < charmap.length; ++i) {
	        tr = $('<tr></tr>');
	        for (j = 0; j < charmap[i].length; ++j) {
		    c = $('<td class="centry-character" rel="' + charmap[i][j] + '">' + charmap[i][j] + '</td>');
		    c.click(function () {
		        character_entry.data("callback")($(this).attr("rel"));
		    });
		    tr.append(c);
		}
		table.append(tr);
	    }
	    character_entry.append('<span class="centry-button"><img src="' + MEDIA_URL + 'images/gucharmap.png" alt="character map" style="height: 18pt"/></span>');
            menu.append(table);
	    character_entry.append(menu);
	}

	character_entry.data("callback", callback).insertAfter(target).show();
    }

    function hide_character_entry() {
	if (character_entry)
	    character_entry.hide();
    }

    $("textarea:not(.no-charmap), input:text:not(.no-charmap)").live('focus', function () {
        var target = $(this);
        show_character_entry(target, function (character) {
            target.insertAtCaretPos(character);
        });
    });

    if (window.tinyMCE) {
        tinyMCE.onAddEditor.add(function (mgr, editor) {
            var handle_focus = function (editor) {
                var target = $('#' + editor.id + '_parent')
                show_character_entry(target, function (character) {
                    editor.selection.setContent(character);
                });
            };
            // see http://stackoverflow.com/questions/1616605/does-tinymce-have-usable-content-focus-blur-events/1636723#1636723
            editor.onActivate.add(handle_focus);
            editor.onMouseDown.add(handle_focus);
            editor.onNodeChange.add(handle_focus);
        });
    }
});

