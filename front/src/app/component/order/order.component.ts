import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/Entities/country';
import { Order } from 'src/app/Entities/order';
import { OrderItem } from 'src/app/Entities/order-item';
import { Purchase } from 'src/app/Entities/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopformService } from 'src/app/services/shopform.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  checkoutFormGroup!: FormGroup; // Formulaire de commande
  totalPrice: number = 0; // Prix total initialisé à 0
  totalQuantity: number = 0; // Quantité totale initialisée à 0

  creditCardYears: number[] = []; // Années de carte de crédit
  creditCardMonths: number[] = []; // Mois de carte de crédit

  countries: Country[] = []; // Liste des pays disponibles

  constructor(
    private formBuilder: FormBuilder,
    private shopFormService: ShopformService,
    private CartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails(); // Afficher les détails du panier
    this.checkoutFormGroup = this.formBuilder.group({
      // Créer un groupe de formulaire pour les informations de la commande
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth: number = new Date().getMonth() + 1; // Mois de début pour les cartes de crédit

    // Récupérer les mois de carte de crédit disponibles à partir du service
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data; // Mettre à jour la liste des mois de carte de crédit
      }
    );

    // Récupérer les années de carte de crédit disponibles à partir du service
    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data; // Mettre à jour la liste des années de carte de crédit
      }
    );

    // Récupérer la liste des pays disponibles à partir du service
    this.shopFormService.getCountries().subscribe(
      data => {
        this.countries = data; // Mettre à jour la liste des pays disponibles
      }
    );
  }

  copyShippingAddressToBillingAddress(event: any) {
    // Copier les informations d'adresse de livraison vers les informations d'adresse de facturation
    if (event.target.checked) {
      this.checkoutFormGroup.get('billingAddress')!.setValue(
        this.checkoutFormGroup.get('shippingAddress')!.value
      );
    } else {
      this.checkoutFormGroup.get('billingAddress')!.reset(); // Réinitialiser les informations d'adresse de facturation
    }
  }

  onSubmit() {
    // Soumettre la commande
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched(); // Marquer tous les champs comme touchés en cas de formulaire invalide
      return;
    }

    // Créer une nouvelle commande avec les détails actuels
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // Obtenir les éléments du panier
    const cartItems = this.CartService.cartItems;

    // Créer des éléments de commande à partir des éléments du panier
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // Créer une nouvelle commande d'achat avec les informations de la commande
    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    purchase.order = order;
    purchase.orderItems = orderItems;

    // Placer la commande en appelant le service de checkout
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        // Afficher un message d'alerte avec le numéro de suivi de la commande
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
        // Réinitialiser le panier après la commande
        this.resetCart();
      },
      error: err => {
        // Afficher un message d'erreur en cas d'erreur lors de la commande
        alert(`There was an error: ${err.message}`);
      }
    });
  }

  resetCart() {
    // Réinitialiser le panier après la commande
    this.CartService.cartItems = [];
    this.checkoutFormGroup.reset(); // Réinitialiser le formulaire de commande
    this.router.navigateByUrl("/products"); // Rediriger vers la page des produits après la commande
  }

  handleMonthsAndYears() {
    // Gérer les mois et années de carte de crédit
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard')!;

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    // Déterminer le mois de début en fonction de l'année sélectionnée
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    // Récupérer les mois de carte de crédit disponibles en fonction du mois de début
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data; // Mettre à jour la liste des mois de carte de crédit
      }
    );
  }

  reviewCartDetails() {
    // Examiner les détails du panier
    this.CartService.totalQuantity$.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity // Mettre à jour la quantité totale du panier
    );

    this.CartService.totalPrice$.subscribe(
      totalPrice => this.totalPrice = totalPrice // Mettre à jour le prix total du panier
    );
  }
}
