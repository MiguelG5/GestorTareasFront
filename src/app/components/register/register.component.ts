import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/Login.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide = true;
  validaciones = {
    username: [
      { type: 'required', message: 'El nombre de usuario es requerido' },
    ],
    email: [
      { type: 'required', message: 'El correo electrónico es requerido' },
      { type: 'email', message: 'Este no es un correo valido' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es requerida' },
      {
        type: 'pattern',
        message:
          'Este campo debe contener mayusculas, minusculas, numeros y caracteres especiales',
      },
      { type: 'minlength', message: 'El mínimo de caracteres es 8' },
    ],
    repeatPassword: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden' },
    ],
    aceptarTerminos: [
      { type: 'required', message: 'Debes aceptar los Términos y Condiciones' },
    ],
  };

  registerForm: FormGroup = this.fb.group(
    {
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          ),
          Validators.minLength(8),
        ],
      ],
      repeatPassword: ['', Validators.required],
      aceptarTerminos: [false, [Validators.requiredTrue]],
    },
    {
      validator: this.passwordMatchValidator('password', 'repeatPassword'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  register() {
    if (!this.registerForm.valid) {
      this.markAllAsDirty();
      return;
    }

    let rol: string = 'user';
    const email: string = this.registerForm.get('email')?.value;

    if (email.endsWith('hotmail.com') || email.endsWith('outlook.com')) {
      rol = 'admin';
    }

    let data: RegisterRequest = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      role: rol,
    };

    this.loginService.register(data).subscribe(
      (resp) => {
        Swal.fire({
          title: '!Cuenta creada con exito¡',
          text: resp.message,
          icon: 'success',
          backdrop: false,
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          this.router.navigate(['/login']);
        });
        console.log(resp.message);
      },
      (err) => {
        Swal.fire({
          title: 'Ocurrió un error en el sistema',
          text: err.error.message,
          icon: 'error',
          backdrop: false,
          timer: 2000,
          showConfirmButton: false,
        });
        console.error(err);
      }
    );
  }

  passwordMatchValidator(
    controlName: string,
    matchingControlName: string
  ): ValidationErrors | null {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.value == null || matchingControl?.value == '') {
        matchingControl?.setErrors({ required: true });
        return { required: true };
      } else if (
        control &&
        matchingControl &&
        control.value !== matchingControl.value
      ) {
        matchingControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword');
  }

  get aceptarTerminos() {
    return this.registerForm.get('aceptarTerminos');
  }

  markAllAsDirty() {
    Object.keys(this.registerForm.controls).forEach((controlName) => {
      const control = this.registerForm.get(controlName);
      control?.markAsTouched();
    });
  }
}
