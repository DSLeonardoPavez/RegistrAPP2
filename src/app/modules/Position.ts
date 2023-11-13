interface Position {
    coords: {
       latitude: number;
       longitude: number;
       altitude: number;
       accuracy: number;
       altitudeAccuracy: number;
       heading: number;
       speed: number;
    };
    timestamp: number;
   }