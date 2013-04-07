<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="CivicHackWebAPI.Gov.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Government Services</title>
<%--    <link href="../Scripts/leaflet.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/leaflet.ie.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/leaflet.js" type="text/javascript"></script>
--%>
    <script src="../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.css" />
    <script src="http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.js"></script>

    <script src="../Scripts/GovMap.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            onMapLoaded();
        });

        function onMapLoaded() {
            naqsha.LoadMap();
        }

        function searchGovOffice() {
            var searchSubCat = document.getElementById('selCategory').value;
            
            naqsha.SearchGovOffice(searchSubCat);
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="header">
    <h1>Government Offices & Services Locator</h1>
        Select Category
        <select id="selCategory" onchange="searchGovOffice()">
            <option selected="selected">Select</option>
            <option value="Fedral Government Office">Federal Government Office</option>
            <%--<option value="Provincial Government Office">Provincial Government Office</option>--%>
            <option value="Local Government Office">Local Government Office</option>
            <option value="City Water">Water & Sewerage</option>
            <option value="Police Station">Police Station</option>
            <option value="Fire Station">Fire Station</option>
            <option value="Law Court">Courts</option>
            <option value="Nazim">Nazim Office</option>
            <option value="UC">Union Council Office</option>
            <option value="Post">Post Office</option>
        </select>
    </div>
    <div id="resultList" style="float: left; font-family: Arial; font-size:small; width: 200px;">
        
    </div>
    <div id="theMap" style="width: 800px; height: 600px; margin-left: 202px;">
    </div>
    </form>
</body>
</html>