/**
 * Created with JetBrains WebStorm.
 * User: Alberto Perez
 * Date: 10/02/13
 * Time: 17:12
 * To change this template use File | Settings | File Templates.
 */


//init Controls to an image

var controls, controls2;





	window.onload = function(){
		


		controls = new OBJECT_TRANSFORM.ObjectTransform(document.getElementById( 'imgContainer' ),
    		document.getElementById( 'mainContainer' ), document.getElementById( 'video1' )); //
		//controls.sourceElement = 'assets/banner1.jpg';
		controls.sourceElement = 'assets/video1.mp4';
		controls.points = [[175, 33], [336, 71], [335, 197], [175, 198]];
		controls.showPoints = true;
		controls.typeElement = "video"; //image
		//controls.typeElement = "image";
		controls.initialize();
    
}