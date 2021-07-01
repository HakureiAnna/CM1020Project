/*
	The Game Project part 7 - Bring it all together
	The extensions chosen to implement are no. 2 and 4.
	3. Create platforms
	Use the factory pattern to create platforms. To do this, you'll need to wait until the next topic when a tutorial video will be provided.

	4. Create enemies
	Use a constructor function to create enemies. To do this, you'll need to wait until the next topic when a tutorial video will be provided.
*/

// used for implementing horizontal scrolling
var scrollPos = 0;

// displayed screen dimensions
var screen = {
	w: 1024,
	h: 576
};

// world dimensions, including parts of the world currently not scrolled to
var world = {
	w: screen.w * 4,
	h: screen.h,
	constrain: screen.w * 0.08
};

// sky representation
var sky = {
	color: [100, 155, 255]
};

// ground representation
var ground = {
	color: [0, 155, 0],
	init: function() {
		this.level = height * 3/4;
		this.depth = height- this.level;
	},
	draw: function() {
		noStroke();
		fill(this.color[0], this.color[1], this.color[2]);
		rect(0, this.level, world.w, this.depth);
	}
};

// enumeration of possible poses the game character can take
var POSE = {
	STANDING: 0,
	JUMPING_FRONT: 1,
	WALKING_LEFT: 2,
	WALKING_RIGHT: 3,
	JUMPING_LEFT: 4,
	JUMPING_RIGHT: 5,
	LIMIT: 6,
};

