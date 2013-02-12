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
OBJECT_TRANSFORM.ObjectTransform = function ( object, domElement, objectList) {

    this.object = object;

    this.domElement = ( domElement !== undefined ) ? domElement : document;

    if ( this.domElement !== document ) {
        this.domElement.setAttribute( 'tabindex', -1 );
    }

    this.objectList = objectList;
};


/* -------------------------------------------------------------------
* prototypes
* ----------------------------------------------------------------- */
    var proto = OBJECT_TRANSFORM.ObjectTransform.prototype;

    proto.object;
    proto.objectList;
    proto.dotElement;
    proto.showPoints = false;


/* -------------------------------------------------------------------
* functions
* ----------------------------------------------------------------- */


    proto.initialize = function( ) {
        console.log('Initialize components properties!!');

        //get Canvas instance
        var objectList = this.objectList;

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
        var op2 = null;
        
        var dotWidth = this.domElement.clientWidth;
        var dotHeight = this.domElement.clientHeight;


        //create the elements
        for( var i=0; i<this.objectList.length; i++ ) {
            var elem = this.objectList[i];

            if (elem.typeElement == "image"){
                var img = new Image();
                img.src = elem.sourceElement; 

                (function(elemento) {
                    img.onload = function() {
                        elemento.op = new html5jp.perspective(ctx1, this, null);
                        elemento.op.draw(elemento.points);
                        //prepare_lines(ctx2, points);
                        draw_canvas(ctx, ctx1, ctx2);
                    };
                })(elem);
                
            }

            if (elem.typeElement == "video"){
                var video = elem.object;

                (function(elemento, videoPlay) {
                    videoPlay.addEventListener("play", function() {
                        timerCallback(videoPlay, ctx, ctx1, ctx2, elemento);
                    }, false);
                })(elem, video);

               
                video.play();
            }

        }

        var drag = null;
        var actualElement = "";

        if (this.showPoints == true){
            canvas.addEventListener("mousedown", function(event) {
                event.preventDefault();
                var p = get_mouse_position(event);


                //TODO: for element in elements
                for( var j=0; j<objectList.length; j++ ) {
                    for( var i=0; i<4; i++ ) {
                        var x = objectList[j].points[i][0];
                        var y = objectList[j].points[i][1];
                        if( p.x < x + 10 && p.x > x - 10 && p.y < y + 10 && p.y > y - 10 ) {
                            drag = i;
                            actualElement = objectList[j].alias;
                            console.log ("Mouse Down: " + actualElement);

                            break;
                        }
                    }
                }
            }, false);



            canvas.addEventListener("mousemove", function(event) {
                event.preventDefault();
                if(drag == null) { 
                    return; 
                }

                //TODO: get the element, and prepare to paint
                var elem;
                for( var i=0; i<objectList.length; i++ ) {
                        if (objectList[i].alias == actualElement){
                            elem = objectList[i];
                            console.log ("Mouse Move elem: " + elem);
                            break;
                        }
                }

                var p = get_mouse_position(event);
                elem.points[drag][0] = p.x;
                elem.points[drag][1] = p.y;
                prepare_lines(ctx2, elem.points, true);
                draw_canvas(ctx, ctx1, ctx2);
                
            }, false);

            canvas.addEventListener("mouseup", function(event) {
                event.preventDefault();
                if(drag == null) { 
                    return; 
                }

                var elem;
                for( var i=0; i<objectList.length; i++ ) {
                        if (objectList[i].alias == actualElement){
                            elem = objectList[i];
                             console.log ("Mouse Up elem: " + elem);
                            break; 
                        }
                }

                //TODO: get the element, and prepare to paint
               
                var p = get_mouse_position(event);
                elem.points[drag][0] = p.x;
                elem.points[drag][1] = p.y;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx1.clearRect(0, 0, canvas.width, canvas.height);
              
                

                //TODO : for every point
                for( var i=0; i<objectList.length; i++ ) {
                    objectList[i].op.draw(objectList[i].points);
                }
                
                
                prepare_lines(ctx2, elem.points);
               

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
                
                var elem;
                for( var i=0; i<objectList.length; i++ ) {
                        if (objectList[i].alias == actualElement){
                            elem = objectList[i];
                             console.log (elem);
                             break;
                        }
                }
            }, false);
        }
        

        function timerCallback(video, ctx, ctx1, ctx2, element) {
          if (video.paused ||video.ended) {
            return;
          }
          if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
            computeFrame(video, ctx, ctx1, ctx2, element);
          }
          var self = this;
          setTimeout(function () {
              timerCallback(video, ctx, ctx1, ctx2, element);
            }, 0);
        }


        function computeFrame(video, ctx, ctx1, ctx2, element) {

            element.op = new html5jp.perspective(ctx1, null, video);
            element.op.draw(element.points);
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