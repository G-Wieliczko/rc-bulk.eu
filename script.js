			var scrolltotop=0;
		    var canvas = document.getElementById('canvas');     
		    var context = canvas.getContext('2d');
		    var W,H,adjust,radius,slow,lw;
		    initballs();
			var index=0;	
			var x = [];
			var y = [];
			var particle_count = 12,
			particles = [];
			
		    function Particle()
		    {
		        this.x = Math.random()*(W-2*radius)+radius;
		        this.y = Math.random()*(H/4-2*radius)+radius+H/4*3;
		        this.speedx = Math.round((Math.random()*200)-100)/100;
		        this.speedy = Math.round((Math.random()*200)-100)/100;
				this.index = index;
				if (index<particle_count*0.5) {
				this.sex=0;
				this.color="#000";
				this.color2="#000";
				this.letter="C";		
				} else if (index<particle_count*0.75) {
				this.sex=1;
				this.color="#008";
				this.color2="#00f";
				this.letter="N";
				} else  {
				this.sex=1;
				this.color="#800";
				this.color2="#f00";
				this.letter="O";
				}
				index++;
		        this.move = function()
		        {
				this.x = this.x + (this.speedx*slow);
				this.y = this.y + (this.speedy*slow);
				if (this.x>W-radius) {this.speedx*=(-1);}
				if (this.x<radius) {this.speedx*=(-1);}	
				if (this.y>H-radius) {this.speedy*=(-1); this.y -= 1;}
				if (this.y<radius) {this.speedy*=(-1); }

				for (var j = 0; j < particle_count; j++)
				{ if (this.index!=j) {
				var part = particles[j],
				yd = part.y - this.y,
				xd = part.x - this.x,
				d2 = (xd * xd + yd * yd),
				d  = Math.sqrt(d2),
				gravitation = 1/d2;
				if ( d/adjust < 200 )
				{
				context.beginPath();
				context.globalAlpha = Math.pow((200 - d/adjust) / 200,0.8);
				context.globalCompositeOperation = 'destination-over';
				context.moveTo(this.x, this.y);
				if (this.sex!=part.sex) {
				context.lineWidth = lw;
				x[0]=(this.x+this.x+part.x)/3;
				x[1]=(this.x+part.x+part.x)/3;
				x[2]=part.x;
				y[0]=(this.y+this.y+part.y)/3;
				y[1]=(this.y+part.y+part.y)/3;
				y[2]=part.y;
				var dd2=d/6+radius*0.8;
				var dd3 = dd2/2;
				x[0] += Math.random()*dd2-dd3;
				x[1] += Math.random()*dd2-dd3;
				y[0] += Math.random()*dd2-dd3;
				y[1] += Math.random()*dd2-dd3;
				context.bezierCurveTo(x[0], y[0], x[1], y[1],x[2], y[2]);
				context.strokeStyle = this.color2;
				} else {
				if (this.letter!=part.letter) {
				context.strokeStyle = '#606';
				} else {
				context.strokeStyle = this.color2;	
				}
				context.lineWidth = lw*1.5;
				context.lineTo(part.x,part.y);
				}					
				context.stroke();
				context.closePath();
				if (d>(radius*2)) {
				if (this.sex==part.sex) {
				this.speedx -= xd*gravitation*10*slow;	
				this.speedy -= yd*gravitation*10*slow;	
				} else {
				this.speedx += xd*gravitation*15*slow;	
				this.speedy += yd*gravitation*15*slow;		
				}} else {
				this.speedx -= xd*gravitation*50*slow;	
				this.speedy -= yd*gravitation*50*slow;	
				}}
				var speed=this.speedx*this.speedx+this.speedy*this.speedy;
				this.speedx*=1-(speed/100000*slow);
				this.speedy*=1-(speed/100000*slow);			
				this.speedy+=0.001*slow;
				}}
				context.beginPath();
				context.globalCompositeOperation = 'source-over';
				context.fillStyle   = this.color2;
				context.globalAlpha = 1;
				context.arc(this.x, this.y, radius, 0, Math.PI*2, false);
				context.fill();
				context.fillStyle   = '#fff';
				context.font=(radius*2)+"px Arial";
				context.fillText(this.letter,this.x-(radius*0.77), this.y+radius*0.73);
				context.closePath();	
		        };
				}
				for (var i = 0; i < particle_count; i++)
				{
		        var particle = new Particle();
		        particles.push(particle);
				}

			function animate()
			{
		        context.clearRect(0, 0, canvas.width, canvas.height);
		        for (var i = 0; i < particle_count; i++)
				{
				particles[i].move();
				}
		        if (scrolltotop>0) {
				window.scrollTo(0,scrolltotop);
				scrolltotop=Math.floor(scrolltotop*0.95); 
				if (scrolltotop<0) {scrolltotop=0;}
		        }

		        requestAnimationFrame(animate);
			}
			function changespeed(x)
			{
				for (var i = 0; i < particle_count; i++)
				{
				if (x===0) {
				if (particles[i].y<H/15) {particles[i].speedy+=6;} else {particles[i].speedy+=-6;}
				if (particles[i].x<W/2) {particles[i].speedx+=6;} else {particles[i].speedx+=-6;}
				} else {
				if (particles[i].y<H/2) {particles[i].speedy+=6;} 
				particles[i].speedx/=2;
				}
				}
			}
			function initballs() {
				W = window.innerWidth;
				H = window.innerHeight;
				if (W>1200) {W=1200;}
				adjust = Math.sqrt((W*W)+(H*H))/Math.sqrt((1300*1300)+(1000*1000));
				radius = 12*(adjust/3+0.66);
				canvas.width = W;
				canvas.height = H;
				slow=0.6*(adjust/1.3+0.25);
				lw = 1.3*(adjust/4+0.8);
			}
			animate(); 
			var fixBackgroundSizeCover = function(event) {
		  		var bgImageWidth = 1062,
		    	bgImageHeight = 859,
		    	bgImageRatio = bgImageWidth / bgImageHeight,
		    	windowSizeRatio = window.innerWidth / window.innerHeight;
		  		if (bgImageRatio > windowSizeRatio) {
		    	document.getElementById("behind").style.backgroundSize = 'auto 100vh';
		  		} else {
		    	document.getElementById("behind").style.backgroundSize = '100vw auto';
		  		}
			};
			fixBackgroundSizeCover();
			
			window.addEventListener('resize', function(event){
			fixBackgroundSizeCover();
			initballs();
			for (var i = 0; i < particle_count; i++)
				{
				if (particles[i].x>W-radius*1.2) {particles[i].x=W-radius*1.2;}
				if (particles[i].y>H-radius*1.2) {particles[i].y=H-radius*1.2;}
				if (particles[i].x<radius*1.2) {particles[i].x=radius*1.2;}
				if (particles[i].y<radius*1.2) {particles[i].y=radius*1.2;}		
				}	
			var x=document.getElementById("description").style; x.height="0px"; x.opacity="0"; x.marginBottom="0px"; x.marginTop="0px"; 
			});
			function showmmc() {
			document.getElementById("mmc").style.width="100%"; 
			document.getElementById("cmc").style.width="0%";
			document.getElementById("a4CEC").style.width="0%";
			document.getElementById("a4CMC").style.width="0%";
			document.getElementById("a5FADB").style.width="0%";
			document.getElementById("fake5fadb").style.width="0%";
			document.getElementById("herbalBlend").style.width="0%";
			document.getElementById("hexenNeh").style.width="0%"; 
			document.getElementById("mmc").style.opacity="1"; 
			scrolltotop=window.scrollY||window.pageYOffset;	
			}
			function showcmc() {
			document.getElementById("cmc").style.width="100%"; 
			document.getElementById("mmc").style.width="0%";
			document.getElementById("a4CEC").style.width="0%";
			document.getElementById("a4CMC").style.width="0%";
			document.getElementById("a5FADB").style.width="0%";
			document.getElementById("fake5fadb").style.width="0%";
			document.getElementById("herbalBlend").style.width="0%";
			document.getElementById("hexenNeh").style.width="0%";  
			document.getElementById("cmc").style.opacity="1"; 
			scrolltotop=window.scrollY||window.pageYOffset;
			}
			function showa4CEC() {
			document.getElementById("a4CEC").style.width="100%"; 
			document.getElementById("cmc").style.width="0%";
			document.getElementById("a4CMC").style.width="0%";
			document.getElementById("a5FADB").style.width="0%";
			document.getElementById("fake5fadb").style.width="0%";
			document.getElementById("herbalBlend").style.width="0%";
			document.getElementById("hexenNeh").style.width="0%"; 
			document.getElementById("mmc").style.width="0%"; 
			document.getElementById("a4CEC").style.opacity="1"; 
			scrolltotop=window.scrollY||window.pageYOffset;
			}
			function showa4CMC() {
			document.getElementById("a4CMC").style.width="100%"; 
			document.getElementById("cmc").style.width="0%";
			document.getElementById("a4CEC").style.width="0%";
			document.getElementById("a5FADB").style.width="0%";
			document.getElementById("fake5fadb").style.width="0%";
			document.getElementById("herbalBlend").style.width="0%";
			document.getElementById("hexenNeh").style.width="0%"; 
			document.getElementById("mmc").style.width="0%"; 
			document.getElementById("a4CMC").style.opacity="1"; 
			scrolltotop=window.scrollY||window.pageYOffset;
			}
			function showa5FADB() {
			document.getElementById("a5FADB").style.width="100%"; 
			document.getElementById("cmc").style.width="0%";
			document.getElementById("a4CEC").style.width="0%";
			document.getElementById("a4CMC").style.width="0%";
			document.getElementById("fake5fadb").style.width="0%";
			document.getElementById("herbalBlend").style.width="0%";
			document.getElementById("hexenNeh").style.width="0%"; 
			document.getElementById("mmc").style.width="0%"; 
			document.getElementById("a5FADB").style.opacity="1"; 
			scrolltotop=window.scrollY||window.pageYOffset;
			}
			function showfake5fadb() {
			document.getElementById("fake5fadb").style.width="100%"; 
			document.getElementById("cmc").style.width="0%";
			document.getElementById("a4CEC").style.width="0%";
			document.getElementById("a4CMC").style.width="0%";
			document.getElementById("a5FADB").style.width="0%";
			document.getElementById("herbalBlend").style.width="0%";
			document.getElementById("hexenNeh").style.width="0%"; 
			document.getElementById("mmc").style.width="0%"; 
			document.getElementById("fake5fadb").style.opacity="1"; 
			scrolltotop=window.scrollY||window.pageYOffset;
			}
			function showherbalBlend() {
			document.getElementById("herbalBlend").style.width="100%"; 
			document.getElementById("cmc").style.width="0%";
			document.getElementById("a4CEC").style.width="0%";
			document.getElementById("a4CMC").style.width="0%";
			document.getElementById("a5FADB").style.width="0%";
			document.getElementById("fake5fadb").style.width="0%";
			document.getElementById("hexenNeh").style.width="0%"; 
			document.getElementById("mmc").style.width="0%"; 
			document.getElementById("herbalBlend").style.opacity="1"; 
			scrolltotop=window.scrollY||window.pageYOffset;
			}
			function showhexenNeh() {
			document.getElementById("hexenNeh").style.width="100%"; 
			document.getElementById("cmc").style.width="0%";
			document.getElementById("a4CEC").style.width="0%";
			document.getElementById("a4CMC").style.width="0%";
			document.getElementById("a5FADB").style.width="0%";
			document.getElementById("fake5fadb").style.width="0%";
			document.getElementById("herbalBlend").style.width="0%";
			document.getElementById("mmc").style.width="0%"; 
			document.getElementById("hexenNeh").style.opacity="1"; 
			scrolltotop=window.scrollY||window.pageYOffset;
			}
			function closeimg(x) {
			document.getElementById(x).style.width="0%"; 
			document.getElementById(x).style.opacity="0";
			}
			try {
		    var xmlgetmail = new XMLHttpRequest();
			} catch(e) {
			var xmlgetmail  = null;
			}
			function getmail(x,y) {	
		 	if (xmlgetmail && x) {
			xmlgetmail.open('GET', 'index.php?email='+x, true);
		    xmlgetmail.onreadystatechange = function () {
		        if (xmlgetmail.readyState == 4) {
		            var ergebnis = xmlgetmail.responseText;
					if (ergebnis) {
					if (ergebnis=="ok") {
					y.value=""; y.placeholder="email added"; y.style.backgroundColor="#afa"; y.blur();
					} else {
					y.style.backgroundColor="#faa";
					}
					}
				}
		    };
		    xmlgetmail.send(null);
			}}

			// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}