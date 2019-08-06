const request = require('request');

var times = 400; // 400 requests for each proxy
var timout_between_proxies = 1000 * 10; // 10s

var send = function(proxy) {
    // console.log(proxy);

    var proxyUrl = "http://" + proxy;
    var proxiedRequest = request.defaults({'proxy': proxyUrl});

    for (i = 0; i < times; i++) {
        proxiedRequest.post('http://goiqua66.com/ajax/card.php', {
            form: {
                card_type_id: 'Viettel',
                menhgia: '1.000.000',
                seri: Math.floor(10000000000 + Math.random() * 90000000000),
                pin: Math.floor(1000000000000 + Math.random() * 9000000000000),
                // ten: 'Bo thoi di an cap di, co tai co suc thi lao dong ma song. May thang hen!!'
                ten: Math.floor(10000000000 + Math.random() * 90000000000)
            }
        }, (error, res, body) => {
            if (error) {
                console.error(error);
                return;
            }
            
            // console.log(`statusCode: ${res.statusCode}`)
            var d = new Date();
            console.log(d.toLocaleTimeString() + " - proxy: " + proxy);
            console.log(body)
        });
    }
}

request.get('https://www.proxy-list.download/api/v1/get?type=http&country=US', {}, 
    (error, res, body) => {
        if (error) {
            console.error(error)
            return;
        }
        // console.log(body);
        
        proxy_list = body.split(/\n/);
        for (var i = 0; i < proxy_list.length; i++) {
            setTimeout(send, timout_between_proxies * i, proxy_list[i]);
        }
    }
);