// game character
var gameChar = {
	lives: 3,
	score: 0,
	screen_x: 0,
	y: 0,
	world_x: 0,
	speed: {
		x: 0,
		y: 0,
	},
	jumpHeight: 120,
	jumped: false,
	plunging: false,
	contacted: false,
	prevContacted: false,
	prevJumped: false,
	prevPlatformY: 0,
	pose: POSE.STANDING,
	// character head
	head: {
		color: {
			r: 255,
			g: 228,
			b: 196
		},
		size: {
			standing: {
				x: 30,
				y: 30,
			},
			jumpingFront: {
				x: 30,
				y: 30,
			},
			walkingLeft: {
				x: 20,
				y: 30,
			},
			walkingRight: {
				x: 20,
				y: 30,
			},
			jumpingLeft: {
				x: 30,
				y: 20,
			},
			jumpingRight: {
				x: 30,
				y: 20,
			},
		},
		offset: {
			standing: {
				x: 0,
				y: -50,
			},
			jumpingFront: {
				x: 0,
				y: -60,
			},
			walkingLeft: {
				x: 0,
				y: -50,
			},
			walkingRight: {
				x: 0,
				y: -50,
			},
			jumpingLeft: {
				x: 0,
				y: -65,
			},
			jumpingRight: {
				x: 0,
				y: -65,
			},
		},
		// draw function for character's head
		draw: function(x, y, data) {
			var offset = data.offset;
			var size = data.size;
			fill(this.color.r, this.color.g, this.color.b);
			ellipse(x + offset.x, y + offset.y, size.x, size.y);
		},
	},
	// character body
	body: {
		color: {
			r: 127,
			g: 255,
			b: 212,
		},
		size: {
			standing: {
				x: 20,
				y: 40,
			},
			jumpingFront: {
				x: 24,
				y: 30,
			},
			walkingLeft: {
				x: 18,
				y: 40,
			},
			walkingRight: {
				x: 18,
				y: 40,
			},
			jumpingLeft: {
				x: 24,
				y: 30,
			},
			jumpingRight: {
				x: 24,
				y: 30,
			},
		},
		offset: {
			standing: {
				x: -10,
				y: -45,
			},
			jumpingFront: {
				x: -12,
				y: -55,
			},
			walkingLeft: {
				x: -8,
				y: -45,
			},
			walkingRight: {
				x: -10,
				y: -45,
			},
			jumpingLeft: {
				x: -12,
				y: -60,
			},
			jumpingRight: {
				x: -12,
				y: -60,
			},
		},
		// draw function for character body
		draw: function(x, y, data) {
			var offset = data.offset;
			var size = data.size;
			fill(this.color.r, this.color.g, this.color.b);
			rect(x + offset.x, y + offset.y, size.x, size.y);
		}
	},
	// character legs
	legs: {
		color: {
			left: {
				r: 119,
				g: 136,
				b: 153,
			},
			right: {
				r: 169,
				g: 169,
				b: 169,
			},
		},
		size: {
			standing: {
				left: {
					x: 8,
					y: 15,
				},
				right: {					
					x: 8,
					y: 15,
				},
			},
			jumpingFront: {
				left: {
					x: 8,
					y: 10,
				},
				right: {
					x: 8,
					y: 10,
				},
			},
			walkingLeft: {
				left: {
					x: 8,
					y: 15,
				}, 
				right: {					
					x: 8,
					y: 15,
				},
			},
			walkingRight: {
				left: {
					x: 8,
					y: 15,
				},
				right: {
					x: 8,
					y: 15,					
				},
			},
			jumpingLeft: {
				left: {
					x: 8,
					y: 15,
				},
				right: {					
					x: 8,
					y: 15,
				}
			},
			jumpingRight: {
				left: {
					x: 8,
					y: 15,
				},
				right: {					
					x: 8,
					y: 15,
				}
			},
		},		
		offset: {
			standing: {
				left: {
					x: -10,
					y: -10,
				},
				right: {
					x: 2,
					y:-10.
				},
			},
			jumpingFront: {
				left: {
					x: -10,
					y: -25,
				},
				right: {
					x: 2,
					y: -25,
				},
			},
			walkingLeft: {
				left: {
					x: -12,
					y: -15,
				},
				right: {
					x: 2,
					y: -10,
				},
			},
			walkingRight: {
				left: {
					x: -10,
					y: -10,
				},
				right: {
					x: 4,
					y:-15,
				},
			},
			jumpingLeft: {
				left: {
					x: -14,
					y: -39,
				},
				right: {
					x: 4,
					y: -35,
				},
			},
			jumpingRight: {
				left: {
					x: -12,
					y: -35,
				},
				right: {
					x: 6,
					y: -39,
				},
			},
		},		
		// draw function for character legs		
		draw: function(x, y, data) {
			var offset = data.offset;
			var size = data.size;
			fill(this.color.left.r, this.color.left.g, this.color.left.b);
			rect(x + offset.left.x, y + offset.left.y, size.left.x, size.left.y);
			fill(this.color.right.r, this.color.right.g, this.color.right.b);
			rect(x + offset.right.x, y + offset.right.y, size.right.x, size.right.y);
		}
	},
	// character hands
	hands: {
		color: {
			left: {
				r: 135,
				g: 206,
				b: 235,
			},
			right: {				
				r: 176,
				g: 196,
				b: 222,
			},
		},
		size: {
			standing: {
				left: {
					x: 7,
					y: 30,
				},
				right: {						
					x: 7,
					y: 30,
				},
			},
			jumpingFront: {
				left: {
					x: 10,
					y: 10,
				},
				right: {
					x: 10,
					y: 10,
				},
			},
			walkingLeft: {
				left: {
					x: 7,
					y: 10,
				},
				right: {					
					x: 7,
					y: 30,
				},
			},
			walkingRight: {
				left: {
					x: 7,
					y: 30,
				},
				right: {
					x: 7,
					y: 10,
				},
			},
			jumpingLeft: {
				left: {
					x: 12,
					y: 8,
				},
				right: {
					x: 7,
					y: 24,
				},
			},
			jumpingRight: {
				left: {
					x: 7,
					y: 24,
				},
				right: {					
					x: 12,
					y: 8,
				}
			},
		},
		offset: {
			standing: {
				left: {
					x: -17,
					y: -40,
				},
				right: {
					x: 10,
					y: -40,
				},
			},
			jumpingFront: {
				left: {
					x: -20,
					y: -50,					
				},
				right: {
					x: 10,
					y: -50,
				},
			},
			walkingLeft: {
				left: {
					x: -15,
					y: -40,					
				},
				right: {
					x: 0,
					y: -40,
				},
			},
			walkingRight: {
				left: {
					x: -7,
					y: -40,
				},
				right: {
					x: 8,
					y: -40,
				},
			},
			jumpingLeft: {
				left: {
					x: -23,
					y: -60,
				},
				right: {
					x: 0,
					y: -60
				},
			},
			jumpingRight: {
				left: {
					x: -5,
					y: -60,
				},
				right: {
					x: 12,
					y: -60,
				},
			},
		},
		// draw function for character's hands
		draw: function(x, y, data) {
			var offset = data.offset;
			var size = data.size;
			fill(this.color.left.r, this.color.left.g, this.color.left.b);
			rect(x + offset.left.x, y + offset.left.y, size.left.x, size.left.y);
			fill(this.color.right.r, this.color.right.g, this.color.right.b);
			rect(x + offset.right.x, y + offset.right.y, size.right.x, size.right.y);
		}
	},
	// utility function for getting the correct drawing parameters according to the character's current pose
	getData: function(obj) {
		switch (this.pose) {
		case POSE.STANDING:
			return {
				offset: obj.offset.standing,
				size: obj.size.standing,
			};
		case POSE.JUMPING_FRONT:
			return {
				offset: obj.offset.jumpingFront,
				size: obj.size.jumpingFront,
			};
		case POSE.WALKING_LEFT:
			return {
				offset: obj.offset.walkingLeft,
				size: obj.size.walkingLeft,
			};
		case POSE.WALKING_RIGHT:
			return {
				offset: obj.offset.walkingRight,
				size: obj.size.walkingRight,
			};
		case POSE.JUMPING_LEFT:
			return {
				offset: obj.offset.jumpingLeft,
				size: obj.size.jumpingLeft,
			};
		case POSE.JUMPING_RIGHT:
			return {
				offset: obj.offset.jumpingRight,
				size: obj.size.jumpingRight,
			};
		default:
			return {
				offset: obj.offset.standing,
				size: obj.size.standing,
			};
		}
	},
	// character drawing function
	draw: function() {
		this.legs.draw(this.screen_x, this.y, this.getData(this.legs));
		this.body.draw(this.screen_x, this.y, this.getData(this.body));
		this.hands.draw(this.screen_x, this.y, this.getData(this.hands));
		this.head.draw(this.screen_x, this.y, this.getData(this.head));
	},
	// update function that updates the character's position and pose by checking against other world entites
	update: function() {
		this.checkPose();
		var new_x = this.world_x + this.speed.x;
		if (new_x > world.constrain && new_x < world.w - world.constrain) {
			if (this.speed.x < 0) {
				if (this.screen_x < 0.08 * width || scrollPos != 0)
					scrollPos -= this.speed.x;
				else
					this.screen_x += this.speed.x;
			} else if (this.speed.x > 0) {
				if (this.screen_x > 0.92 * width || scrollPos != 0) 
					scrollPos -= this.speed.x;
				else
					this.screen_x += this.speed.x;
			}

			this.world_x = new_x;
		}		
		this.y += this.speed.y;
		if (!this.plunging)
		{
			for (var i=0; i< canyons.n; ++i) {
				if (this.world_x > canyons.x[i] && this.world_x < canyons.x[i] + canyons.width[i]) {
					if (this.y >= ground.level) {
						this.plunging = true;
						this.prevX = canyons.x[i] - 20;
						if (this.speed.x > 0) {
							this.speed.x = 1;
						} else {
							this.speed.x = -1;
						}
						this.speed.y = 2;
						break;
					}
				}
			}

			for (var i=0; i<platforms.n; ++i) {
				if (this.contacted = platforms.platforms[i].checkContact(this.world_x, this.y)) {					
					if (!this.prevContacted)
						this.speed.x = 0;
					this.y = platforms.platforms[i].y;
					if (this.speed.x > 0)
						this.pose = POSE.WALKING_RIGHT;
					else if (this.speed.x < 0)
						this.pose = POSE.WALKING_LEFT;
					else
						this.pose = POSE.STANDING;
					this.prevJumped = this.speed.y;					
					this.prevContacted = true;
					this.prevPlatformY = platforms.platforms[i].y;
					this.speed.y = 0;
					break;
				}
			}
			
			if (this.prevContacted && !this.contacted) {
				this.speed.x = 0;
				this.pose = POSE.JUMPING_FRONT;
				this.speed.y = 2;
				this.prevContacted = false;
			}

			if (this.y > ground.level) {
				this.speed.y = 0;
				this.y = ground.level;
				this.jumped = false;
			}
		}  else {
			if (this.y > world.h) {
				if (this.lives > 0)
					this.lives -= 1;
				if (this.lives > 0) {
					this.reset();
				}
			}
		}
		
		this.score = 0;
		for (var i=0; i<collectibles.n; ++i)
			this.score += int(collectibles.collected[i]);
	},
	// function used to reset character to leftmost of the world space when the character dies
	reset: function() {		
		this.y = ground.level;
		this.world_x = world.constrain;
		this.screen_x = world.constrain;
		scrollPos = 0;
		this.plunging = false;
		this.jumped = false;
		this.speed.x = 0;
		this.speed.y = 0;
	},
	// function used to update character's current pose by checking the character's current state and keys pressed
	checkPose: function() {		
		if (!this.plunging) {
			if (keys.pressedJ() && !this.jumped) {			
				this.jumped = true;
				this.pose = POSE.JUMPING_FRONT;				
				this.y -= this.jumpHeight;
				if (this.prevContacted) {
					this.prevContacted = false;
					this.y = this.prevPlatformY - this.jumpHeight;
				}
				this.speed.y = 2;
			} else if (keys.pressedL()) {
				if (this.speed.y == 0) {
					this.pose = POSE.WALKING_LEFT;
				} else {
					this.pose = POSE.JUMPING_LEFT;
				}
				this.speed.x = -4;
			} else if (keys.pressedR()) {
				if (this.speed.y == 0) {
					this.pose = POSE.WALKING_RIGHT;
				} else {
					this.pose = POSE.JUMPING_RIGHT;
				}
				this.speed.x = 4;
			} else if (keys.pressedJL() && !this.jumped) {
				this.jumped = true;
				this.pose = POSE.JUMPING_LEFT;
				this.y -= this.jumpHeight;
				this.speed.y = 2;
				this.speed.x = -4;
			} else if (keys.pressedJR() && !this.jumped) {
				this.jumped = true;
				this.pose = POSE.JUMPING_RIGHT;			
				this.y -= this.jumpHeight;
				this.speed.y = 2;
				this.speed.x = 4;
			} else if (this.speed.y == 0) {
				if (this.speed.x > 0)
					this.pose = POSE.WALKING_RIGHT;
				else if (this.speed.x < 0)
					this.pose = POSE.WALKING_LEFT;
				else {				
					this.pose = POSE.STANDING;
				}
				if (!keys.pressedJ()) {
					this.speed.x = 0;
					this.jumped = false;
				}
			}
		}
	},
	// initialization function for the character
	init: function() {
		this.screen_x = world.constrain;
		this.world_x = world.constrain;
		this.y = ground.level;
		this.pose = POSE.STANDING; 
		this.jumped = false;
		this.speed.x = 0;
		this.speed.y = 0;
		this.plunging = false;
		this.contacted = false;
		this.prevContacted = false;
		this.prevPlatformY = ground.level;
		this.lives = 3;
	},
};

