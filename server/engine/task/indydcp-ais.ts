import { Connections, TaskRegistry } from '@things-factory/integration-base'

async function IndyDcpAIs(step, { logger }) {
  var { connection } = step

  var { client } = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  var ais = await client.getSmartAIs()

  return {
    data: ais
  }
}

IndyDcpAIs.parameterSpec = []

TaskRegistry.registerTaskHandler('indydcp-ais', IndyDcpAIs)
