import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { waitForState } from './util'

async function IndyDcpMove(step, { logger }) {
  var {
    connection,
    params: { position }
  } = step

  var { client } = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await client.executeMove(position)

  await waitForState(client, status => !status.isBusy)

  return {
    data: position
  }
}

IndyDcpMove.parameterSpec = [
  {
    type: 'string',
    name: 'position',
    label: 'position'
  }
]

TaskRegistry.registerTaskHandler('indydcp-move', IndyDcpMove)
