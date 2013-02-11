/**
 * Created with JetBrains WebStorm.
 * User: Alberto Perez
 * Date: 10/02/13
 * Time: 17:12
 * To change this template use File | Settings | File Templates.
 */


//init Controls to an image

var controls;

controls = new OBJECT_TRANSFORM.ObjectTransform(document.getElementById( 'banner' ),
    document.getElementById( 'mainContainer' ));
controls.widthObj = 992;
controls.heightObj = 486;
controls.imageWidth = 150;
controls.imageHeight = 250;
controls.xPos = 300;
controls.yPos = 100;
controls.imageSource = "assets/banner1.jpg";
controls.initialize();

