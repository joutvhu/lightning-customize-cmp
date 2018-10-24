var EventPublisher = (function () {
    function EventPublisher() {
        this.findKeys();
    }
    EventPublisher.prototype.findKeys = function () {
        var e = $A.get('e'), i, j, v = 0;
        for (i in e) {
            if (typeof e[i] != 'object')
                continue;
            j = Object.keys(e[i])[0];
            if (j.includes('markup') && e[i][j].constructor && e[i][j].constructor.name.toLowerCase() != 'object')
                EventPublisher.keys.def = i;
        }
        for (i in e[EventPublisher.keys.def]) {
            for (j in e[EventPublisher.keys.def][i]) {
                if (e[EventPublisher.keys.def][i][j] != null) {
                    if (!(v & 1) && typeof e[EventPublisher.keys.def][i][j] == 'object' && e[EventPublisher.keys.def][i][j].constructor.name.toLowerCase() == 'object') {
                        EventPublisher.keys.cof = j;
                        v |= 1;
                    } else if (!(v & 2) && e[EventPublisher.keys.def][i][j] === 'G' || e[EventPublisher.keys.def][i][j] === 'I' || e[EventPublisher.keys.def][i][j] === 'PP') {
                        EventPublisher.keys.acc = j;
                        v |= 2;
                    } else if ((v & 3) && typeof e[EventPublisher.keys.def][i][j] == 'object' && e[EventPublisher.keys.def][i][j].constructor.name.toLowerCase() != 'object' && Object.keys(e[EventPublisher.keys.def][i][j]).length == 2) {
                        EventPublisher.keys.att = j;
                        if (e[EventPublisher.keys.def][i][j][Object.keys(e[EventPublisher.keys.def][i][j])[0]].constructor.name.toLowerCase() == 'object')
                            EventPublisher.keys.val = Object.keys(e[EventPublisher.keys.def][i][j])[0];
                        else
                            EventPublisher.keys.val = Object.keys(e[EventPublisher.keys.def][i][j])[1];
                        v |= 4;
                    }
                    if (v == 7)
                        break;
                }
            }
            if (v == 7)
                break;
        }
    };
    EventPublisher.prototype.events = function () {
        var e = $A.get('e'), l = e[EventPublisher.keys.def], r = [];
        for (var m in l) r.push(m);
        return r;
    };
    EventPublisher.prototype.publish = function (markup, attributes) {
        var e = $A.get('e'), i, j, a;
        if (e[EventPublisher.keys.def][markup]) {
            e[EventPublisher.keys.def][markup][EventPublisher.keys.acc] = 'G';
            if (attributes && attributes.length > 0 && e[EventPublisher.keys.def][markup][EventPublisher.keys.cof]) {
                for (var _i = 0, attributesize = attributes.length; _i < attributesize; _i++) {
                    i = attributes[_i];
                    if (e[EventPublisher.keys.def][markup][EventPublisher.keys.cof][i])
                        e[EventPublisher.keys.def][markup][EventPublisher.keys.cof][i][2] = 'G';
                    if (e[EventPublisher.keys.def][markup][EventPublisher.keys.att] && e[EventPublisher.keys.def][markup][EventPublisher.keys.att][EventPublisher.keys.val])
                        e[EventPublisher.keys.def][markup][EventPublisher.keys.att][EventPublisher.keys.val][i][EventPublisher.keys.acc] = 'G';
                }
            }
        }
    };
    EventPublisher.keys = {
        def: '$eventDefRegistry$',
        cof: '$attributeDefsConfigs$',
        att: '$attributeDefs$',
        acc: '$access$',
        val: '$values$'
    };
    return EventPublisher;
}());
window.Antilocker = {
    EventPublisher : new EventPublisher()
}