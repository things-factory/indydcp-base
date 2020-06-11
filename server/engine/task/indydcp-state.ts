import { Connections, TaskRegistry } from '@things-factory/integration-base'

async function IndyDcpState(step, { logger }) {
  var { connection } = step

  var client = Connections.getConnection(connection)
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  var robotStatus = await client.getRobotStatus()

  return {
    data: robotStatus
  }
}

IndyDcpState.parameterSpec = []

TaskRegistry.registerTaskHandler('indydcp-state', IndyDcpState)
