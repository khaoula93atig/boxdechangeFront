// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL:'http://192.168.1.155:8083',
  urlTest:'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/range.json',
   firebaseConfig : {
    apiKey: "AIzaSyCzGpqL900sec13CXbdGU_ODEFOgG7W0R0",
    authDomain: "boxdechange.firebaseapp.com",
    projectId: "boxdechange",
    storageBucket: "boxdechange.appspot.com",
    messagingSenderId: "541621281306",
    appId: "1:541621281306:web:5122a53dc541c7935e27a3"
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
