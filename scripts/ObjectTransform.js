/**
 * Created with JetBrains WebStorm.
 * User: Alberto Perez
 * Date: 10/02/13
 * Time: 16:41
 * To change this template use File | Settings | File Templates.
 */

/** @namespace */
var OBJECT_TRANSFORM	= OBJECT_TRANSFORM 		|| {};


var widthObj, heightObj, imageSource, imageWidth, imageHeight;
var xPos, yPos;






OBJECT_TRANSFORM.ObjectTransform = function ( object, domElement ) {

    this.object = object;

    this.domElement = ( domElement !== undefined ) ? domElement : document;

    if ( this.domElement !== document ) {
        this.domElement.setAttribute( 'tabindex', -1 );
    }


    //listen Mouse Events
    /*this.domElement.addEventListener( 'mousemove', bind( this, this.onMouseMove ), false );
    this.domElement.addEventListener( 'mousedown', bind( this, this.onMouseDown ), false );
    this.domElement.addEventListener( 'mouseup', bind( this, this.onMouseUp ), false );

    function bind( scope, fn ) {

        return function () {

            fn.apply( scope, arguments );

        };

    };*/


};

    OBJECT_TRANSFORM.ObjectTransform.prototype.onMouseDown = function ( event ) {

        if ( this.domElement !== document ) {
            this.domElement.focus();
        }

        event.preventDefault();
        event.stopPropagation();

        console.log('Mouse Down');

    };

    OBJECT_TRANSFORM.ObjectTransform.prototype.onMouseUp = function ( event ) {
        event.preventDefault();
        event.stopPropagation();

       

    };

    OBJECT_TRANSFORM.ObjectTransform.prototype.onMouseMove = function ( event ) {
        console.log('Mouse Move');
       
    };


    OBJECT_TRANSFORM.ObjectTransform.prototype.update = function( ) {
        console.log('Update!!');
    }

    OBJECT_TRANSFORM.ObjectTransform.prototype.check = function( ) {
        console.log('Check!!');
    }

    OBJECT_TRANSFORM.ObjectTransform.prototype.initialize = function( ) {
        console.log('Initialize components properties!!');

        

        var sources = {
            banner: this.imageSource
        };
        loadImages(sources, initStage);


    }

    function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        }
      }


    function addAnchor(group, x, y, name) {
        var stage = group.getStage();
        var layer = group.getLayer();

        var anchor = new Kinetic.Circle({
          x: x,
          y: y,
          stroke: '#666',
          fill: '#ddd',
          strokeWidth: 2,
          radius: 6,
          name: name,
          draggable: true,
          dragOnTop: false
        });

        anchor.on('dragmove', function() {
          update(this);
          layer.draw();
        });
        anchor.on('mousedown touchstart', function() {
          group.setDraggable(false);
          this.moveToTop();
        });
        anchor.on('dragend', function() {
          group.setDraggable(true);
          layer.draw();
        });
        // add hover styling
        anchor.on('mouseover', function() {
          var layer = this.getLayer();
          document.body.style.cursor = 'pointer';
          this.setStrokeWidth(4);
          layer.draw();
        });
        anchor.on('mouseout', function() {
          var layer = this.getLayer();
          document.body.style.cursor = 'default';
          this.setStrokeWidth(2);
          layer.draw();
        });

        group.add(anchor);
    }


    function update(activeAnchor) {
        var group = activeAnchor.getParent();

        var topLeft = group.get('.topLeft')[0];
        var topRight = group.get('.topRight')[0];
        var bottomRight = group.get('.bottomRight')[0];
        var bottomLeft = group.get('.bottomLeft')[0];
        var image = group.get('.image')[0];

        var anchorX = activeAnchor.getX();
        var anchorY = activeAnchor.getY();

        // update anchor positions
        switch (activeAnchor.getName()) {
          case 'topLeft':
            topRight.setY(anchorY);
            bottomLeft.setX(anchorX);
            break;
          case 'topRight':
            topLeft.setY(anchorY);
            bottomRight.setX(anchorX);
            break;           
          case 'bottomRight':
            bottomLeft.setY(anchorY);
            topRight.setX(anchorX); 
            break;
          case 'bottomLeft':
            bottomRight.setY(anchorY);
            topLeft.setX(anchorX); 
            break;

        }

        image.setPosition(topLeft.getPosition());

        var width = topRight.getX() - topLeft.getX();
        var height = bottomLeft.getY() - topLeft.getY();
        if(width && height) {
          image.setSize(width, height);
        }
      }

    function initStage(images) {
        var stage = new Kinetic.Stage({
          container: this.controls.domElement,
          id: 'canvazito',
          width: this.controls.widthObj,
          height: this.controls.heightObj
        });
        var bannerGroup = new Kinetic.Group({
          x: this.controls.xPos,
          y: this.controls.yPos,
          draggable: true
        });
      
        var layer = new Kinetic.Layer();

        /*
         * go ahead and add the groups
         * to the layer and the layer to the
         * stage so that the groups have knowledge
         * of its layer and stage
         */
        layer.add(bannerGroup);

        stage.add(layer);

        // darth vader
        var bannerImg = new Kinetic.Image({
          x: 0,
          y: 0,
          image: images.banner,
          width: this.controls.imageWidth,
          height: this.controls.imageHeight,
          name: 'image'
        });

        bannerGroup.add(bannerImg);
        addAnchor(bannerGroup, 0, 0, 'topLeft');
        addAnchor(bannerGroup, this.controls.imageWidth, 0, 'topRight');
        addAnchor(bannerGroup, this.controls.imageWidth, this.controls.imageHeight, 'bottomRight');
        addAnchor(bannerGroup, 0, this.controls.imageHeight, 'bottomLeft');

        bannerGroup.on('dragstart', function() {
          this.moveToTop();
        });
        
        stage.draw();



      }



    /**
    * To stop listening of the keyboard events
    */
    OBJECT_TRANSFORM.ObjectTransform.prototype.destroy	= function(){
        // unbind keyEvents
       console.log("destroy");


    }

