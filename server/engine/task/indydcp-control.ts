import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { waitForState } from './util'

async function IndyDcpControl(step, { logger }) {
  var {
    connection,
    params: { action }
  } = step

  var { client } = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  if (action == 'start') {
    await waitForState(client, status => !status.isBusy)
    await client.changeToDirectTeaching()

    // await waitForState(client, status => !status.isTeachingMode)
  } else {
    await client.finishDirectTeaching()
  }

  return {}
}

IndyDcpControl.parameterSpec = [
  {
    type: 'select',
    label: 'action',
    name: 'action',
    property: {
      options: ['', 'start', 'finish']
    }
  }
]

TaskRegistry.registerTaskHandler('indydcp-control', IndyDcpControl)
