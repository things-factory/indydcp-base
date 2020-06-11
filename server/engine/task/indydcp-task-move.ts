import { Connections, TaskRegistry } from '@things-factory/integration-base'

async function IndyDcpTaskMove(step, { logger }) {
  var { 
    connection,
    params: { type, x, y, z, u, v, w }
  } = step

  var client = Connections.getConnection(connection)
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await client.waitForState(client, status => !status.isBusy)

  var taskPositions = await client.getTaskPos()
  
  taskPositions[0] = x
  taskPositions[1] = y
  taskPositions[2] = z

  if (type == 'TO') {
    taskPositions[3] += u
    taskPositions[4] += v
    taskPositions[5] += w

    await client.taskMoveBy(taskPositions)
  } else {
    taskPositions[3] = u
    taskPositions[4] = v
    taskPositions[5] = w

    await client.taskMoveTo(taskPositions)
  }

  return {}
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
        { display: 'MoveBy', value: 'BY' },
      ]
    }
  },
  {
    type: 'select',
    label: 'x',
    name: 'x'
  },
  {
    type: 'select',
    label: 'y',
    name: 'y'
  },
  {
    type: 'select',
    label: 'z',
    name: 'z'
  },
  {
    type: 'select',
    label: 'u',
    name: 'u'
  },
  {
    type: 'select',
    label: 'v',
    name: 'v'
  },
  {
    type: 'select',
    label: 'w',
    name: 'w'
  }
]

TaskRegistry.registerTaskHandler('indydcp-task-move', IndyDcpTaskMove)
