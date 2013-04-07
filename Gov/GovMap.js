function naqsha() { }

naqsha.MapDivId = 'theMap';
naqsha.TileURL = 'http://tiles.naqsha.net/Tiles/{z}/{x}/{y}.png';
naqsha.Attribution = 'Map data &copy; 2012 Data Solutions Private Limited';
naqsha._map = null;
naqsha._markers = [];
naqsha._results = [];
naqsha._waypoints = [];
naqsha._selected = null;
naqsha.MarkerLayer = null;
naqsha.MarkerBounds = null;

naqsha.LoadMap = function (latitude, longitude) {
    naqsha._map = new L.Map(naqsha.MapDivId);

    var naqshaTileLayer = new L.TileLayer(naqsha.TileURL, { maxZoom: 17, attribution: naqsha.Attribution });
    naqsha._map.addLayer(naqshaTileLayer);

    if (latitude != null && longitude != null) {
        var center = new L.LatLng(latitude, longitude);
    }

    //naqsha._map.setView(new L.LatLng(33.7, 73.0), 13);    //Islamabad
    naqsha._map.setView(new L.LatLng(24.9, 67.06), 11);    //Karachi

    naqsha.MarkerLayer = new L.LayerGroup();
    naqsha._map.addLayer(naqsha.MarkerLayer);

    naqsha.RouteLayer = new L.LayerGroup();
    naqsha._map.addLayer(naqsha.RouteLayer);
}

naqsha.ClearMarkers = function () {
    naqsha.MarkerLayer.clearLayers();
    naqsha._markers.length = 0;
}

naqsha.LoadPin = function (i, e) {
    var LL = new L.LatLng(e.Latitude, e.Longitude);
    var marker = new L.Marker(LL);
    naqsha.MarkerLayer.addLayer(marker);
    marker.bindPopup(generatePopupHTML(i, e));
    naqsha._markers.push(marker);
    naqsha._results.push(e);
    naqsha.MarkerBounds.extend(LL);

    function generatePopupHTML(i, e) {
        var HTML = "<div id='divPopup'><b>" + e.Name + "</b></br>" + e.Address + "</br></div>";
        return HTML;
    }
}
naqsha.SearchGovOffice = function (searchCategory) {
   $.ajax({
       type: "POST",
       url: "../WebService.asmx/GetGovOfficeByCategory",
       data: "{ 'Category': '" + searchCategory + "' }",
       contentType: "application/json; charset=utf-8",
       dataType: "json",
       success: function (data) {
           naqsha._renderGovOfficeResults(data["d"]);
       }
   });
}

naqsha._renderGovOfficeResults = function (response) {
    $("#resultList").empty();
    if (response.length > 0) {
        naqsha._results = [];
        naqsha.ClearMarkers();
        naqsha.MarkerBounds = new L.LatLngBounds();

        naqsha._map.removeLayer(naqsha.RouteLayer);
        naqsha._map.addLayer(naqsha.MarkerLayer);

        var internalString = '<div style="font-size: small;">';
        $.each(response, function (i, result) {
            naqsha.LoadPin(i, result);
            internalString += '<li><b>' + result.Name + '</b><br/>' + result.Address + '</li>';
        });
        $("#resultList").html(internalString + '</div>');        
    }
    else {
        var message = '<p><b>No match found</b></p>';
        $('#resultList').html(message);
    }
}

