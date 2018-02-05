import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TheTeamPage } from './the-team';

@NgModule({
  declarations: [
    TheTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(TheTeamPage),
  ],
})
export class TheTeamPageModule {}
