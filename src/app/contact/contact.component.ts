import { Component, OnInit } from '@angular/core';
import {ContactUsService} from '../_services/contact-us.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private _contactUsService: ContactUsService) { }

  submitted = false;
  messageBody = {
  name: '',
  email: '',
  subject: '',
    message: '',
};
  ngOnInit() {
  }

  onSubmit() {
   this._contactUsService.sendMail(this.messageBody).subscribe(data => {
     // this.router.navigate(['/contact'])
     // console.log(data.sent)
     this.submitted = data.sent;
   });
  }
}
