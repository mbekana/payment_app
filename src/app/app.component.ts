import { ChangeDetectorRef, Component } from '@angular/core';
import { routes } from './app-routing.module';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

// AppComponent serves as the root component of the application.
export class AppComponent {
  // An array of route objects imported from the app-routing module.
  // This property is used to display the navigation links in the application.
  routes = routes;

  // A MediaQueryList for detecting changes in the screen size.
  mobileQuery: MediaQueryList;

  // A listener function used to detect changes in the screen size.
  private _mobileQueryListener: () => void;

  // Constructor function that initializes the component with the necessary dependencies.
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');

    // This function is called whenever the screen size changes.
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();

    // Add the listener function to the MediaQueryList.
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  // Destructor function that removes the listener function from the MediaQueryList.
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