// clouds representation
var clouds = {
	height: 100,
	d: 48,
	// no. of clouds
	n: 20,
	shade: [255, 255, 255],
	// movement range
	limit: {
		x: [0, world.w],
	},
	// initialization function for clouds
	init: function() {
		this.x = new Array(this.n);
		this.limit.y = [this.height-25, this.height+25];
		this.y = new Array(this.n);
		this.shade = new Array(this.n);
		this.deltaX = new Array(this.n);
		this.deltaY = new Array(this.n);
		for (var i=0; i<this.n; ++i) {
			this.x[i] = random(50, world.w - 50);
			this.y[i] = random(this.height - 25, this.height+25);
			this.deltaX[i] = random(-4, 4);
			this.deltaY[i] = random(-2, 2);
			shade = random(205, 255);
			this.shade[i] = shade;
		}
	},
	// drawing and update function for clouds
	draw: function() {
		noStroke();
		for (var i=0; i<this.n; ++i) {			
			this.x[i] += this.deltaX[i];
			this.y[i] += this.deltaY[i];
			if (this.x[i] < this.limit.x[0] || this.x[i] > this.limit.x[1]) {
				this.deltaX[i] *= -1;
				this.x[i] = this.x[i] < this.limit.x[0]? this.limit.x[0] - scrollPos: this.limit.x[1] - scrollPos;
			}
			if (this.y[i] < this.limit.y[0] || this.y[i] > this.limit.y[1]) {
				this.deltaY[i] *= -1;
				this.y[i] = this.y[i] < this.limit.y[0]? this.limit.y[0]: this.limit.y[1];
			}
			fill(this.shade[i], this.shade[i], this.shade[i]);
			ellipse(this.x[i], this.y[i], this.d, this.d);
			ellipse(this.x[i]+20, this.y[i]+20, this.d, this.d);
			ellipse(this.x[i]+50, this.y[i]+20, this.d, this.d);
			ellipse(this.x[i]+50, this.y[i]-20, this.d, this.d);
			ellipse(this.x[i]+25, this.y[i]-20, this.d, this.d);
			ellipse(this.x[i]+70, this.y[i], this.d, this.d);
		}
	}
};

