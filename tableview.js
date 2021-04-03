$(document).ready(function () {
    var name = 'name';
    var days = 7;

    function cbDropdown(column) {
        return $('<ul>', {
            'class': 'cb-dropdown'
        }).appendTo($('<div>', {
            'class': 'cb-dropdown-wrap'
        }).appendTo(column));
    };

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";", secure = false;
    };

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    $('#example').DataTable({
        initComplete: function () {
            this.api().columns().every(function () {
                var column = this;
                var ddmenu = cbDropdown($(column.header()))
                    .on('change', ':checkbox', function () {
                        var active;
                        var vals = $(':checked', ddmenu).map(function (index, element) {
                            active = true;
                            return $.fn.dataTable.util.escapeRegex($(element).val());
                        }).toArray().join('|');

                        column
                            .search(vals.length > 0 ? '^(' + vals + ')$' : '', true, false)
                            .draw();

                        // Highlight the current item if selected.
                        if (this.checked) {
                            $(this).closest('li').addClass('active');
                        } else {
                            $(this).closest('li').removeClass('active');
                        }

                        // Highlight the current filter if selected.
                        var active2 = ddmenu.parent().is('.active');
                        if (active && !active2) {
                            ddmenu.parent().addClass('active');
                        } else if (!active && active2) {
                            ddmenu.parent().removeClass('active');
                        }
                    });

                column.data().unique().sort().each(function (d, j) {
                    var // wrapped
                        $label = $('<label>'),
                        $text = $('<span>', {
                            text: d
                        }),
                        $cb = $('<input>', {
                            type: 'checkbox',
                            value: d
                        });

                    $text.appendTo($label);
                    $cb.appendTo($label);

                    ddmenu.append($('<li>').append($label));
                });
            });
        },
        stateSave: true,
        stateSaveCallback: function (settings, data) {
            var nvalue = JSON.stringify(data);
            setCookie('DataTables_' + settings.sInstance + name, nvalue, days);
            console.log(document.cookie, settings);
        },
        stateLoadCallback: function (settings, callback) {
            var dta = getCookie('DataTables_' + settings.sInstance + name);
            var d = new Date();
            let dte = d.getTime();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            var defaultTableView = {"time":dte,"start":0,"length":10,"order":[[0,"asc"]],"search":{"search":"","smart":true,"regex":false,"caseInsensitive":true},"columns":[{"visible":true,"search":{"search":"","smart":true,"regex":false,"caseInsensitive":true}},{"visible":true,"search":{"search":"","smart":true,"regex":false,"caseInsensitive":true}},{"visible":true,"search":{"search":"","smart":true,"regex":false,"caseInsensitive":true}},{"visible":true,"search":{"search":"","smart":true,"regex":false,"caseInsensitive":true}},{"visible":true,"search":{"search":"","smart":true,"regex":false,"caseInsensitive":true}},{"visible":true,"search":{"search":"","smart":true,"regex":false,"caseInsensitive":true}}],"user":"user","table_name":"name"};
            var defaultData = JSON.stringify(defaultTableView);
            if(dta === ""){
                console.log('cookie cleared');
                document.cookie = 'DataTables_' + settings.sInstance + name + "=" + defaultData + ";" + expires + ";path=/" + ";", secure = false;
                dta = getCookie('DataTables_' + settings.sInstance + name);
                return JSON.parse(dta);
            }else{
                return JSON.parse(dta);
            }
        },
        stateSaveParams: function (settings, data) {
            data.user = 'user';
            data.table_name = 'name';
        }
    });
});