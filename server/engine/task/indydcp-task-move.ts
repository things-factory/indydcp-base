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
  if (!taskPositions || typeof taskPositions !== 'object') {
    throw new Error(`correct type task-position is not given : ${taskPositions}`)
  }

  taskPositions = [
    taskPositions[0] || taskPositions['x'],
    taskPositions[1] || taskPositions['y'],
    taskPositions[2] || taskPositions['z'],
    taskPositions[3] || taskPositions['u'],
    taskPositions[4] || taskPositions['v'],
    taskPositions[5] || taskPositions['w']
  ]

  if(isNaN(taskPositions.reduce((v, sum) => sum + v, 0)) {
    throw new Error(`correct value task-position is not given : ${taskPositions}`)
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
