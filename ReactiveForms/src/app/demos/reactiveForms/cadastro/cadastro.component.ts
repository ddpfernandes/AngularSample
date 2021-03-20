import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgBrazilValidators } from "ng-brazil";
import { Usuario } from "src/app/demos/reactiveForms/cadastro/models/usuario";
import { utilsBr } from "js-brasil";
import { CustomValidators } from "ng2-validation";
import {
  DisplayMessage,
  GenericValidator,
  ValidationMessages,
} from "./generic-form-validation";
import { fromEvent, merge, Observable } from "rxjs";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styles: [],
})
export class CadastroComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = "";
  MASKS = utilsBr.MASKS;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder) {
    this.validationMessages = {
      nome: {
        required: "O Nome é requerido",
        minlength: "O Nome deve ter mais de 2 caracteres",
        maxlength: "A Nome deve menos que 20 caracteres"
      },
      cpf: {
        required: "O Cpf é requerido",
        cpf: "CPF em formato inválido"
      },
      email: {
        required: "Informe o e-mail",
        email: "Email inválido"
      },
      senha: {
        required: "Informe a senha",
        rangeLength: "A senha deve possuir entre 6 a 15 caracteres"
      },
      senhaConfirmacao: {
        required: "Informe a senha novamente",
        rangeLength: "A senha deve possuir entre 6 a 15 caracteres",
        equalTo: "As senhas não conferem"
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.mapearFormPorFormBuilder();
    // this.mapearFormPorFormGroup();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, "blur")
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }

  mapearFormPorFormBuilder() {
    let senha = new FormControl("", [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
    ]);
    let senhaConfirmacao = new FormControl("", [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
      CustomValidators.equalTo(senha),
    ]);

    this.cadastroForm = this.fb.group({
      nome: [ "", [Validators.required, Validators.minLength(2), Validators.maxLength(150)] ],
      cpf: ["", [Validators.required, NgBrazilValidators.cpf]],
      email: ["", [Validators.required, Validators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirmacao,
    });
  }

  mapearFormPorFormGroup() {
    this.cadastroForm = new FormGroup({
      nome: new FormControl(""),
      cpf: new FormControl(""),
      email: new FormControl(""),
      senha: new FormControl(""),
      senhaConfirmacao: new FormControl(""),
    });
  }

  adicionarUsuario() {
    // let x = this.cadastroForm.value;
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.formResult = JSON.stringify(this.cadastroForm.value);
    } else {
      this.formResult = "Não submeteu!";
    }
  }
}
