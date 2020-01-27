import { Component, OnInit } from '@angular/core';
import { Iproduct } from './product';
import { ProductserviceService } from '../productservice.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle: string ='Product List';
  imageWidth:number=50;
  imageMargin:number=2;
  showImage:boolean=false;
  showImageText:string='Show Image';
  _filterByText:string;
  filtedProducts:Iproduct[];
  //_productService:ProductserviceService;

  products:Iproduct[];

  set filterByText(filter:string){
    this._filterByText=filter;
    this.filtedProducts=filter!=null?this.performFilter(this._filterByText):this.products;
  }

  get filterByText():string{
    return this._filterByText;
  }

  performFilter(filterValue:string):Iproduct[]{
     return this.products.filter((product:Iproduct)=>
        product.productName.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase())!=-1
     );
    
   
  }
  _productService:ProductserviceService;
  constructor(productService:ProductserviceService) { 
    this._productService=productService;
    
  }

  ngOnInit() {
    console.log("On Init Method");
    this._productService.getProducts().subscribe({
      next:(data)=>{
        console.log('data resceived');
        this.products=data;
        this.filtedProducts=this.products;
      },
      error:(err)=>{console.log('Error'+err)},
      complete:()=>{console.log('complete')
      }
    });
    
  }

  toggleImage():void{
    this.showImage=!this.showImage;
    if(this.showImage){
      this.showImageText='hide image';
    }else{
      this.showImageText='show image';
    }
  }

  recieveEvent(message:string){
   console.log(message);
  }
}
