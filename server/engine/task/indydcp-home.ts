import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { waitForState } from './util'

async function IndyDcpHome(step, { logger }) {
  var { connection } = step

  var { client } = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await client.goHome()

  await waitForState(client, status => !status.isBusy)

  return {}
}

IndyDcpHome.parameterSpec = []

TaskRegistry.registerTaskHandler('indydcp-home', IndyDcpHome)
