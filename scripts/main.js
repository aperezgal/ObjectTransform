/**
 * Created with JetBrains WebStorm.
 * User: Alberto Perez
 * Date: 10/02/13
 * Time: 17:12
 * To change this template use File | Settings | File Templates.
 */


//init Controls to an image

var controls;

	window.onload = function(){
		


		var objectList = [];

		var image1, image2, video;

		image1 = new Object();
		image1.sourceElement = "assets/banner1.jpg";
		image1.points = [[175, 33], [336, 71], [335, 197], [175, 198]];
		image1.typeElement = "image";
		image1.alias = "leftBanner";
		image1.op = null;

		objectList.push(image1);

		image2 = new Object();
		image2.sourceElement = "assets/banner1.jpg";
		image2.points = [[413, 82], [491, 77], [489, 195], [415, 194]];
		image2.typeElement = "image";
		image2.alias = "rightBanner";
		image2.op = null;

		objectList.push(image2);

		
		video = new Object();
		video.object = document.getElementById( 'video1' );
		video.points = [[644, 82], [804, 75], [805, 161], [643, 161]];
		video.typeElement = "video";
		video.alias = "rightVideo";
		video.op = null;

		objectList.push(video);



		controls = new OBJECT_TRANSFORM.ObjectTransform(document.getElementById( 'imgContainer' ),
    		document.getElementById( 'mainContainer' ), objectList); //
		controls.showPoints = true;
		controls.initialize();
    
}