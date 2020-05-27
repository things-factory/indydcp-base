import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { waitForState } from './util'

async function IndyDcpRun(step, { logger }) {
  var { connection } = step

  var client = Connections.getConnection(connection)
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await client.startCurrentProgram()

  await waitForState(client, status => !status.isProgramRunning)

  return {}
}

IndyDcpRun.parameterSpec = []

TaskRegistry.registerTaskHandler('indydcp-run', IndyDcpRun)
