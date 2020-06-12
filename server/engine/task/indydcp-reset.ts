import { Connections, TaskRegistry } from '@things-factory/integration-base'

async function IndyDcpReset(step, { logger }) {
  var { connection } = step

  var client = Connections.getConnection(connection)
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  await client.resetRobot()
  var robotStatus = await client.getRobotStatus()
  // is_emergencyStop:false
  // is_errorState:false
  // isBusy:false
  // isCollided:false
  // isContyConnected:true
  // isDirectTeachingMode:false
  // isHome:false
  // isInResetting:false
  // isMoveFinished:false
  // isProgramPaused:false
  // isProgramRunning:false
  // isRobotReady:true
  // isRobotRunning:true
  // isTeachingMode:false

  return {
    data: robotStatus
  }
}

IndyDcpReset.parameterSpec = []

TaskRegistry.registerTaskHandler('indydcp-reset', IndyDcpReset)
