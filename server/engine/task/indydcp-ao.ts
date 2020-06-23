import { Connections, TaskRegistry } from '@things-factory/integration-base'

/* TODO Not implemented yet */
async function IndyDcpAO(step, { logger }) {
  var {
    connection,
    params: { index, value }
  } = step

  var { client } = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await client.setSmartAO(index, value)

  return {
    data: {
      index,
      value
    }
  }
}

IndyDcpAO.parameterSpec = [
  {
    type: 'number',
    name: 'index',
    label: 'index'
  },
  {
    type: 'number',
    name: 'value',
    label: 'value'
  }
]

TaskRegistry.registerTaskHandler('indydcp-ao', IndyDcpAO)
