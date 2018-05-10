function showMarkets() {
  var obj;
  $(document).ready(function() {
    $.ajax({
        url: 'http://bittrex.com/api/v1.1/public/getmarkets',
        method: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        $("#Table").empty();
        obj = data;
        length = obj.result.length;
        $("#Table").append('<div class="panel-body" id="panel-body">');
        $("#panel-body").append('<div class="panel panel-default" id="panelColor">');
        $("#panelColor").append('<div class="panel-heading" id="panel-heading">');
        $("#panel-heading").append('<h4 class="panel-title" id="panel-title">');
        $("#panel-title").append('<a data-toggle="collapse" href="#collapse1">Markets</a>');
        $("#panel-heading").append('</h4>');
        $("#panelColor").append('</div>');
        $("#panelColor").append('<div id="collapse1" class="panel-collapse collapse">');
        $("#collapse1").append('<ul class="list-group" id="list-group">');

        for (var i = 0; i < length; i++) {
          $("#list-group").append('<li class="list-group-item" id="list' + i + '">');
          $("#list" + i).append('<table class="table">' +
            '<thead>' +
            '<tr>' +
            '<th> Name </th>' +
            '<th> Logo </th>' +
            '<th> Currency </th>' +
            '<th> Tick </th>' +
            '<th> Summary </th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td>' + obj.result[i].MarketCurrencyLong + ' (' + obj.result[i].MarketCurrency + ')</td>' +
            '<td><img src="' + obj.result[i].LogoUrl + '" style="width:50px;height:50px;"></td>' +
            '<td>' + obj.result[i].BaseCurrencyLong + '</td>' +
            '<td><button class="btn btn-primary btn-block"  data-toggle="collapse" data-target="#collapse1" onclick="showTiker(\'' + obj.result[i].BaseCurrency + '\', \'' + obj.result[i].MarketCurrency + '\', \'' + obj.result[i].LogoUrl + '\', \'' + obj.result[i].MarketCurrencyLong + '\')">Show</button></td>' +
            '<td><button class="btn btn-primary btn-block"  data-toggle="collapse" data-target="#collapse1" onclick="showSummary(\'' + obj.result[i].BaseCurrency + '\', \'' + obj.result[i].MarketCurrency + '\')">Show</button></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>');
          $("#list-group").append('</li>');

        }
        $("#collapse1").append('</ul>');
        $("#panelColor").append('</div>');
        $("#panel-body").append('</div>');
        $("#Table").append('</div>');
      })
      .fail(function() {
        alert("fail");
      })
  });
}

function showTiker() {
  var a = arguments[0];
  var b = arguments[1];
  var c = arguments[2];
  var d = arguments[3];
  $(document).ready(function() {
    $.ajax({
        url: 'https://bittrex.com/api/v1.1/public/getticker?market=' + a + '-' + b,
        method: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        $("#response").empty();
        $("#response").append("<h3>" + d + "</h3>");
        $("#response").append('<img src="' + c + '" style="width:50px;height:50px;">');
        $("#response").append("<p><b>Bid: </b>" + data.result.Bid + "</p>");
        $("#response").append("<p><b>Ask: </b>" + data.result.Ask + "</p>");
        $("#response").append("<p><b>Last: </b>" + data.result.Last + "</p>");
      })
      .fail(function() {
        alert("fail");
      })
  });
}

function showCurrencies() {
  $(document).ready(function() {
    $.ajax({
        url: 'https://bittrex.com/api/v1.1/public/getcurrencies',
        method: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        $("#Table").empty();
        $("#Table").append('<div class="panel-body" id="panel-body">');
        $("#panel-body").append('<div class="panel panel-default" id="panelColor">');
        $("#panelColor").append('<div class="panel-heading" id="panel-heading">');
        $("#panel-heading").append('<h4 class="panel-title" id="panel-title">');
        $("#panel-title").append('<a data-toggle="collapse" href="#collapse1">Currencies</a>');
        $("#panel-heading").append('</h4>');
        $("#panelColor").append('</div>');
        $("#panelColor").append('<div id="collapse1" class="panel-collapse collapse">');
        $("#collapse1").append('<ul class="list-group" id="list-group">');

        for (var i = 0; i < data.result.length; i++) {
          $("#list-group").append('<li class="list-group-item" id="list' + i + '">');
          $("#list" + i).append('<table class="table">' +
            '<thead>' +
            '<tr>' +
            '<th> Name </th>' +
            '<th> Active? </th>' +
            '<th> Type </th>' +
            '<th> TxFee </th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td>' + data.result[i].CurrencyLong + ' (' + data.result[i].Currency + ')</td>' +
            '<td>' + data.result[i].IsActive + '</td>' +
            '<td>' + data.result[i].CoinType + '</td>' +
            '<td>' + data.result[i].TxFee + '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>');
          $("#list-group").append('</li>');

        }
        $("#collapse1").append('</ul>');
        $("#panelColor").append('</div>');
        $("#panel-body").append('</div>');
        $("#Table").append('</div>');
      })
      .fail(function() {
        alert("fail");
      })
  });
}

function showSummary() {
  var a = arguments[0];
  var b = arguments[1];
  $(document).ready(function() {
    $.ajax({
        url: 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=' + a + '-' + b,
        method: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        $("#response").empty();
        $("#response").append("<h3>Market " + data.result[0].MarketName + "</h3>");
        $("#response").append("<p><b>High: </b>" + data.result[0].High + "</p>");
        $("#response").append("<p><b>Low: </b>" + data.result[0].Low + "</p>");
        $("#response").append("<p><b>Volume: </b>" + data.result[0].Volume + "</p>");
        $("#response").append("<p><b>Last: </b>" + data.result[0].Last + "</p>");
        $("#response").append("<p><b>BaseVolume: </b>" + data.result[0].BaseVolume + "</p>");
        $("#response").append("<p><b>Bid: </b>" + data.result[0].Bid + "</p>");
        $("#response").append("<p><b>Ask: </b>" + data.result[0].Ask + "</p>");
        $("#response").append("<p><b>OpenBuyOrders: </b>" + data.result[0].OpenBuyOrders + "</p>");
        $("#response").append("<p><b>OpenSellOrders: </b>" + data.result[0].OpenSellOrders + "</p>");
      })
      .fail(function() {
        alert("fail");
      })
  });
}
