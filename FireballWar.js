window.onload = (function() {

	var WIDTH = 1000,
		HEIGHT = 400;

	Crafty.init(WIDTH, HEIGHT);
	Crafty.background("Black");

	
	Crafty.load("SC2FontSheet.png");
	
	Crafty.sprite(80, "ryuNeutral.png", {
		Player1Sprite: [0,0],
		Player2Sprite: [1,0],
		//fireballP1:[104,0,80,76],
		//fireballP2:[404, 0, 80, 76]
	});

	Crafty.sprite(50, "fireball.png", {
		fireballSprite: [0,0]
	});

	Crafty.sprite(80, "ryuSheet.png", {
		FireballAnimation: [0,0]
	});

	Crafty.scene("Battle", function() {
		var player1 = Crafty.e("PlayerCharacter, Player1Sprite, SpriteAnimation")
				.attr({x: 100, y: 200, w: 30, h: 100})
				.color("#0000FF")
				.crop(0, 0, 52, 80)
				.animate("fireballP1",[[0,1],[1,1],[2,1], [0,0]]);

		player1.configPlayer({side: "L", keys: {fireball: "A", up: "W"}});

		var player2 = Crafty.e("PlayerCharacter, Player1Sprite, SpriteAnimation")
				.attr({x: 800, y: 200, w: 30, h: 100})
				.color("#00FF00")
				.crop(80,0,52,80)
				.animate("fireballP1",[[5,1],[4,1],[3,1], [1,0]]);

		player2.configPlayer({side: "R", keys: {fireball: "K", up: "I"}});

		Crafty.e("Ground")
			.attr({x: 0, y: 300, w: 1000, h: 100})
			.color("#888888");

		Crafty.bind("EnterFrame", function() {
			if(player1.x < 0 - player1.w) // Have to make sure the whole body is off screen
				{
				Crafty.scene("Player2Wins");
				}
			else if(player2.x > WIDTH)
				{
				Crafty.scene("Player1Wins");
				}
			});

		var frameCounter = 70; 
		var label = Crafty.e("2D, Canvas, SpriteText")
		Crafty.load("SC2FontSheet.png");
		label.registerFont("MyFont", 50, "SC2FontSheet.png", "ABCDEFGHIJKLMNOPQRSTUVWXYZ&1234567890!?.");
		label.attr({x: 400, y: 250, w: 300, h: 50});		
		label.text("Ready?");
		label.bind("EnterFrame", function() {
			frameCounter--;
			player1.frameCounter = frameCounter;
			player2.frameCounter = frameCounter;
			if(frameCounter < 11)
				label.text("Go!");
			if(frameCounter <= 0)
				{
				player1.frameCounter = 0;
				player2.frameCounter = 0;
				label.x = 9000;
				label.destroy();	
				}
			});
	});

	Crafty.scene("Player1Wins", function() {
		var otherLabel = Crafty.e("2D, Canvas, SpriteText");
		Crafty.load("angelsb.png");
		otherLabel.registerFont("angelsb", 8, "angelsb.png", "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
		otherLabel.attr({x: 400, y: 400, w: 8*21, h: 8});
		otherLabel.text("Press r for rematch");

		var label = Crafty.e("2D, Canvas, SpriteText");
		Crafty.load("SC2FontSheet.png");
		label.registerFont("MyFont", 50, "SC2FontSheet.png", "ABCDEFGHIJKLMNOPQRSTUVWXYZ&1234567890!?.");
		label.attr({x: 200, y: 250, w: 650, h: 50});		
		label.text("Player 1 Wins");

		Crafty.e("Keyboard")
			.bind("KeyDown", function() {
				if(this.isDown("R"))
					Crafty.scene("Battle");
			});
		
		});
	Crafty.scene("Player2Wins", function() {
		var label = Crafty.e("2D, Canvas, SpriteText");
		Crafty.load("SC2FontSheet.png");
		label.registerFont("MyFont", 50, "SC2FontSheet.png", "ABCDEFGHIJKLMNOPQRSTUVWXYZ&1234567890!?.");
		label.attr({x: 200, y: 250, w: 650, h: 50});		
		label.text("Player 2 Wins");
		});

	Crafty.scene("Battle");
});
