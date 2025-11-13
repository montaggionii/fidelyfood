// src/app/services/restaurant.spec.ts
import { Restaurant } from './restaurant';

describe('Restaurant model', () => {
  it('should create a restaurant object', () => {
    const r: Restaurant = {
      id: 1,
      name: 'Restaurante La Pasta',
      address: 'Calle Falsa 123',
      rating: 4
    };
    expect(r.id).toBe(1);
    expect(r.name).toBe('Restaurante La Pasta');
  });
});