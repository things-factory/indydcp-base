import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { sleep } from '@things-factory/utils'

async function IndyDcpDiWait(step, { logger }) {
  var {
    connection,
    params: { address, value }
  } = step

  var { client } = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  while (true) {
    if (di == value) {
      break
    } else {
      var di = await client.getSmartDI(address)
      await sleep(10)
    }
  }

  return {
    data: di
  }
}

IndyDcpDiWait.parameterSpec = [
  {
    type: 'string',
    name: 'address',
    label: 'address'
  },
  {
    type: 'checkbox',
    name: 'value',
    label: 'expected_value'
  }
]

TaskRegistry.registerTaskHandler('indydcp-di-wait', IndyDcpDiWait)
