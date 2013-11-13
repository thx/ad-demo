KISSY.add("app/views/partials/header", function(S, View) {
    return View.extend({
        render: function() {
            console.log('header rendered');
            this.setViewHTML(this.template);
        }
    });
}, {
    requires: ['magix/view']
});