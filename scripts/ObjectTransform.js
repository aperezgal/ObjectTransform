/**
 * Created with JetBrains WebStorm.
 * User: Alberto Perez
 * Date: 10/02/13
 * Time: 16:41
 * To change this template use File | Settings | File Templates.
 */

/** @namespace */
/* -------------------------------------------------------------------
* define objects (name space) for this library.
* ----------------------------------------------------------------- */
if( typeof OBJECT_TRANSFORM == 'undefined' ) {
    OBJECT_TRANSFORM = new Object();
}

(function () {



/* -------------------------------------------------------------------
* constructor
* ----------------------------------------------------------------- */
OBJECT_TRANSFORM.ObjectTransform = function ( object, domElement, video) {

    this.object = object;

    this.domElement = ( domElement !== undefined ) ? domElement : document;

    if ( this.domElement !== document ) {
        this.domElement.setAttribute( 'tabindex', -1 );
    }

    this.video = video;

    //listen Mouse Events
   /* this.domElement.addEventListener( 'mousemove', bind( this, this.onMouseMove ), false );
    this.domElement.addEventListener( 'mousedown', bind( this, this.onMouseDown ), false );
    this.domElement.addEventListener( 'mouseup', bind( this, this.onMouseUp ), false );

    function bind( scope, fn ) {

        return function () {

            fn.apply( scope, arguments );

        };

    };*/


};


/* -------------------------------------------------------------------
* prototypes
* ----------------------------------------------------------------- */
var proto = OBJECT_TRANSFORM.ObjectTransform.prototype;

proto.points = []; 
proto.sourceElement = "";
proto.object;
proto.video;
proto.dotElement;
proto.typeElement = "image";
proto.showPoints = false;


    proto.onMouseDown = function ( event ) {

        if ( this.domElement !== document ) {
            this.domElement.focus();
        }

        event.preventDefault();
        event.stopPropagation();

        console.log('Mouse Down');

    };

    proto.onMouseUp = function ( event ) {
        event.preventDefault();
        event.stopPropagation();

       

    };

    proto.onMouseMove = function ( event ) {
        console.log('Mouse Move');
       
    };


    proto.update = function( ) {
        console.log('Update!!');
    }

    proto.check = function( ) {
        console.log('Check!!');
    }




    proto.initialize = function( ) {
        console.log('Initialize components properties!!');

       

        var canvas = this.object;
        var ctx = canvas.getContext('2d');
        
        var canvas1 = document.createElement('canvas');
        canvas1.width = canvas.width;
        canvas1.height = canvas.height;
        var ctx1 = canvas1.getContext('2d');
        
        var canvas2 = document.createElement('canvas');
        canvas2.width = canvas.width;
        canvas2.height = canvas.height;
        var ctx2 = canvas2.getContext('2d');


        var op = null;
        
        
        var dotWidth = this.domElement.clientWidth;
        var dotHeight = this.domElement.clientHeight;
        var points = this.points;

        if (this.typeElement == "image"){
            var img = new Image();
            img.src = this.sourceElement; 

            img.onload = function() {
                op = new html5jp.perspective(ctx1, img, null);
                op.draw(points);
                //prepare_lines(ctx2, points);
                draw_canvas(ctx, ctx1, ctx2);
            };
        }

        if (this.typeElement == "video"){
            var video = this.video;
            video.setAttribute('scr', this.sourceElement);


            var self = this;
            video.addEventListener("play", function() {
                timerCallback(video, ctx, ctx1, ctx2, points);
            }, false);
            video.play();
        }




  

        var drag = null;
        if (this.showPoints == true){
            canvas.addEventListener("mousedown", function(event) {
                event.preventDefault();
                var p = get_mouse_position(event);
                for( var i=0; i<4; i++ ) {
                    var x = points[i][0];
                    var y = points[i][1];
                    if( p.x < x + 10 && p.x > x - 10 && p.y < y + 10 && p.y > y - 10 ) {
                        drag = i;
                        break;
                    }
                }
               
            }, false);

            canvas.addEventListener("mousemove", function(event) {
                event.preventDefault();
                if(drag == null) { 
                    return; 
                }
                var p = get_mouse_position(event);
                points[drag][0] = p.x;
                points[drag][1] = p.y;
                prepare_lines(ctx2, points, true);
                draw_canvas(ctx, ctx1, ctx2);
            }, false);

            canvas.addEventListener("mouseup", function(event) {
                event.preventDefault();
                if(drag == null) { 
                    return; 
                }
                var p = get_mouse_position(event);
                points[drag][0] = p.x;
                points[drag][1] = p.y;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx1.clearRect(0, 0, canvas.width, canvas.height);
                var s = (new Date()).getTime();
                op.draw(points);
                //document.getElementById("ms").innerHTML = ( (new Date()).getTime() - s );
                prepare_lines(ctx2, points);
                draw_canvas(ctx, ctx1, ctx2);
                drag = null;
            }, false);


            canvas.addEventListener("mouseout", function(event) {
                event.preventDefault();
                drag = null;
            }, false);

            canvas.addEventListener("mouseenter", function(event) {
                event.preventDefault();
                drag = null;
            }, false);


            canvas.addEventListener("dblclick", function(event) {
                event.preventDefault();
                
                console.log(points);
            }, false);
        }
        

        function timerCallback(video, ctx, ctx1, ctx2, points) {
          if (video.paused ||video.ended) {
            return;
          }
          if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
            computeFrame(video, ctx, ctx1, ctx2, points);
          }
          var self = this;
          setTimeout(function () {
              timerCallback(video, ctx, ctx1, ctx2, points);
            }, 0);
        }


        function computeFrame(video, ctx, ctx1, ctx2, points) {

            op = new html5jp.perspective(ctx1, null, video);
            op.draw(points);
            //prepare_lines(ctx2, points);
            draw_canvas(ctx, ctx1, ctx2);

            
          }


        function prepare_lines(ctx, p, with_line) {
            ctx.save();
            //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.clearRect(0, 0, dotWidth, dotHeight);
            //
            if( with_line == true ) {
                ctx.beginPath();
                ctx.moveTo(p[0][0], p[0][1]);
                for( var i=1; i<4; i++ ) {
                    ctx.lineTo(p[i][0], p[i][1]);
                }
                ctx.closePath();
                ctx.strokeStyle = "blue";
                ctx.stroke();
            }
            //
            ctx.fillStyle = "blue";
            for( var i=0; i<4; i++ ) {
                ctx.beginPath();
                ctx.arc(p[i][0], p[i][1], 8, 0, Math.PI*2, true);
                ctx.fill();
               
            }
            //
            ctx.restore();
        }


        function draw_canvas(ctx, ctx1, ctx2) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(ctx1.canvas, 0, 0);
            ctx.drawImage(ctx2.canvas, 0, 0);
        }

        function get_mouse_position(event) {
            var rect = event.target.getBoundingClientRect() ;
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }
    }





    /**
    * To stop listening of the keyboard events
    */
    proto.destroy	= function(){
        // unbind keyEvents
       console.log("destroy");


    }

})();