import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { waitForState } from './util'

async function IndyDcpSetSpeed(step, { logger }) {
  var {
    connection,
    params: { type, level }
  } = step

  var { client } = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await waitForState(client, status => !status.isBusy)

  if (type == 'JOINT') {
    await client.setJointSpeedLevel(level)
  } else {
    await client.setTaskSpeedLevel(level)
  }

  return {
    data: level
  }
}

IndyDcpSetSpeed.parameterSpec = [
  {
    type: 'select',
    label: 'type',
    name: 'type',
    property: {
      options: [
        { display: '', value: '' },
        { display: 'Joint', value: 'JOINT' },
        { display: 'Task', value: 'TASK' }
      ]
    }
  },
  {
    type: 'number',
    label: 'level',
    name: 'level'
  }
]

TaskRegistry.registerTaskHandler('indydcp-set-speed', IndyDcpSetSpeed)
