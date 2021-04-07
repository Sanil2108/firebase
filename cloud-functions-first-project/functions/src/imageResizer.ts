// import * as sharp from 'sharp';
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp();

const BUCKET_NAME = 'cloud-functions-first-project.appspot.com';

const func = functions.storage.object().onFinalize((metadata, context) => {
  // resizeImage(metadata.name, );
  console.log(JSON.stringify(metadata), JSON.stringify(context));
})

const resizeImage = async (imageName, imageBuffer, width, height) => {
  // return sharp(imageBuffer).resize(width, height).toBuffer();
}

const uploadToImgur = async () => {

}

export default func;

