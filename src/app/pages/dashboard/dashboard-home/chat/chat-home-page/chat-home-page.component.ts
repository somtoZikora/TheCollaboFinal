import { Component, OnInit , Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-chat-home-page',
  templateUrl: './chat-home-page.component.html',
  styleUrls: ['./chat-home-page.component.css']
})
export class ChatHomePageComponent implements OnInit  {
      @Input() listOfGroupMembers: any;
      @Output() messageEvent = new EventEmitter<any>();

  ngOnInit() {
    console.log(this.listOfGroupMembers)
  }

  onSelectUser():any{
    /*var user = localStorage.getItem("User").username;
    for (let listOfGroupMember of listOfGroupMembers) {
        if (user == listOfGroupMember)
         return this.messageEvent.emit('hideChatHomePageComponentFromChatHomePageComponent');
    }*/
  }

}