// mountains representation
var mountains = {
	// movement range
	limit: {
		y: [80, 160]
	},
	shade_light: [185, 155, 115],
	shade_dark: [135, 57, 20],
	delta_shade: 5,
	// no. of mountains
	n: 5,
	// initialization function for mountains
	init: function() {
		this.x = new Array(this.n);
		this.y = new Array(this.n);
		for (var i=0; i<this.n; ++i) {
			this.x[i] = random(0, world.w);
			this.y[i] = random(this.limit.y[0], this.limit.y[1]);
		}
	},
	// drawing function for mountains
	draw: function() {
		noStroke();
		for (var i=0; i<this.n; ++i) {
			fill(this.shade_light[0] + this.delta_shade * i, this.shade_light[1] + this.delta_shade * i, this.shade_light[2] + this.delta_shade * i);
			triangle(this.x[i], this.y[i]-20, this.x[i] - 200, ground.level,  this.x[i] + 100, ground.level);
			fill(this.shade_dark[0] + this.delta_shade * i, this.shade_dark[1] + this.delta_shade * i, this.shade_dark[2] + this.delta_shade * i);
			triangle(this.x[i], this.y[i]-20, this.x[i]+100, ground.level, this.x[i]+200, ground.level);
		}
	}
};

// trees representation
var trees = {
	startX: 400,	
	y: 346,
	shade_trunk: [139, 69, 19],
	shade_leaves: [107, 142, 35],
	// size limit for trees
	limit: {
		x: [30, 80],
	},
	// no. of trees
	n: 10,
	// initialization function for trees
	init: function() {
		this.x = new Array(this.n);
		this.r = new Array(this.n);
		this.hw = new Array(this.n);
		for (var i=0; i<this.n; ++i) {
			this.x[i] = random(0, world.w);
			this.r[i] = random(90, 120);
			this.hw[i] = random(10, 15);
		}
	},
	// drawing function for trees
	draw: function() {
		noStroke();
		for (var i=0; i<this.n; ++i) {
			fill(this.shade_leaves[0], this.shade_leaves[1], this.shade_leaves[2]);
			ellipse(this.x[i], this.y-60, this.r[i], this.r[i]);
			ellipse(this.x[i]-40, this.y-25, this.r[i], this.r[i]);
			ellipse(this.x[i]+40, this.y-25, this.r[i], this.r[i]);
			fill(this.shade_trunk[0], this.shade_trunk[1], this.shade_trunk[2]);		
			rect(this.x[i]-this.hw[i], this.y-20, this.hw[i]*2, ground.level-this.y+20);
			triangle(this.x[i]-60, this.y-30, this.x[i], this.y-20, this.x[i], this.y);
			triangle(this.x[i]+60, this.y-30, this.x[i], this.y-20, this.x[i], this.y);
		}		
	}
};

