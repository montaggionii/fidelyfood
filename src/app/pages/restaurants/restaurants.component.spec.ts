import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantsComponent } from './restaurants.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';

describe('RestaurantsComponent', () => {
  let component: RestaurantsComponent;
  let fixture: ComponentFixture<RestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantsComponent, HttpClientTestingModule],
      providers: [RestaurantService],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});