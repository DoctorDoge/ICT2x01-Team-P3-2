
Blockly.Blocks['move_forward'] = {
    init: function() {
      this.appendValueInput("move_forward")
          .setCheck("String")
          .appendField("Move Forward");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("Moves the Robotic Car forward!");
   this.setHelpUrl("");
    }
};

Blockly.Blocks['move_backward'] = {
    init: function() {
      this.appendValueInput("move_backward")
          .setCheck("String")
          .appendField("Move Backwards");
      this.setOutput(true, null);
      this.setColour(65);
   this.setTooltip("Moves the Robotic Car backward!");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['turn_left'] = {
    init: function() {
      this.appendValueInput("turn_left")
          .setCheck("String")
          .appendField("Turn Left");
      this.setOutput(true, null);
      this.setColour(290);
   this.setTooltip("Turns the Robotic Car left!");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['turn_right'] = {
    init: function() {
      this.appendValueInput("turn_right")
          .setCheck("String")
          .appendField("Turn Right");
      this.setOutput(true, null);
      this.setColour(160);
   this.setTooltip("Turns the Robotic Car right!");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['repeat_loop'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("repeat");
      this.appendValueInput("repeat_no")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"]]), "number");
      this.setColour(330);
   this.setTooltip("Repeat the blocks!");
   this.setHelpUrl("");
    }
  };

Blockly.JavaScript['move_forward'] = function(block) {
    var value_move_forward = Blockly.JavaScript.valueToCode(block, 'move_forward', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['move_backward'] = function(block) {
    var value_move_forward = Blockly.JavaScript.valueToCode(block, 'move_backward', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['turn_left'] = function(block) {
    var value_move_forward = Blockly.JavaScript.valueToCode(block, 'turn_left', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['turn_right'] = function(block) {
    var value_move_forward = Blockly.JavaScript.valueToCode(block, 'turn_right', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['turn_right'] = function(block) {
    var value_turn_right = Blockly.JavaScript.valueToCode(block, 'turn_right', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.JavaScript['repeat_loop'] = function(block) {
    var dropdown_number = block.getFieldValue('number');
    var value_repeat_no = Blockly.JavaScript.valueToCode(block, 'repeat_no', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
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

// function draw() {
//   var ctx = document.getElementById('canvas-map').getContext('2d');

//   ctx.globalCompositeOperation = 'destination-over';
//   ctx.clearRect(0, 0, 300, 300); // clear canvas

//   ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
//   ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
//   ctx.save();
//   ctx.translate(150, 150);

//   // Earth
//   var time = new Date();
//   ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
//   ctx.translate(105, 0);
//   ctx.fillRect(0, -12, 40, 24); // Shadow
//   ctx.drawImage(earth, -12, -12);

//   // Moon
//   ctx.save();
//   ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
//   ctx.translate(0, 28.5);
//   ctx.drawImage(moon, -3.5, -3.5);
//   ctx.restore();

//   ctx.restore();

//   ctx.beginPath();
//   ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
//   ctx.stroke();

//   ctx.drawImage(sun, 0, 0, 300, 300);

//   window.requestAnimationFrame(draw);
// }

// init();