// canyons representation
var canyons = {
	// no. of canyons
	n: 2,
	shade_lava: [255, 0, 0],
	shade_abyss: [139, 69, 19],
	// limits for the positioning of the canyons
	limit: {
		lava: {
		},
		abyss: {
			x: [50, 80],			
		}
	},
	// initialization function for canyons
	init: function() {
		this.limit.lava.y = [ground.level+12, ground.level+50];
		this.x = new Array(this.n);
		this.width = new Array(this.n);
		this.deltaY = new Array(this.n);
		this.y = new Array(this.n);
		for (var i=0; i<this.n; ++i) {
			this.x[i] = random(world.constrain, world.w - world.constrain);
			this.width[i] = random(this.limit.abyss.x[0], this.limit.abyss.x[1]);
			this.deltaY[i] = random(2, 5) * (random(0, 2) > 0? 1: -1);
			this.y[i] = random(this.limit.lava.y[0], this.limit.lava.y[1]);
		}
	},
	// drawing and update function for canyons
	draw: function() {
		for (var i=0; i<this.n; ++i) {
			noStroke();
			fill(this.shade_abyss[0], this.shade_abyss[1], this.shade_abyss[2]);
			rect(this.x[i], ground.level, this.width[i], ground.depth);
			var newY = this.y[i] + this.deltaY[i];
			if (newY < this.limit.lava.y[0] || newY > this.limit.lava.y[1]) {
				this.deltaY[i] *= -1;
			} else {
				this.y[i] = newY;
			}
			fill(this.shade_lava[0], this.shade_lava[1], this.shade_lava[2]);
			rect(this.x[i], this.y[i], this.width[i], ground.depth);
		}
	}
};

