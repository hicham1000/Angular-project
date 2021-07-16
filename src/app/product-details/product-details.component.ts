import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Product } from '../model/product';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  productsdetailsd: Product;
  products : Product[] = []
  total = 0;
  
  constructor(private route: ActivatedRoute,private productService: ProductService,
    private customerService: CustomerService
    ) {
      
      productService.getProducts().subscribe(data => {
        this.products = data;
      });
      
    }
    
    ngOnInit() {
      this.route.params.subscribe((params: Params): void => {
        const id = params.id;
        this.productService.getProduct(id).subscribe(products => {
          this.productsdetailsd = products;
        });
      });
    }
    
    updateTotal(): void {
      this.customerService.getTotal().subscribe(total => {
        this.total = total;
      });
    }
    
    isAvailable(product: Product): boolean {
      return this.productService.isAvailable(product);
    }
    
    updatePrice(event: Product): void {
      this.customerService.addProduct(event);
      this.productService.decreaseStock(event);
      this.updateTotal();
    }
    
  }
  