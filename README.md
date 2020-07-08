# nodejs-poolControler-exporter

![Docker](https://github.com/wurmr/nodejs-poolControler-exporter/workflows/Docker/badge.svg?event=push)

Prometheus exporter for [tagyoureit/nodejs-poolController](https://github.com/tagyoureit/nodejs-poolController)

## Metrics

Currently this exporter only exports the following metrics:

```
# HELP pool_water_temp Pool Water Temperature
# TYPE pool_water_temp gauge
pool_water_temp 86
# HELP pool_air_temp Air Temperature
# TYPE pool_air_temp gauge
pool_air_temp 80
# HELP pool_pump_rpm Pump RPM
# TYPE pool_pump_rpm gauge
pool_pump_rpm 3000
# HELP pool_pump_watts Pump Watts
# TYPE pool_pump_watts gauge
pool_pump_watts 1908
# HELP pool_chlorinator_output Pump Watts
# TYPE pool_chlorinator_output gauge
pool_chlorinator_output 55
```

## Usage

To run the basic exporter:

```
$ npm start
```

By default nodejs-poolControler-exporter attaches to the controller running on localhost. If you need to change the target set the `CONTROLLER` environment variable.

```
$ CONTROLLER=http://<yourControllerIp>:<port> npm start
```
