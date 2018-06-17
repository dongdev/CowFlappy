var bgSprite;

var textData;

var myText;


var selected;


var length;
var game;


function TextField(x, y, length, sprite, g) {

    this.game = g;

    this.length = length;

    this.bgSprite = game.add.sprite(x, y, sprite);

    this.bgSprite.inputEnabled = true;

    this.textData = "";

    this.myText = game.add.text(x + 10, y + 5, 'test');

    this.myText.fontSize = 16;

    this.myText.fill = '#fff';

    this.selected = false;

    game.input.keyboard.addCallbacks(this, null, this.keyPress, null);


    this.bgSprite.events.onInputDown.add(selector, this);

}


TextField.prototype.keyPress = function (data) {


    if (this.selected) {

        switch (data.keyCode) {

            case 8:

                this.textData = this.textData.substring(0, this.textData.length - 1);

                this.myText.text = this.textData;

                break;

            default:

                if ((this.textData.length + 1) <= this.length) {

                    var char = String.fromCharCode(data.keyCode).toString();

                    if (char.length > 0) {

                        this.textData += char;

                        this.myText.text = this.textData;

                    }

                }

                break;

        }

    }

};


function selector() {

    this.selected = !this.selected;

};