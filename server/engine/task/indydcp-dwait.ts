import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { sleep } from '@things-factory/utils'

async function IndyDcpDwait(step, { logger }) {
  var { 
    connection,
    params: { plcAddress: address, value }
  } = step

  var client = Connections.getConnection(connection)
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  var dis = await client.getSmartDIs()

  while (true) {
    if (dis[address] == value) {
      break
    } else {
      await sleep(1)
    }
  }

  return {
    data: dis
  }
}

IndyDcpDwait.parameterSpec = [{
  type: 'string',
  name: 'address',
  label: 'address'
},
{
  type: 'string',
  name: 'value',
  label: 'expected_value'
}]

TaskRegistry.registerTaskHandler('indydcp-dwait', IndyDcpDwait)
