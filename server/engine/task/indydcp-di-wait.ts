import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { sleep } from '@things-factory/utils'

async function IndyDcpDiWait(step, { root }) {
  var {
    connection,
    params: { address, value }
  } = step

  var { client } = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  while (true) {
    let state = root.getState()
    if (state == 1 /* STARTED */) {
      if (di == value) {
        break
      } else {
        var di = await client.getSmartDI(address)
        await sleep(10)
      }
    } else if (state == 2 /* PAUSED */) {
      await sleep(1000)
    } else {
      throw new Error('scenario stopped unexpectedly')
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
