import { Connections, TaskRegistry } from '@things-factory/integration-base'

async function IndyDcpControl(step, { logger }) {
  var { 
    connection,
    params: { action }
  } = step

  var client = Connections.getConnection(connection)
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  client.waitForState(client, status => !status.isBusy)

  if (action == 'start') {
    await client.changeToDirectTeaching()
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
