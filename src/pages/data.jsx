const rti = require('rticonnextdds-connector')
const path = require('path')
// const configFile = path.resolve(__dirname, './xml/rticonf.xml')

class Data {
  constructor() {
    // this.connector = Connector('ROS2_PARTICIPANT_LIB::dashboard_subscriber', configFile)
    // this.input = connector.getInput('dashboard_data_subscriber::dashboard_reader')

    this.field_oriented = false
    this.navx = 0
    this.joystick = "xbox"
    this.autoTurn = "off"
    this.slowMode = false
    this.profile = "workshop"
    this.auton = "None"
    this.controlsConnected = false
    this.led = "off"
    this.timeLeft = 130

    this.swerveFrontLeftSpeed = 0;
    this.swerveFrontRightSpeed = 0;
    this.swerveBackLeftSpeed = 0;
    this.swerveBackRightSpeed = 0;
    this.swerveFrontLeftDirection = 0;
    this.swerveFrontRightDirection = 0;
    this.swerveBackLeftDirection = 0;
    this.swerveBackRightDirection = 0;
    this.swerveFrontLeftTemperature = 0;
    this.swerveFrontRightTemperature = 0;
    this.swerveBackLeftTemperature = 0;
    this.swerveBackRightTemperature = 0;
    this.airTank = 0;
    this.intakePiston = false;
    this.elevatorSliderPiston = false;
    this.elevatorPivotPiston = false;
    this.elevatorPosition = 0;
    this.battery = 0;
    this.b0 = false;
    this.b1 = false;
    this.b2 = false;
    this.b3 = false;
    this.b4 = false;
    this.b5 = false;
    this.b6 = false;
    this.b7 = false;
    this.b8 = false;
    this.b9 = false;
    this.b10 = false;
    this.b11 = false;
    this.b12 = false;
    this.b13 = false;
    this.a0 = 0;
    this.a1 = 0;
    this.a2 = 0;
    this.a3 = 0;
    this.a4 = 0;
    this.a5 = 0;

    console.log(__dirname)
  }

  update() {
    try {
      this.input.take()
    }
    catch (error) {
      console.warn("RTI Read Error")
    }

    for (const sample of this.input.samples.validDataIter) {
      const data = sample.getJson()
      var str = data.data
      var strArr = str.split("|")
      
      this.field_oriented = this.castStrToBool(strArr[0])

      console.log("OUTPUT: ", strArr[0])
      // this.navx = parseFloat(strArr[1])
      // this.joystick = strArr[2]
      // this.autoTurn = strArr[3]
      // this.controlsConnected = this.castStrToBool(strArr[4])
      // this.led = strArr[5]
      // this.timeLeft = parseFloat(strArr[6])
      // this.swerveFrontLeftSpeed = parseFloat(strArr[7])
      // this.swerveFrontRightSpeed = parseFloat(strArr[8])
      // this.swerveBackLeftSpeed = parseFloat(strArr[9])
      // this.swerveBackRightSpeed = parseFloat(strArr[10])
      // this.swerveFrontLeftDirection = parseFloat(strArr[11])
      // this.swerveFrontRightDirection = parseFloat(strArr[12])
      // this.swerveBackLeftDirection = parseFloat(strArr[13])
      // this.swerveBackRightDirection = parseFloat(strArr[14])
      // this.swerveFrontLeftTemperature = parseFloat(strArr[15])
      // this.swerveFrontRightTemperature = parseFloat(strArr[16])
      // this.swerveBackLeftTemperature = parseFloat(strArr[17])
      // this.swerveBackRightTemperature = parseFloat(strArr[18])
      // this.airTank = parseFloat(strArr[19])
      // this.intakePiston = this.castStrToBool(strArr[20])
      // this.elevatorSliderPiston = this.castStrToBool(strArr[21])
      // this.elevatorPivotPiston = this.castStrToBool(strArr[22])
      // this.elevatorPosition = parseFloat(strArr[23])
      // this.battery = parseFloat(strArr[24])
      // this.b0 = this.castStrToBool(strArr[25])
      // this.b1 = this.castStrToBool(strArr[26])
      // this.b2 = this.castStrToBool(strArr[27])
      // this.b3 = this.castStrToBool(strArr[28])
      // this.b4 = this.castStrToBool(strArr[29])
      // this.b5 = this.castStrToBool(strArr[30])
      // this.b6 = this.castStrToBool(strArr[31])
      // this.b7 = this.castStrToBool(strArr[32])
      // this.b8 = this.castStrToBool(strArr[33])
      // this.b9 = this.castStrToBool(strArr[34])
      // this.b10 = this.castStrToBool(strArr[35])
      // this.b11 = this.castStrToBool(strArr[36])
      // this.b12 = this.castStrToBool(strArr[37])
      // this.b13 = this.castStrToBool(strArr[38])
      // this.a0 = parseFloat(strArr[39])
      // this.a1 = parseFloat(strArr[40])
      // this.a2 = parseFloat(strArr[41])
      // this.a3 = parseFloat(strArr[42])
      // this.a4 = parseFloat(strArr[43])
      // this.a5 = parseFloat(strArr[44])
    }
  }

  close() {
    this.connector.close()
  }

  castStrToBool(str) {
    if (str.toLowerCase()=='false'){
       return false;
    } else if (str.toLowerCase()=='true'){
       return true;
    } else {
       return undefined;
    }
  }
}

export default Data;