// keys representation
var keys = {
	left_key: 37,
	left_key_alt: 65,
	right_key: 39,
	right_key_alt: 68,
	jump_key: 32,
	reset_key: 32,
	left_pressed: false,
	right_pressed: false,
	jump_pressed: false,
	// function used to check for key presses
	update: function(keyCode) {
		if (keyCode == this.left_key || keyCode == this.left_key_alt) {
			this.left_pressed = !this.left_pressed;
		} else if (keyCode == this.right_key || keyCode == this.right_key_alt) {
			this.right_pressed = !this.right_pressed;
		} else if (keyCode == this.jump_key) {
			this.jump_pressed = !this.jump_pressed;
		}
	},
	// function to check if left key is pressed without the jump key pressed at the same time
	pressedL: function() {
		return this.left_pressed && !this.jump_pressed;		
	},
	// function to check if right key is pressed without the jump key being pressed at the same time
	pressedR: function() {
		return this.right_pressed && !this.jump_pressed;
	},
	// function to check if jump key is pressed without direcitonal keys been pressed
	pressedJ: function() {
		return this.jump_pressed && !this.left_pressed && !this.right_pressed;
	},
	// function to check if left jump key combination is pressed
	pressedJL: function() {
		return this.left_pressed && this.jump_pressed;
	},
	// function to check if right jump key combination is pressed
	pressedJR: function() {
		return this.right_pressed && this.jump_pressed;
	},
	//function to check if directional keys are pressed
	pressedLR: function() {
		return this.left_pressed || this.right_pressed;
	},
	// function used to check if no keys are pressed
	noPressed: function() {
		return !(this.left_pressed || this.right_pressed || this.jump_pressed);
	},
}

// collectibles representation
var collectibles = {
	// no. of collectibles
	n: 12,
	state: 0,
	// limits relevant to collectible
	limit: {},
	deltaState: 0.5,
	shade_outer: [175, 238, 238],
	shade_inner: [224, 255, 255],
	hw_inner: 7,
	hw_outer: 10,
	// initialization function for collectibles
	init: function() {
		this.limit.y = [ground.level - 80, ground.level-this.hw_outer-this.hw_inner];
		this.x = new Array(this.n);
		this.y = new Array(this.n);
		this.collected = new Array(this.n);
		for (var i=0; i<this.n; ++i) {
			this.x[i] = random(world.constrain * 1.5, world.w - world.constrain * 1.5);
			this.y[i] = random(this.limit.y[0], this.limit.y[1]);
			this.collected[i] = false;
		}
	},
	// update function for collectibles
	update: function() {
		for (var i=0; i<this.n; ++i) {
			if (dist(gameChar.world_x, gameChar.y, this.x[i], this.y[i]+this.hw_outer) < this.hw_outer*4) {
				this.collected[i] = true;
			}
		}
	},
	// drawing function for collectibles
	draw: function() {
		noStroke();
		this.state += this.deltaState;
		outer = map(this.state, 0, this.hw_inner, 0, this.hw_outer);
		if (this.state == this.hw_inner || this.state == 0) {
			this.deltaState *= -1;
		}

		for (var i=0; i<this.n; ++i) {
			if (!this.collected[i]) {
				fill(this.shade_outer[0], this.shade_outer[1], this.shade_outer[2]);
				triangle(this.x[i], this.y[i]-this.hw_outer*2, this.x[i]-this.hw_outer+outer, this.y[i]-this.hw_outer, this.x[i]+this.hw_outer-outer, this.y[i]-this.hw_outer);
				rect(this.x[i]-this.hw_outer+outer, this.y[i]-this.hw_outer, this.hw_outer*2-outer*2, this.hw_outer*2);
				triangle(this.x[i], this.y[i]+this.hw_outer*2, this.x[i]-this.hw_outer+outer, this.y[i]+this.hw_outer, this.x[i]+this.hw_outer-outer, this.y[i]+this.hw_outer);
				fill(this.shade_inner[0], this.shade_inner[1], this.shade_inner[2]);
				triangle(this.x[i], this.y[i]-this.hw_inner*2, this.x[i]-this.hw_inner, this.y[i]-this.hw_inner, this.x[i]+this.hw_inner, this.y[i]-this.hw_inner);
				rect(this.x[i]-this.hw_inner, this.y[i]-this.hw_inner, this.hw_inner*2, this.hw_inner*2);
				triangle(this.x[i], this.y[i]+this.hw_inner*2, this.x[i]-this.hw_inner, this.y[i]+this.hw_inner, this.x[i]+this.hw_inner, this.y[i]+this.hw_inner);
			}
		}
	}
};

