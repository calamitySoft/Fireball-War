Crafty.c("Ground", {
	init: function() {
		this.addComponent("2D, Canvas, Color");
		}
	});

Crafty.c("PlayerCharacter", {
	keys: null,
	side: "L",
	frameCounter: 0,
	init: function() {
		this.addComponent("2D,Canvas,Color,Keyboard,Collision,Gravity");
		this.collision();
		this.onHit("Fireball", function() {
			if(this.side == "L")
				this.x -= 40;
			else
				this.x += 40;
		});
		this.gravity("Ground");
		this.onHit("Fireball", function() {
			// get knocked back
			});
			
		},
	configPlayer: function(e) {
		this.attr(e.attr);
		this.keys = e.keys;
		this.side = e.side;
		this.bind("KeyDown", function() {
			if(this.isDown(this.keys.up) && this.frameCounter == 0)
				{
				this.bind("EnterFrame", this.jump);
				}
			else if(this.isDown(this.keys.down))
				{
				// do something like crouch???
				}
			else if(this.isDown(this.keys.fireball) && this.frameCounter == 0)
				{
				if(this.side == "L")
					{				
					var fireball = Crafty.e("Fireball, fireballSprite").attr({x: this.x + this.w + 1, y: this.y, w: 25, h: 25})
						.crop(0,0,50,30);
					fireball.displacement = +5;
					}
				else
					{
					var fireball = Crafty.e("Fireball, fireballSprite").attr({x: this.x - 51, y: this.y, w: 25, h: 25})
						.crop(50,0,50,30);	
					fireball.displacement = -5;				
					}
				this.animate("fireballP1", 5, 0);
				this.bind("EnterFrame", this.fireballRecovery);
				}
		});
		},
	jump: function() {
		this.frameCounter++;
		if(this.frameCounter <= 10)
			{
			this.y -= 14;
			if(this.side == "L")			
				this.x += 3;
			else
				this.x -= 3;
			}
		else
		{
			this.frameCounter = 0;
			this.unbind("EnterFrame", this.jump);
		}
	},
	fireballRecovery: function() {
		this.frameCounter++;
		if(this.frameCounter >= 10)
			{
			this.frameCounter = 0;
			this.crop(0, 0, 52, 80);
			this.unbind("EnterFrame", this.fireballRecovery);
			}
		}
	});

Crafty.c("Fireball", {
	displacement: 0, // + means traveling right, - means traveling left
	init: function() {
		this.addComponent("2D, Canvas, Color, Collision");
		this.collision();
		this.onHit("Fireball", function() {
			this.destroy();
		});
		this.onHit("PlayerCharacter", function() {
			this.destroy();
		});
		this.bind("EnterFrame", function() {
			this.x += this.displacement;
			});
	}
});
