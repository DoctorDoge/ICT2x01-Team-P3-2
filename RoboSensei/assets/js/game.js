
    Blockly.Blocks['move_forward'] = {
      init: function () {
        this.appendDummyInput()
          .appendField("Move Forward");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(10);
        this.setTooltip("Moves the Robotic Car forward!");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks['turn_left'] = {
      init: function () {
        this.appendDummyInput()
          .appendField("Turn Left");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(70);
        this.setTooltip("Turns the Robotic Car left!");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks['turn_right'] = {
      init: function () {
        this.appendDummyInput()
          .appendField("Turn Right");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(130);
        this.setTooltip("Turns the Robotic Car right!");
        this.setHelpUrl("");
      }
    };

 
    var sun = new Image();
    var moon = new Image();
    var earth = new Image();

    function init() {
      sun.src = 'canvas_sun.png';
      moon.src = 'canvas_moon.png';
      earth.src = 'canvas_earth.png';
      window.requestAnimationFrame(draw);
    }

    
    Blockly.JavaScript['move_forward'] = function (block) {
      var code = 'moveForwardButton();\n';
      return code;
    };

    Blockly.JavaScript['turn_left'] = function (block) {
      var code = 'turnLeftButton();\n';
      return code;
    };

    Blockly.JavaScript['turn_right'] = function (block) {
      var code = 'turnRightButton();\n';
      return code;
    };


    function runOne(code){
      let text = code;
      const myArray = text.split("\n");
      console.log(myArray);
      for(let x = 0; x < myArray.length; x++){
        if(x == 0) {
          eval(myArray[x]);
        } else {
          setTimeout(() => {
            eval(myArray[x]);
          }, 1000 + x * 1000);
        }
        
      }
        
      return code;
    }

  