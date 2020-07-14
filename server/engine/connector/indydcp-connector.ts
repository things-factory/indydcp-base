import { Connections, Connector } from '@things-factory/integration-base'
import { IndyDCPClient } from '@things-factory/node-indydcp'

const ROBOT_NAME = 'NRMK-Indy7'

export class IndyDCPConnector implements Connector {
  async ready(connectionConfigs) {
    await Promise.all(connectionConfigs.map(this.connect.bind(this)))

    Connections.logger.info('indydcp-connector connections are ready')
  }

  async connect(connection) {
    const {
      endpoint,
      params: { robotName = ROBOT_NAME }
    } = connection
    const [host, port = 6066] = endpoint.split(':')

    var client = new IndyDCPClient(host, robotName)
    try {
      await client.connect()
      Connections.addConnection(connection.name, {
        ...connection,
        discriminator: 'robot-arm',
        client,
        async getTaskPos() {
          return await client.getTaskPos()
        }
      })

      Connections.logger.info(`indydcp-connector connection(${connection.name}:${connection.endpoint}) is connected`)
    } catch (e) {
      Connections.logger.error(
        `indydcp-connector connection(${connection.name}:${connection.endpoint}) is not connected`
      )
      Connections.logger.error(e)
    }
  }

  async disconnect(name) {
    var { client } = Connections.removeConnection(name) || {}
    client?.disconnect()

    Connections.logger.info(`indydcp-connector connection(${name}) is disconnected`)
  }

  get parameterSpec() {
    return [
      {
        type: 'select',
        label: 'robot-name',
        name: 'robotName',
        property: {
          options: ['', 'NRMK-Indy7']
        }
      },
      {
        type: 'offset-pose',
        label: 'marker-offset',
        name: 'markerOffset'
      },
      {
        type: 'offset-pose',
        label: 'poi-offset',
        name: 'waypointOffset'
      },
      {
        type: 'offset-pose',
        label: 'tool-offset',
        name: 'toolOffset'
      }
    ]
  }

  get taskPrefixes() {
    return ['indydcp']
  }
}

Connections.registerConnector('indydcp-connector', new IndyDCPConnector())
