var root = location.protocol + '//' + location.host;
var urlParams;
var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

urlParams = {};
while (match = search.exec(query))
urlParams[decode(match[1])] = decode(match[2]);
var uid = urlParams["xuid"];
var host = urlParams["xhost"];

var map = L.map('map'),
    realtime = L.realtime({
        url: root + '/directory?DIR_FUNC=tracker&xuid=' + uid + '&xhost=' + host + '&xdummy=' + "y" ,
        crossOrigin: true,
        type: 'json'
    }, {
        interval: 3 * 1000
    }).addTo(map);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

realtime.on('update', function(e) {
    var coordPart = function(v, dirs) {
            return dirs.charAt(v >= 0 ? 0 : 1) +
                (Math.round(Math.abs(v) * 100) / 100).toString();
        },
        popupContent = function(fId) {
            var feature = e.features[fId],
                c = feature.geometry.coordinates;
            return 'Wander drone at ' +
                coordPart(c[1], 'NS') + ', ' + coordPart(c[0], 'EW');
        },
        bindFeaturePopup = function(fId) {
            realtime.getLayer(fId).bindPopup(popupContent(fId));
        },
        updateFeaturePopup = function(fId) {
            realtime.getLayer(fId).getPopup().setContent(popupContent(fId));
        };

    map.fitBounds(realtime.getBounds(), {maxZoom: 18});

    Object.keys(e.enter).forEach(bindFeaturePopup);
    Object.keys(e.update).forEach(updateFeaturePopup);
});