
        var paper = document.getElementsByTagName("canvas")[0];
        var ctx = paper.getContext("2d");
        var particlesNumber = 40;
                
        var balls = [];
        for(var i = 0; i < particlesNumber; i++) {
           
            balls[i] = {
                x: 20,
                y: 20,
                speedX: (Math.random()*2-1)*0.06,
                speedY: (Math.random()*2-1)*0.06,
                radius:  Math.random(),
                c: "#000000",
                dice: Math.floor(Math.random()*5),           
                
                move : function() {
	                
                    if(Math.sqrt((this.x - paper.width/2)*(this.x - paper.width/2) + (this.y - paper.height/2)*(this.y - paper.height/2)) > paper.width/2) {
                        this.speedY *= -1;
                        this.speedX *= -1;
                    }
                    this.x += this.speedX;
                    this.y += this.speedY;
                },
                
                updateColor : function() {
	                if(this.dice === 0) {
		                this.c = "rgba("+5+", "+205+", "+229+", "+0.3+")";
	                }
	                if(this.dice === 1) {
		                this.c = "rgba("+255+", "+184+", "+3+", "+0.3+")";
	                }
	                if(this.dice === 2) {
		                this.c = "rgba("+255+", "+3+", "+91+", "+0.3+")";
	                }
	                if(this.dice === 3) {
		                this.c = "rgba("+61+", "+62+", "+62+", "+0.3+")";
	                }
	                if(this.dice === 4) {
		                this.c = "rgba("+214+", "+15+", "+255+", "+0.3+")"
	                }
                }
            }
            balls[i].x = Math.random()*paper.width;
            balls[i].y = paper.height/2;
        }


        /*
function ball(speedX,speedY) {
	        arraynumber += 1
	        this.posX = onclick.clientX;
	        this.posY = onclick.clientY;
	        this.x = posX;
	        this.y = posY;
	        this.speedX = speedX;
	        this.speedY = speedY;
	        
	        this.move = function() {
		        if(this.y >= paper.height - this.radius || this.y <= this.radius) {
                        this.speedY *= -1;
                    }
                    if(this.x >= paper.width - this.radius || this.x <= this.radius) {
                        this.speedX *= -1;
                    }
                    this.x += this.speedX;
                    this.y += this.speedY;
	        }
        }
*/
        
        function draw() {
	        ctx.clearRect(0,0,paper.width, paper.height);
	        ctx.beginPath();
	        ctx.arc(paper.width/2, paper.height/2, paper.width/2, 0, 2* Math.PI, false);
	        ctx.fillStyle = "black";
	        ctx.fill();
            
            for(var i = 0; i < particlesNumber; i++){
	            ctx.beginPath();
                ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, 2 * Math.PI, false);
                //  ctx.rect(balls[i].x, balls[i].y, 10, 10);
                balls[i].move();
                balls[i].updateColor();
                var rgb = balls[i].c;
                ctx.fillStyle = rgb;
                ctx.fill();                
                
                for(var j = i + 1; j < particlesNumber; j++) {
	                ctx.beginPath();
	                ctx.arc(balls[j].x, balls[j].y, balls[j].radius, 0, 2*Math.PI, false);
	                balls[j].move();
	                balls[j].updateColor();
	                var rgb = balls[j].c;
	                ctx.fillStyle = rgb;
	                ctx.fill();
	                	                
	                var dist = Math.sqrt((balls[i].x-balls[j].x)*(balls[i].x-balls[j].x) + (balls[i].y-balls[j].y)*(balls[i].y-balls[j].y));
	                
	                if(dist < 60){
		                for(var k = j + 1; k < particlesNumber; k++) {
			                ctx.beginPath();
			                ctx.arc(balls[k].x, balls[k].y, balls[k].radius, 0, 2*Math.PI, false);
			                balls[k].move();
			                balls[k].updateColor();
			                var rgb = balls[k].c;
	                        ctx.fillStyle = rgb;
							ctx.fill();   		                
		                    var dist = Math.sqrt((balls[j].x - balls[k].x)*(balls[j].x - balls[k].x) + (balls[j].y - balls[k].y)*(balls[j].y - balls[k].y));
		                    if(dist < 60) {
			                var path = new Path2D();
			                path.moveTo(balls[i].x, balls[i].y);
			                path.lineTo(balls[j].x, balls[j].y);
			                path.lineTo(balls[k].x, balls[k].y);
			                balls[i].updateColor();
			                var rgb = balls[i].c;
                            ctx.fillStyle = rgb;
			                ctx.fill(path);   
		                }
		            }
		        }
	        }
        }
    }          
        
    setInterval(draw, 30);