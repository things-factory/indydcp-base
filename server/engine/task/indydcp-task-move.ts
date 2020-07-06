import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { access } from '@things-factory/utils'
import { waitForState } from './util'

async function IndyDcpTaskMove(step, { logger, data }) {
  var {
    connection,
    params: { type, accessor }
  } = step

  var { client } = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await waitForState(client, status => !status.isBusy)

  var taskPositions = access(accessor, data)
  if (!taskPositions) {
    throw new Error('task-position is not given')
  }

  if (type == 'BY') {
    await client.taskMoveBy(taskPositions)
  } else {
    await client.taskMoveTo(taskPositions)
  }

  await waitForState(client, status => !status.isBusy)

  return {
    data: await client.getTaskPos()
  }
}

IndyDcpTaskMove.parameterSpec = [
  {
    type: 'select',
    label: 'type',
    name: 'type',
    property: {
      options: [
        { display: ' ', value: '' },
        { display: 'MoveTo', value: 'TO' },
        { display: 'MoveBy', value: 'BY' }
      ]
    }
  },
  {
    type: 'string',
    label: 'accessor',
    name: 'accessor'
  }
]

TaskRegistry.registerTaskHandler('indydcp-task-move', IndyDcpTaskMove)
