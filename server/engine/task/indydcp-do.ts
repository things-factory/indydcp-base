import { Connections, TaskRegistry } from '@things-factory/integration-base'

/* TODO Not implemented yet */
async function IndyDcpDO(step, { logger }) {
  var {
    connection,
    params: { index, value }
  } = step

  var client = Connections.getConnection(connection)
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await client.setSmartDO(index, value)

  return {
    data: {
      index,
      value
    }
  }
}

IndyDcpDO.parameterSpec = [
  {
    type: 'number',
    name: 'index',
    label: 'index'
  },
  {
    type: 'checkbox',
    name: 'value',
    label: 'value'
  }
]

TaskRegistry.registerTaskHandler('indydcp-do', IndyDcpDO)
