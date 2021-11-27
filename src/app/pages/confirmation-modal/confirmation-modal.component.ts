import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  
  constructor(private activeModal: NgbActiveModal) { }

  @Input() deleteType!: string;
  @Input() name!: string;
  @Output() optionSelected = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  buttonClick(userResponse: boolean) {
    this.optionSelected.emit(userResponse);
  }

}
