/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('app/views/examples/dialog', function(S, View, Dialog) {
    return View.extend({
        render: function() {
            var me = this;
            me.renderByPagelet({
                name: 'xinglie',
                viewId: me.id
            }, function(pagelet) {
                var config = {
                    tmpl: pagelet.getStoreTmpl('dialogcontent'),
                    start: {
                        left: 180,
                        top: -200,
                        opacity: 0
                    },
                    end: {
                        left: 180,
                        top: 100,
                        opacity: 1
                    },
                    width: 300
                };
                me.manage('dialog', new Dialog(config));
            });
        },
        'modifyUsername<click>': function(e) {
            var dlg = this.getManaged('dialog');
            if (dlg) {
                dlg.show();
            }
        },
        'saveUsername<click>': function(e) {
            var dlg = this.getManaged('dialog');
            if (dlg) {
                var ipt = dlg.get('el').one('input');
                if (ipt) {
                    S.one('#J_username_' + this.id).html(S.escapeHTML(ipt.val()));
                }
                dlg.hide();
            }
        }
    });
}, {
    requires: ['mxext/view', 'brix/gallery/dialog/index', 'brix/gallery/dialog/index.css']
});