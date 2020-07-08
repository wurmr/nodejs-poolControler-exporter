import express from 'express'
import got from 'got'
const app = express()

interface State {
  temps: {
    waterSensor1: Number
    air: Number
  }
  pumps: Array<Pump>
  chlorinators: Array<Chlorinator>
}

interface Chlorinator {
  id: Number
  saltLevel: Number
  currentOutput: Number
  targetOutput: Number
  superChlor: Boolean
}

interface Pump {
  id: Number
  rpm: Number
  watts: Number
}

const controller = process.env.CONTROLLER || 'http://localhost:4200'

app.get('/metrics', async function (req, res) {
  const state: State = await got.get(`${controller}/state/all`).json()

  const metrics = [
    createMetric(
      'pool_water_temp',
      state.temps.waterSensor1,
      'Pool Water Temperature',
      'gauge'
    ),
    createMetric('pool_air_temp', state.temps.air, 'Air Temperature', 'gauge'),
    createMetric('pool_pump_rpm', state.pumps[0].rpm, 'Pump RPM', 'gauge'),
    createMetric(
      'pool_pump_watts',
      state.pumps[0].watts,
      'Pump Watts',
      'gauge'
    ),
    createMetric(
      'pool_chlorinator_output',
      state.chlorinators[0].currentOutput,
      'Pump Watts',
      'gauge'
    ),
  ]

  res.send(metrics.join('\n'))
})

const createMetric = (
  name: string,
  value: Number,
  help?: string,
  type?: string
): string => {
  const metric = []
  if (help) metric.push(`# HELP ${name} ${help}`)
  if (type) metric.push(`# TYPE ${name} ${type}`)
  metric.push(`${name} ${value}`)
  return metric.join('\n')
}

app.listen(9100)
