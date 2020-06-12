import { Connections, TaskRegistry } from '@things-factory/integration-base'

async function IndyDcpReset(step, { logger }) {
  var { connection } = step

  var client = Connections.getConnection(connection)
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await client.resetRobot()
  var robotStatus = await client.getRobotStatus()

  return {
    data: robotStatus
  }
}

IndyDcpReset.parameterSpec = []

TaskRegistry.registerTaskHandler('indydcp-reset', IndyDcpReset)
