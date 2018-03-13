import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewhubPage } from './newhub';

@NgModule({
  declarations: [
    NewhubPage,
  ],
  imports: [
    IonicPageModule.forChild(NewhubPage),
  ],
})
export class NewhubPageModule {}
