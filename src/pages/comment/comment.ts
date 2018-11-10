import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  addcomment: FormGroup;
  myDate: string

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, 
    private formBuilder: FormBuilder ) {
      this.addcomment = this.formBuilder.group({
        author: '',
        rating: 0,
        comment: ['', Validators.required],
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  closeModal() {
    console.log(this.addcomment.value);
    this.navCtrl.pop();
}

onSubmit() {
  this.myDate= new Date().toISOString();
  const data1 = this.addcomment.value
  const data = {
    author:data1.author,
    comment:data1.comment,
    date:new Date().toISOString(),
    rating:data1.rating
  }
  console.log(data);
  this.viewCtrl.dismiss(data);
}

}
