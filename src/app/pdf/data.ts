// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    orderData: {
        address: {
          title: 'Home',
          name: 'Jalil',
          flatNumber: 115,
          street: 'Oran',
          locality: 'Oran'
        },
        grandTotal: 87,
        products: [
          {
            images: ['apple.jpg'],
            name: 'Pomme',
            offer: 10,
            salePrice: 2.7,
            regularPrice: 3,
            units: 10
          },
          {
            images: ['biryani.jpg'],
            name: 'Banane',
            offer: 20,
            salePrice: 12,
            regularPrice: 15,
            units: 5
          }
        ],
        status: 'Commander',
        delivery_status: 'Unassigned',
        createdAt: 'Nov 3, 2020 3:49 PM'
      }
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  