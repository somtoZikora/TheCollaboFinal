import { Component, OnInit , Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-chat-home-page',
  templateUrl: './chat-home-page.component.html',
  styleUrls: ['./chat-home-page.component.css']
})
export class ChatHomePageComponent implements OnInit  {
      @Input() listOfGroupMembers: any;
      @Output() messageEvent = new EventEmitter<any>();

  ngOnInit() {}

  onSelectUser(listOfGroupMember):any{
    var emittedMessageFromChatHomePageComponent = {
      user: listOfGroupMember,
      message: 'hideChatHomePageComponentFromChatHomePageComponent'
    }
    //for (let listOfGroupMember of this.listOfGroupMembers) {
        //if (user == listOfGroupMember)
         return this.messageEvent.emit(emittedMessageFromChatHomePageComponent);
  //  }
  }

}
