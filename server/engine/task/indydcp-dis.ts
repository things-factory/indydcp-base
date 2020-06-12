import { Connections, TaskRegistry } from '@things-factory/integration-base'

/* TODO Not implemented yet */
async function IndyDcpDIs(step, { logger }) {
  var { connection } = step

  var client = Connections.getConnection(connection)
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  var dis = await client.getSmartDIs()
  // dis: Array(32) [false, false, false, false, false, false, false, false, …]
  
  return {
    data: dis
  }
}

IndyDcpDIs.parameterSpec = []

TaskRegistry.registerTaskHandler('indydcp-dis', IndyDcpDIs)
