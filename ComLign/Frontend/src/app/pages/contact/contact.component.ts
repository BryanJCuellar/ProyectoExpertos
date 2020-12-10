import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formularioContacto = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    asunto: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    mensaje: new FormControl('', [Validators.required, Validators.maxLength(1000)])
  });

  constructor() { }

  ngOnInit(): void {
  }

  get email() {
    return this.formularioContacto.get('email');
  }
  get asunto() {
    return this.formularioContacto.get('asunto');
  }
  get mensaje() {
    return this.formularioContacto.get('mensaje');
  }

  guardarCorreo(){
    
  }

}
