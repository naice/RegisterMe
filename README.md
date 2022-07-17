# RegisterMe
Register me is a very basic IoT-Device service.

# route `/register`
## `POST`
| Name        | Type           | Description  |
| ------------- |-------------| -----|
| name | string | The name of the IoT-Device (identifier) |
| endpoints | Record<string, string> | Endpoint identifier to Endpoint map |
| ip | string? | When null the server tries to pick the ip address of the device |
### Sample endpoints
```JSON
{
	"name": "TeslaWallboxGen3",
	"ip": "192.168.178.68",
	"endpoints": {
		"GET_VITALS": "/api/1/vitals",
		"GET_WIFI_STATUS": "/api/1/wifi_status",
		"GET_VERSION": "/api/1/version",
		"GET_LIFETIME": "/api/1/lifetime"
	}
}
```
## `GET`
Returns and array of all registered IoT devices. Updated and Created are set by the server,
updated can help in detecting the availability of your devices.
```JSON
[{
    "name": "TeslaWallboxGen3",
    "ip": "192.168.178.68",
    "endpoints": {
        "GET_VITALS": "/api/1/vitals",
        "GET_WIFI_STATUS": "/api/1/wifi_status",
        "GET_VERSION": "/api/1/version",
        "GET_LIFETIME": "/api/1/lifetime"
    },
    "updated": 1657916582169,
    "created": 1657916582169
}]
```
## Arduino Sample 
Find the arduino sample under `arduino_sample/`


# route `/deploy`
takes a tar.gz and unpacks it in `~/deployed/{name}`

I'm using this in combination with pm2 and http-server (npm) to serve my angular apps.
## package.json deploy script sample
```JSON
{
  "scripts": {
    "ng": "ng",
    "deploy": "ng build && tar -zcf deploy-package.tar.gz -C dist/ . && curl -v -F 'file=@deploy-package.tar.gz' -H 'JM-PROJECT-NAME: homeApp' http://registermeip:4711/deploy",
  },
}
```
### What it does
`ng build`

is compiling the Angular app to the `dist/` folder.

`tar -zcf deploy-package.tar.gz -C dist/ .` 

creates a tar.gz file named `deploy-package.tar.gz` with the contents of `dist/`.

`curl -v -F 'file=@deploy-package.tar.gz' -H 'JM-PROJECT-NAME: myAppName' http://registermeip:4711/deploy` 

posts the file via http to the `deploy/` route. 
The `JM-PROJECT-NAME` header defines the name used in `~/deployed/{name}` as unpack directory.

### pm2 and http-server

After publishing the app

1. Install pm2 (https://www.npmjs.com/package/pm2) and http-server (https://www.npmjs.com/package/http-server)
2. navigate to the `~/deployed/{name}` directory
3. run `pm2 start "http-server --port 4000" --name "{name}"` to start the server.

pm2 takes care of restarting your deployment after a downtime.
