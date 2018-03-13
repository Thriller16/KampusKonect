import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import firebase from 'firebase';
/*
  Generated class for the ImghandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImghandlerProvider {

  nativepath: any;
  firestore = firebase.storage();
  imgsource: any;
   

  constructor(public filechooser: FileChooser) {
    console.log('Hello ImghandlerProvider Provider');
  }

  uploadimage(){
    var promise = new Promise((resolve, reject) =>{
      this.filechooser.open().then((url) =>{
        (<any>window).FilePath.resolveNativePath(url, (result) =>{
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) =>{
            res.file((resFile) =>{
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) =>{
                var imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'});
                var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                imageStore.put(imgBlob).then((res) =>{
                  // alert('Upload success');
                  this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) =>{
                    resolve(url);
                  }).catch((err) =>{
                    reject(err);
                  });
                }).catch((err) =>{
                  // alert('Upload failed' + err)  ;
                  reject(err);
                })
              }
            })
          })
        })
      })
    })
    return promise;
  }


  picmsgstore(){
    var promise = new Promise((resolve, reject) =>{
      this.filechooser.open().then((url) =>{
        (<any>window).FilePath.resolveNativePath(url, (result) =>{
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) =>{
            res.file((resFile) =>{
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) =>{
                var imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'});
                
                var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg');
                
                alert("Imagestore is putting blob");

                imageStore.put(imgBlob).then((res) =>{
                  
                  // alert('Upload success');
                  this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg').getDownloadURL().then((url) =>{
                    resolve(url);
                  }).catch((err) =>{
                    reject(err);
                  });
                }).catch((err) =>{
                  // alert('Upload failed' + err)  ;
                  reject(err);
                })
              }
            })
          })
        })
      })
    })
    return promise;
  }
}
