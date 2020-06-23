import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { waitForState } from './util'

async function IndyDcpZero(step, { logger }) {
  var { connection } = step

  var { client } = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await client.goZero()

  await waitForState(client, status => !status.isBusy)

  return {}
}

IndyDcpZero.parameterSpec = []

TaskRegistry.registerTaskHandler('indydcp-zero', IndyDcpZero)
