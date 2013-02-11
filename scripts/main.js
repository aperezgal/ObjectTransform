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
    		document.getElementById( 'mainContainer' ));
		controls.sourceImage = 'assets/banner1.jpg';
		controls.points = [[175, 33], [336, 71], [335, 197], [175, 198]];
		controls.showPoints = true;
		controls.initialize();
    
}