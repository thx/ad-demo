/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('app/brix2', function(S, View) {
    var Pagelet;
    var GetPagelet = function(fn) {
        if (Pagelet) {
            fn(Pagelet);
        } else {
            S.use('brix/core/pagelet', function(S, P) {
                fn(Pagelet = P);
            });
        }
    };
    View.prototype.renderByPagelet = function(data, ready) {
        var me = this;
        var sign = me.sign;
        var pagelet = me.getManaged('pagelet');
        if (pagelet) {
            pagelet.ready(function() {
                pagelet.setChunkData(data); //
            });
        } else {
            if (me.$pageletQueue) {
                me.$pageletQueue.push({
                    data: data,
                    ready: ready
                });
                return;
            }
            me.$pageletQueue = [];
            GetPagelet(function(Pglt) {
                if (sign && sign == me.sign) {
                    S.one('#' + me.id).html('');
                    me.beginUpdate();
                    pagelet = new Pglt({
                        container: '#' + me.id,
                        tmpl: me.template,
                        data: data,
                        destroyAction: 'empty'
                    });
                    console.log(data);
                    me.endUpdate();
                    me.manage('pagelet', pagelet);
                    pagelet.on('destroy', function() {
                        delete me.$pageletQueue;
                        me.owner.unmountZoneVframes();
                    });
                    pagelet.on('beforeRefreshTmpl', function(e) {
                        me.owner.unmountZoneVframes(e.node[0]);
                    });
                    pagelet.on('afterRefreshTmpl', function(e) {
                        me.owner.mountZoneVframes(e.node[0], null, true);
                    });
                    pagelet.ready(function() {
                        var queue = me.$pageletQueue;
                        delete me.$pageletQueue;
                        if (sign == me.sign) {
                            if (ready) {
                                ready.call(me, pagelet);
                            }
                            while (queue.length) {
                                var q = queue.shift();
                                me.setViewPagelet(q.data, q.ready);
                            }
                        }
                    });
                }
            });
        }
    };
    return View;
}, {
    requires: ['mxext/view']
});