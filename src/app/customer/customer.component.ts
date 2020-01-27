import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { element } from 'protractor';
import { debounceTime } from 'rxjs/operators';


function ratingRange(rating:AbstractControl):{[key:string]:boolean} | null{

  
  if(rating.value!=null&&(isNaN(rating.value)||rating.value<1||rating.value>5)){
    console.log(rating.value);
    return {'myValidator':true};
  }
  return null;
}


function validateConfirmEmail(emailGroup:AbstractControl):{[key:string]:boolean} | null{

  const email=emailGroup.get('email');
  
  const confirmEmail=emailGroup.get('confirmEmail');

  

  if(email.touched&&confirmEmail.touched&& email!=null&&confirmEmail!=null&&email.value!==confirmEmail.value){
    
    return {'match':true};
  }
  
  return null;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm:FormGroup;
  emailMessage:string;

  validationMessages={
    required:'email is required',
    email:'enter a valid format'
  }

  constructor(private fb:FormBuilder) { }

  get addresses():FormArray{
   return  <FormArray>this.customerForm.get('addresses');
  }

  ngOnInit() {
    this.customerForm=this.fb.group({
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:['',[Validators.required,Validators.maxLength(50)]],
      emailGroup:this.fb.group({
        email:['',[Validators.required,Validators.email]],
        confirmEmail:['',[Validators.required,Validators.email]]
      },{validator:validateConfirmEmail}),
      phone:[''],
      notification:['email'],
      rating:[null,ratingRange],
      sendCatalog:true,
      addresses:this.fb.array([this.buildAddress()]) ,
      
    });

    this.customerForm.get('notification').valueChanges.subscribe(
      value=>{this.validateNotification(value)}
    );

    const emailControl=this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(debounceTime(100)).subscribe(
      value=>{this.setMessage(emailControl)}
    );
  }


  buildAddress():FormGroup{
    return this.fb.group({
      addressType:'home',
      street1:'',
      street2:'',
      city:'',
      state:'',
      zip:''
    });
  }


  addAddress(){
    this.addresses.push(this.buildAddress());
  }

  setMessage(emailControl: AbstractControl) :void{
   console.log(emailControl.value);
    this.emailMessage='';
    if((emailControl.touched||emailControl.dirty)&&emailControl.errors){
      this.emailMessage=Object.keys(emailControl.errors).map(key=>this.validationMessages[key]).join(' ');
    }
  }


  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      emailGroup: { email: 'jack@torchwood.com' }
    });
  
  }

  save(){
    
  }

  validateNotification(notificationType:string):void{
    console.log(notificationType);
    const x=this.customerForm.get('phone');
     if(notificationType==='phone'){
      x.setValidators(Validators.required);
    }else{
       x.clearValidators();
    }
    x.updateValueAndValidity();
  }

}