/*
 	Extension 3.
	 Implementation of the platforms is an adaptation of the platform implementation given within the lectures, it is modified to conform to the overall code structure used to implement the prior parts of the game project. That is to encapsulate everything related to the game entities - platforms within a JSON object, including the number of platforms, the color of the platforms and a list representing the actual platform objects. Finally, since the requirement stated that platforms should be created using the factory platform, the factory function is encapsulated as a method within the platforms object. The code used within p5 functions (setup and draw) are also refactored such that they are member methods of the platform object, resulting in a cleaning code within the p5 methods. This implementation allowed further practice of the current context keyword this, cementing the understanding that it refers to the most recent level of context, even when used in a method function within the object been constructed in the factory method.
*/
// platforms representation
var platforms = {
	// no. of platforms
	n: 10,
	// represents list of platforms
	platforms: null,
	color: '#5f9ea0',
	// initialization of platforms
	init: function() {
		this.platforms = [];
		for (var i=0; i<this.n; ++i) {
			this.platforms.push(this.create(random(100, world.w - 100), ground.level-100, random(50, 100)));
		}
	},
	// factory function for creating individual platforms
	create: function(x, y, length) {
		var p = {
			x: x,
			y: y,
			length: length,
			// drawing function for individual platform
			draw: function() {
				noStroke();
				fill(platforms.color);
				rect(this.x, this.y, this.length, 20);
			},
			// collision detection function for platform against game character
			checkContact: function(gc_x, gc_y) {
				if (gc_x > this.x && gc_x < this.x + this.length) {
					var d = this.y - gc_y;
					if (d >= 0 && d < 5) {
						return true;
					}
					return false;
				}
			}
		};
		return p;
	},
	// drawing function for platforms
	draw: function() {		
		for (var i=0; i<this.n; ++i) {
			this.platforms[i].draw();
		}
	}
};

/*
	Extension 4.
	The implementation of enemies is an adaptation of the enemies given in the lecture. Changes are made so the code conforms to the overall structure used for other world 	entities. Such that a JSON object is used to hold all data relevant to enemies such as the number of enemies to create, as well as a list of the actual enemy objects, the enemies are also made to have a gradual changing color that works by using a number of random variables, first selecting one of the R,G,B channels and modifying the current value of the channel by applying a delta within the range of (-5, 5). The code within the p5 mandated setup and draw functions are also encompassed in the enemies object to provide a cleaner code when seen from the p5 functions. Skill practiced during this implementation is allowing further practice of using constructor functions within the Javascript language.
*/
// enemies representation
var enemies = {
	// no. of enemies
	n: 10,
	// list of enemies
	enemies: null,
	// initialization function for enemies
	init: function() {
		this.enemies = [];
		for (var i=0; i<this.n; ++i) {
			this.enemies.push(new Enemy(random(100, world.w - 100), ground.level-10, random(50, 100)));
		}
	},
	// update and drawing function for enemies
	update: function() {	
		for (var i=0; i<this.n; ++i) {
			this.enemies[i].draw();
			var isContact = this.enemies[i].checkContact(gameChar.world_x, gameChar.y);
			if (isContact) {
				gameChar.lives -= 1;
				if (gameChar.lives > 0) {
					gameChar.reset();
				}
			}
		}
	}

};

// constructor function for individual enemy
function Enemy(x, y, range) {
	this.x = x;
	this.y = y;
	this.range = range;
	this.color = [random(0,255), random(0,255), random(0,255)];

	this.currentX = x;
	this.inc = 1;

	// update function for individual enemy
	this.update = function() {
		var selectColor = int(random(0, 3));
		var delta = round(random(-5, 5));
		this.color[selectColor] = constrain(this.color[selectColor] + delta, 0, 255);

		this.currentX += this.inc;

		if (this.currentX >= this.x + this.range) {
			this.inc = -1;
		} else if (this.currentX <= this.x - this.range) {
			this.inc = 1;
		}
	};

	// drawing function for individual enemy
	this.draw = function() {
		this.update();
		fill(this.color[0], this.color[1], this.color[2]);
		ellipse(this.currentX, this.y, 20, 20);
	};

	// collision detection function for individual enemy against game character
	this.checkContact = function(gc_x, gc_y) {
		var d = dist(gc_x, gc_y, this.currentX, this.y);
		if (d < 20) {
			return true;
		}
		return false;
	};
}

