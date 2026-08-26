import { CarbonFootprintService, IConsumption } from '../../../services/CarbonFootprintService';
import { categoryLabel, CategoryLabels } from './categoryLabel';

const anyConsumption: IConsumption = {
  electricity: 1,
  carKm: 1,
  shortFlights: 1,
  longFlights: 1,
  gas: 1,
  water: 1,
  hasSolar: false,
  heating: 'electric'
};

describe('categoryLabel', () => {
  it('has a localisable label for every category the service produces', () => {
    const categories = Object.keys(CarbonFootprintService.calculateEmissions(anyConsumption));

    expect(categories.length).toBeGreaterThan(0);
    categories.forEach((category) => {
      expect(Object.keys(CategoryLabels)).toContain(category);
    });
  });

  it('leaves no label empty', () => {
    Object.keys(CategoryLabels).forEach((category) => {
      expect(categoryLabel(category)).toBeTruthy();
    });
  });

  it('falls back to the key rather than rendering nothing', () => {
    expect(categoryLabel('Not A Category')).toEqual('Not A Category');
  });
});
