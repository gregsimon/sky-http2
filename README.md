
This is a node.js server script that simulates traditional "packaging" by using http2 multi-stream as the packaging mechanism. It has the advantages of

- no unzip required on the client (expensive on mobile devices w/flash)
- easier updating of files on the server
- ability to do partial updates (?)

## Requirements

- node.js
- http2 for node.js (npm install http2)
- nghttp2 (client for http2) http://nghttp2.org/

## How it works

When a request comes in, the script checks to see if a pubspec.yaml is present in the folder. If so, it pushes down all the files in that folder. This happens with multiple streams on the single request socket! Individual file requests behave as they normally do.

## Use

1. Start the server using

`nodejs ./sky-app-server.js`

2. Fetch the 'stocks' app using

`nghttp -vn http://localhost:8080/stocks`


Note how you only reference the folder the Sky app is in, and the server sends everything you need (well, it doesn't send the framework yet, need to work on that!)

```
$ nghttp -nsv http://localhost:8080/stocks

 13    +33.06ms       +118us  32.94ms  200    5 /stocks
  2   +230.74ms *   +32.80ms 197.94ms  200  18K /home/greg/modular/www/stocks/data/stock_data_0.json
  4   +230.75ms *   +32.84ms 197.90ms  200  18K /home/greg/modular/www/stocks/data/stock_data_1.json
  6   +230.75ms *   +32.85ms 197.89ms  200  17K /home/greg/modular/www/stocks/data/stock_data_10.json
  8   +230.75ms *   +32.86ms 197.89ms  200  18K /home/greg/modular/www/stocks/data/stock_data_11.json
 10   +230.75ms *   +32.87ms 197.89ms  200  18K /home/greg/modular/www/stocks/data/stock_data_12.json
 12   +230.75ms *   +32.87ms 197.88ms  200  18K /home/greg/modular/www/stocks/data/stock_data_13.json
 14   +230.76ms *   +32.88ms 197.88ms  200  18K /home/greg/modular/www/stocks/data/stock_data_14.json
 16   +230.76ms *   +32.88ms 197.88ms  200  18K /home/greg/modular/www/stocks/data/stock_data_15.json
 18   +310.74ms *   +32.89ms 277.85ms  200  18K /home/greg/modular/www/stocks/data/stock_data_16.json
 20   +350.71ms *   +32.89ms 317.82ms  200  18K /home/greg/modular/www/stocks/data/stock_data_17.json
 22   +350.72ms *   +32.90ms 317.82ms  200  18K /home/greg/modular/www/stocks/data/stock_data_18.json
 24   +350.72ms *   +32.90ms 317.82ms  200  18K /home/greg/modular/www/stocks/data/stock_data_19.json
 26   +390.70ms *   +32.91ms 357.79ms  200  18K /home/greg/modular/www/stocks/data/stock_data_2.json
 28   +390.71ms *   +32.91ms 357.79ms  200  18K /home/greg/modular/www/stocks/data/stock_data_20.json
 30   +390.71ms *   +32.92ms 357.79ms  200  18K /home/greg/modular/www/stocks/data/stock_data_21.json
 32   +390.71ms *   +32.92ms 357.79ms  200  18K /home/greg/modular/www/stocks/data/stock_data_22.json
 34   +470.69ms *   +32.93ms 437.76ms  200  18K /home/greg/modular/www/stocks/data/stock_data_23.json
 36   +510.70ms *   +32.93ms 477.76ms  200  18K /home/greg/modular/www/stocks/data/stock_data_24.json
 38   +510.70ms *   +32.94ms 477.76ms  200  18K /home/greg/modular/www/stocks/data/stock_data_25.json
 46   +510.72ms *   +32.96ms 477.75ms  200  11K /home/greg/modular/www/stocks/data/stock_data_29.json
 40   +550.69ms *   +32.94ms 517.75ms  200  18K /home/greg/modular/www/stocks/data/stock_data_26.json
 42   +550.70ms *   +32.95ms 517.75ms  200  18K /home/greg/modular/www/stocks/data/stock_data_27.json
 44   +550.70ms *   +32.96ms 517.74ms  200  18K /home/greg/modular/www/stocks/data/stock_data_28.json
 48   +590.69ms *   +32.97ms 557.72ms  200  18K /home/greg/modular/www/stocks/data/stock_data_3.json
 64   +590.72ms *   +33.01ms 557.72ms  200   2K /home/greg/modular/www/stocks/lib/stock_arrow.dart
 50   +630.75ms *   +32.97ms 597.77ms  200  18K /home/greg/modular/www/stocks/data/stock_data_4.json
 62   +630.76ms *   +33.00ms 597.76ms  200   4K /home/greg/modular/www/stocks/lib/stock_app.dart
 66   +630.76ms *   +33.01ms 597.75ms  200   1K /home/greg/modular/www/stocks/lib/stock_data.dart
 68   +630.77ms *   +33.02ms 597.75ms  200  908 /home/greg/modular/www/stocks/lib/stock_list.dart
 70   +630.77ms *   +33.02ms 597.75ms  200  875 /home/greg/modular/www/stocks/lib/stock_menu.dart
 72   +630.77ms *   +33.03ms 597.74ms  200   1K /home/greg/modular/www/stocks/lib/stock_row.dart
 74   +630.77ms *   +33.03ms 597.74ms  200  357 /home/greg/modular/www/stocks/main.sky
 76   +630.77ms *   +33.04ms 597.73ms  200  255 /home/greg/modular/www/stocks/pubspec.yaml
 52   +630.77ms *   +32.98ms 597.80ms  200  18K /home/greg/modular/www/stocks/data/stock_data_5.json
 54   +670.69ms *   +32.98ms 637.70ms  200  18K /home/greg/modular/www/stocks/data/stock_data_6.json
 56   +670.70ms *   +32.99ms 637.72ms  200  18K /home/greg/modular/www/stocks/data/stock_data_7.json
 58   +670.72ms *   +32.99ms 637.73ms  200  18K /home/greg/modular/www/stocks/data/stock_data_8.json
 60   +670.72ms *   +32.99ms 637.72ms  200  18K /home/greg/modular/www/stocks/data/stock_data_9.json
```

