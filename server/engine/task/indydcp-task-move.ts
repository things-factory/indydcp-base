import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { waitForState } from './util'

async function IndyDcpTaskMove(step, { logger }) {
  var { 
    connection,
    params: { type, x=0, y=0, z=0, u=0, v=0, w=0 }
  } = step

  var client = Connections.getConnection(connection)
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await waitForState(client, status => !status.isBusy)

  var taskPositions = await client.getTaskPos()
  
  taskPositions[0] = new Number(x)
  taskPositions[1] = new Number(y)
  taskPositions[2] = new Number(z)

  if (type == 'BY') {
    taskPositions[3] = new Number(u)
    taskPositions[4] = new Number(v)
    taskPositions[5] = new Number(w)
    
    await client.taskMoveBy(taskPositions)
  } else {
    taskPositions[3] += new Number(u)
    taskPositions[4] += new Number(v)
    taskPositions[5] += new Number(w)

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
    type: 'string',
    label: 'x',
    name: 'x'
  },
  {
    type: 'string',
    label: 'y',
    name: 'y'
  },
  {
    type: 'string',
    label: 'z',
    name: 'z'
  },
  {
    type: 'string',
    label: 'u',
    name: 'u'
  },
  {
    type: 'string',
    label: 'v',
    name: 'v'
  },
  {
    type: 'string',
    label: 'w',
    name: 'w'
  }
]

TaskRegistry.registerTaskHandler('indydcp-task-move', IndyDcpTaskMove)
