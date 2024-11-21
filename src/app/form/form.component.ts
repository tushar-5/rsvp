import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  rsvpForm: FormGroup = new FormGroup({
    UsrName: new FormControl("",[Validators.required, Validators.minLength(3)]),
    UsrEmail: new FormControl(""),
    UsrPhone: new FormControl(""),
    UsrAccount: new FormControl(""),
    UsrAttending: new FormControl(""),
    EntityName: new FormControl("UsrRSVP")
  })

  formValue: any;
  formSubmitted = false;

  constructor(private http: HttpClient) {

  }

  onSubmit() {
    console.log('Form submission', this.formValue)
    if (this.rsvpForm.value !== null) {
      this.formValue = this.rsvpForm.value;
      this.http.post("https://webhooks.creatio.com/webhooks/2bb43b70-a261-4f99-bb0c-417bc5cdfd78", this.formValue, { headers: { 'Content-Type': 'application/json' } }).subscribe((res: any) => {
        if (res==null) {
          this.formSubmitted = true;
        } else {
          alert("Application submission failed")
        }
      })
    }
  } 

}
