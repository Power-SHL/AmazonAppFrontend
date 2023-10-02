import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RequestComponent } from './request/request.component'; 
import { HttpClientModule } from '@angular/common/http';
import { VerifyComponent } from './verify/verify.component';
import { UsernameService } from './services/username.service';
import { AddfriendrequestComponent } from './addfriendrequest/addfriendrequest.component';
@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    SidebarComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    EditProfileModalComponent,
    RequestComponent,
    VerifyComponent,
    AddfriendrequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UsernameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