// goal pole representation
var goal = {
	reached: false,
	x: 0,
	color: {
		pole: 'black',
		flag: 'red'
	},
	dimensions: {
		pole: {
			h: 100,
			w: 2
		},
		flag: {
			w: 40,
			h: 30
		}
	},
	// initialization function for goal pole
	init: function() {
		this.x = world.w - world.constrain * 1.2;
		this.reached = false;
	},
	// update function for goal pole
	update: function() {
		if (gameChar.world_x >= this.x) {
			this.reached = true;
		}
	},
	// drawing function for goal pole
	draw: function() {
		stroke(this.color.pole);
		strokeWeight(this.dimensions.pole.w);
		line(this.x, ground.level-this.dimensions.pole.h, this.x, ground.level);
		noStroke();
		fill(this.color.flag);
		triangle(
			this.x, 
			ground.level-this.dimensions.pole.h, 
			this.x + this.dimensions.flag.w, 
			ground.level - this.dimensions.pole.h + this.dimensions.flag.h/2, 
			this.x,
			ground.level - this.dimensions.pole.h + this.dimensions.flag.h
		);
	}
};

// HUD reprsentation
var hud = {
	color: {
		score: 'white',
		lives: 'white',
		gameOver: 'red',
		gameWon: 'lime'
	},
	size: {
		score: 24,
		lives: 24,
		gameDone: 32,
	},
	pos: {
		score: {
			x: 20,
			y: 30,
		},
		lives: {		
			x: 0,	
			y: 30,
		},
		gameDone: {

		}
	},
	// initialization function for HUD
	init: function() {	
		this.pos.lives.x = width - 100;
		this.pos.gameDone.x = width/2;
		this.pos.gameDone.y = height/2;
	},
	// drawing function for HUD, displaying player score and live and win/ lose information
	draw: function() {
		textAlign(LEFT);
		textSize(this.size.score);
		fill(this.color.score);
		text("Score: " + gameChar.score, this.pos.score.x, this.pos.score.y);
		textSize(this.size.lives);
		fill(this.color.lives);
		text("Lives: " + gameChar.lives, this.pos.lives.x, this.pos.lives.y);
		if (goal.reached) {
			textAlign(CENTER);
			textSize(this.size.gameDone);
			fill(this.color.gameWon);
			text("Level complete. Press Space to continue.", this.pos.gameDone.x, this.pos.gameDone.y);
		} else if (gameChar.lives <= 0) {
			reset();
			textAlign(CENTER);
			textSize(this.size.gameDone);
			fill(this.color.gameOver);
			text("GameOver. Press Space to continue.", this.pos.gameDone.x, this.pos.gameDone.y);
		}
	}
}

// reset function to perform global reset of game world
function reset() {
	translate(-scrollPos, 0);
	scrollPos = 0;
	
	ground.init();
	trees.init();
	clouds.init();
	mountains.init();
	canyons.init();
	collectibles.init();
	gameChar.init();
	goal.init();
	platforms.init();
	enemies.init();
	hud.init();
}


function setup()
{
	createCanvas(screen.w, screen.h);

	// // Initialise arrays of scenery objects.

	// Boolean variables to control the movement of the game character.

	// Variable to control the background scrolling.

	// Initialise arrays of scenery objects.
	reset();
}

function draw()
{
	background(sky.color[0], sky.color[1], sky.color[2]); // fill the sky blue
	push();
	translate(scrollPos, 0);

	ground.draw();


	// Draw clouds.
	clouds.draw();

	// Draw mountains.
	mountains.draw();

	// Draw trees.
	trees.draw();

	// Draw canyons
	canyons.draw();

	// Draw collectable items
	collectibles.update();
	collectibles.draw();

	goal.update();
	goal.draw();

	platforms.draw();

	enemies.update();

	pop();

	// Draw the game character - this must be last
	gameChar.update();
	gameChar.draw();	
	
	hud.draw();
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
	if ((gameChar.lives == 0 || goal.reached) && keyCode == keys.reset_key) {
		gameChar.lives = 3;
		reset();
	}
	keys.update(keyCode);
}

function keyReleased()
{
	keys.update(keyCode);

}

