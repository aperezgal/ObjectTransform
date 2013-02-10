/**
 * Created with JetBrains WebStorm.
 * User: Alberto Perez
 * Date: 10/02/13
 * Time: 16:41
 * To change this template use File | Settings | File Templates.
 */

/** @namespace */
var OBJECT_TRANSFORM	= OBJECT_TRANSFORM 		|| {};

OBJECT_TRANSFORM.ObjectTransform = function ( object, domElement ) {

    this.object = object;

    this.domElement = ( domElement !== undefined ) ? domElement : document;

    if ( this.domElement !== document ) {
        this.domElement.setAttribute( 'tabindex', -1 );
    }


    //listen Mouse Events
    this.domElement.addEventListener( 'mousemove', bind( this, this.onMouseMove ), false );
    this.domElement.addEventListener( 'mousedown', bind( this, this.onMouseDown ), false );
    this.domElement.addEventListener( 'mouseup', bind( this, this.onMouseUp ), false );

    function bind( scope, fn ) {

        return function () {

            fn.apply( scope, arguments );

        };

    };


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

        console.log('Mouse Up');

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


    /**
    * To stop listening of the keyboard events
    */
    OBJECT_TRANSFORM.ObjectTransform.prototype.destroy	= function(){
        // unbind keyEvents
       console.log("destroy");
    }

