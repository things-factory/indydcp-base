import { Connections, TaskRegistry } from '@things-factory/integration-base'

async function IndyDcpStatus(step, { logger }) {
  var { connection } = step

  var { client } = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  var robotStatus = await client.getRobotStatus()

  return {
    data: robotStatus
  }
}

IndyDcpStatus.parameterSpec = []

TaskRegistry.registerTaskHandler('indydcp-status', IndyDcpStatus)
