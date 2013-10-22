/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('app/views/examples/lazyload', function(S, View) {
    return View.extend({
        render: function() {
            var me = this;
            me.renderByPagelet();
        },
        loadVframe: function(anchor, name) {
            var td = S.one('#' + anchor).parent('td');
            var vf = this.owner;
            var id = td.attr('id', S.guid('td_')).attr('id');
            vf.mountVframe(id, 'app/views/examples/' + name);
        },
        'loadSortable<click>': function(e) {
            this.loadVframe(e.currentId, 'table-sortable');
        },
        'loadDialog<click>': function(e) {
            this.loadVframe(e.currentId, 'dialog');
        }
    });
}, {
    requires: ['mxext/view']
});