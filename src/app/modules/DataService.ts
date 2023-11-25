interface API{
this.fetchRegions();

// Fetch communes initially and update the observable
this.fetchCommunes();


fetchRegions() {
this.http
  .get('https://dev.matiivilla.cl/duoc/location/region')
  .subscribe((data: Object) => {
    // Extract first object from array
    const region = Object.values(data)[0];
    this.regions = region;
  });
}  
fetchCommunes() {
    if (this.selectedRegion) {
       this.http
         .get(`https://dev.matiivilla.cl/duoc/location/comuna?regionId=${this.selectedRegion}`)
         .subscribe((data: any) => {
           const communes: any[] = data.data || [];
           this.communes$ = of(communes); // Update the observable
         });
    }
   }
   navigateLeft() {
    this.navCtrl.back();
  }
  

  openLink(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  onSelectRegion(regionId: number) {
    this.selectedRegion = regionId;
    this.fetchCommunes();
  }
}