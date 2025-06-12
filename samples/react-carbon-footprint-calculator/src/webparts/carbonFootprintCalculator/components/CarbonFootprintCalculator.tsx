import * as React from 'react';
import styles from '../../../styles/CarbonFootprintCalculator.module.scss';
import { PdfExportService } from '../../../services/PdfExportService';

import {
  Stack,
  Text,
  Dropdown,
  IDropdownOption,
  Toggle,
  Slider,
  PrimaryButton
} from '@fluentui/react';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend
} from 'chart.js';

import { CarbonFootprintService } from '../../../services/CarbonFootprintService';
import { HeatingType } from '../../../models/HeatingType';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTooltip, ChartLegend);

export default function CarbonFootprintCalculator(): React.ReactElement {
  // State management for inputs
  const [electricity, setElectricity] = React.useState(350);
  const [carKm, setCarKm] = React.useState(1200);
  const [shortFlights, setShortFlights] = React.useState(2);
  const [longFlights, setLongFlights] = React.useState(1);
  const [gas, setGas] = React.useState(150);
  const [water, setWater] = React.useState(4000);
  const [hasSolar, setHasSolar] = React.useState(false);
  const [heating, setHeating] = React.useState<HeatingType>('electric');
  const [residents, setResidents] = React.useState(2);
  const [showTips, setShowTips] = React.useState(false);

  // Heating type options
  const heatingOptions: IDropdownOption[] = [
    { key: 'electric', text: 'Electric' },
    { key: 'gas', text: 'Gas' },
    { key: 'heatpump', text: 'Heat Pump' },
    { key: 'wood', text: 'Wood Stove' }
  ];

  // Calculate emissions using the service
  const emissions = React.useMemo(() => CarbonFootprintService.calculateEmissions(
    electricity, carKm, shortFlights, longFlights, gas, water, hasSolar, heating
  ), [electricity, carKm, shortFlights, longFlights, gas, water, hasSolar, heating]);

  // Calculate total emissions
  const totalEmissions = React.useMemo(
    () => CarbonFootprintService.getTotalEmissions(emissions), [emissions]);

  // Calculate per person emissions
  const perPerson = CarbonFootprintService.getEmissionsPerPerson(totalEmissions, residents);

  // Prepare chart data
  const chartData = React.useMemo(() => ({
    labels: Object.keys(emissions),
    datasets: [{
      label: 'kg CO₂ / person',
      data: Object.keys(emissions).map(key =>
        parseFloat((emissions[key] / residents).toFixed(1))
      ),
      backgroundColor: ['#0078d4', '#00bcf2', '#e3008c', '#ffaa44', '#107c10', '#8884d8']
    }]
  }), [emissions, residents]);

  return (
    <div id="carbon-calculator" className={styles.carbonFootprintCalculator}>
      <Stack tokens={{ childrenGap: 30 }} styles={{ root: { padding: '2em 3vw' } }}>

        <Text variant="xxLarge" styles={{ root: { textAlign: 'center', fontWeight: 'bold' } }}>
          Carbon Footprint Calculator
        </Text>

        {/* Input Sliders */}
        <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
          <Stack.Item grow><Slider label="Electricity (kWh)" min={0} max={1000} step={10} value={electricity} onChange={setElectricity} showValue /></Stack.Item>
          <Stack.Item grow><Slider label="Long Flights / mo" min={0} max={5} step={1} value={longFlights} onChange={setLongFlights} showValue /></Stack.Item>
          <Stack.Item grow><Slider label="Car travel (km)" min={0} max={5000} step={100} value={carKm} onChange={setCarKm} showValue /></Stack.Item>
          <Stack.Item grow><Slider label="Natural Gas (m³)" min={0} max={500} step={10} value={gas} onChange={setGas} showValue /></Stack.Item>
          <Stack.Item grow><Slider label="Short Flights / mo" min={0} max={5} step={1} value={shortFlights} onChange={setShortFlights} showValue /></Stack.Item>
          <Stack.Item grow><Slider label="Water (L / mo)" min={0} max={10000} step={100} value={water} onChange={setWater} showValue /></Stack.Item>
        </Stack>

        {/* Additional settings */}
        <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
          <Stack.Item grow>
            <Toggle label="Solar panels installed?" checked={hasSolar} onChange={(_, v) => setHasSolar(!!v)} />
          </Stack.Item>
          <Stack.Item grow>
            <Dropdown
              label="Heating type"
              options={heatingOptions}
              selectedKey={heating}
              onChange={(_, o) => setHeating(o?.key as HeatingType)}
              styles={{ root: { width: '100%' } }}
            />
          </Stack.Item>
          <Stack.Item grow>
            <Slider label="Number of residents" min={1} max={10} step={1} value={residents} onChange={setResidents} showValue />
          </Stack.Item>
        </Stack>

        {/* Results & Chart */}
        <Stack tokens={{ childrenGap: 15 }}>
          <Text variant="large" styles={{ root: { fontWeight: 600 } }}>
            Emissions per person:
            <span style={{
              marginLeft: '8px',
              color: perPerson <= 600 ? '#107c10' : perPerson <= 1000 ? '#d29200' : '#a4262c',
              backgroundColor: perPerson <= 600 ? '#e6f4ea' : perPerson <= 1000 ? '#fff4ce' : '#fde7e9',
              padding: '0.3em 0.6em',
              borderRadius: '8px'
            }}>
              {perPerson} kg CO₂
            </span>
          </Text>
          <div className={styles.chartContainer}>
            <Bar data={chartData} options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { beginAtZero: true, title: { display: true } }
              },
              plugins: {
                legend: { position: 'bottom' }
              }
            }} />
          </div>
        </Stack>

        {/* PDF Export Button */}
        <Stack horizontalAlign="end">
          <PrimaryButton
            text="Export as PDF"
            iconProps={{ iconName: 'PDF' }}
            onClick={() => PdfExportService.exportElementToPdf('carbon-calculator', 'CarbonFootprintReport')}
          />
        </Stack>


        {/* Toggle Tips */}
        <Toggle
          label="Show tips to reduce your carbon footprint"
          checked={showTips}
          onChange={(_, checked) => setShowTips(!!checked)}
        />

        {/* Tips */}
        {showTips && (
          <Stack styles={{ root: { marginTop: 10 } }}>
            <Text variant="large" styles={{ root: { fontWeight: 600 } }}>
              Tips to reduce your footprint:
            </Text>
            <ul>
              <li>Install LED lights & energy-efficient appliances</li>
              <li>Use public transportation or bike more often</li>
              <li>Limit air travel and opt for trains</li>
              <li>Improve home insulation</li>
              <li>Adopt renewable energy sources like solar panels</li>
            </ul>
          </Stack>
        )}

      </Stack>
    </div>
  );
}
