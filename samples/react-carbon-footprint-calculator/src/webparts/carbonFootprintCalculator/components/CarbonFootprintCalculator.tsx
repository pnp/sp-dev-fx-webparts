import * as React from 'react';
import styles from '../../../styles/CarbonFootprintCalculator.module.scss';
import { ICarbonFootprintCalculatorProps } from './ICarbonFootprintCalculatorProps';
import {
  Stack,
  Text,
  Dropdown,
  IDropdownOption,
  Toggle,
  Slider
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

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTooltip, ChartLegend);

export default function CarbonFootprintCalculator(
  props: ICarbonFootprintCalculatorProps
): React.ReactElement {
  // State variables for user inputs
  const [electricity, setElectricity] = React.useState(350);
  const [carKm, setCarKm] = React.useState(1200);
  const [shortFlights, setShortFlights] = React.useState(2);
  const [longFlights, setLongFlights] = React.useState(1);
  const [gas, setGas] = React.useState(150);
  const [water, setWater] = React.useState(4000);
  const [hasSolar, setHasSolar] = React.useState(false);
  const [heating, setHeating] = React.useState<'electric' | 'gas' | 'heatpump' | 'wood'>('electric');
  const [residents, setResidents] = React.useState(2);

  const limits = React.useMemo(() => ({
    electricity: 300,
    carKm: 800,
    shortFlights: 1,
    longFlights: 0,
    gas: 100,
    water: 5000
  }), []);



  // Dropdown options for heating type
  const heatingOptions: IDropdownOption[] = [
    { key: 'electric', text: 'Electric' },
    { key: 'gas', text: 'Gas' },
    { key: 'heatpump', text: 'Heat Pump' },
    { key: 'wood', text: 'Wood Stove' }
  ];

  // Compute carbon footprint values
  const values: Record<string, number> = React.useMemo(() => {
    const f = {
      electricity: 0.233,
      car: 0.12,
      shortFlight: 250,
      longFlight: 1000,
      gas: 2.0,
      water: 0.0003
    };
    const heatMul = heating === 'gas' ? 1.2 : heating === 'heatpump' ? 0.6 : 1;
    const elec = hasSolar ? electricity * 0.7 : electricity;
    return {
      Electricity: elec * f.electricity,
      'Car Travel': carKm * f.car,
      'Short Flights': shortFlights * f.shortFlight,
      'Long Flights': longFlights * f.longFlight,
      'Natural Gas': gas * f.gas * heatMul,
      Water: water * f.water
    };
  }, [electricity, carKm, shortFlights, longFlights, gas, water, hasSolar, heating]);

  // Sum all emissions
  const totalEmissions = React.useMemo(() => {
    let sum = 0;
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        sum += values[key];
      }
    }
    return sum;
  }, [values]);

  const emissionStatus = (value: number): { color: string, bg: string } => {
    if (value <= 600) return { color: '#107c10', bg: '#e6f4ea' };      // Green
    if (value <= 1000) return { color: '#d29200', bg: '#fff4ce' };     // Yellow
    return { color: '#a4262c', bg: '#fde7e9' };                         // Red
  };

  const perPerson = parseFloat((totalEmissions / residents).toFixed(1));
  const status = emissionStatus(perPerson);

  // Prepare chart data
  const chartData = React.useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];

    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        labels.push(key);
        const val = values[key];
        data.push(residents > 0 ? parseFloat((val / residents).toFixed(1)) : 0);
      }
    }


    return {
      labels,
      datasets: [{
        label: 'kg CO₂ / person',
        data,
        backgroundColor: ['#0078d4', '#00bcf2', '#e3008c', '#ffaa44', '#107c10', '#8884d8']
      }]
    };
  }, [values, residents]);

  return (
    <div className={styles.carbonFootprintCalculator}>
      <Stack styles={{ root: { width: '100%', padding: '2em 3vw' } }} tokens={{ childrenGap: 30 }}>
        <Text variant="xLargePlus" styles={{
          root: {
            fontWeight: 700,
            borderLeft: '6px solid #0078d4',
            paddingLeft: '12px',
            marginBottom: '8px',
            fontSize: '1.6rem',
            color: '#323130'
          }
        }}>
          Carbon Footprint Calculator
        </Text>


        {/* Input sliders */}
        <Stack horizontal wrap tokens={{ childrenGap: 20 }} styles={{ root: { width: '100%' } }}>
          <Stack.Item grow><Slider label="Electricity (kWh)" min={0} max={1000} step={10} value={electricity} onChange={setElectricity} showValue /></Stack.Item>
          <Stack.Item grow><Slider label="Long Flights / mo" min={0} max={5} step={1} value={longFlights} onChange={setLongFlights} showValue /></Stack.Item>
          <Stack.Item grow><Slider label="Car travel (km)" min={0} max={5000} step={100} value={carKm} onChange={setCarKm} showValue /></Stack.Item>
          <Stack.Item grow><Slider label="Natural Gas (m³)" min={0} max={500} step={10} value={gas} onChange={setGas} showValue /></Stack.Item>
          <Stack.Item grow><Slider label="Short Flights / mo" min={0} max={5} step={1} value={shortFlights} onChange={setShortFlights} showValue /></Stack.Item>
          <Stack.Item grow><Slider label="Water (L / mo)" min={0} max={10000} step={100} value={water} onChange={setWater} showValue /></Stack.Item>
        </Stack>

        {/* Additional toggles and dropdowns */}
        <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
          <Stack.Item grow><Toggle label="Solar panels installed?" checked={hasSolar} onChange={(_, v) => setHasSolar(!!v)} /></Stack.Item>
          <Stack.Item grow><Dropdown label="Heating type" options={heatingOptions} selectedKey={heating} onChange={(_, o) => setHeating(o?.key as any)} styles={{ root: { width: '100%' } }} /></Stack.Item>
          <Stack.Item grow><Slider label="Number of residents" min={1} max={10} step={1} value={residents} onChange={setResidents} showValue /></Stack.Item>
        </Stack>

        {/* Chart and result */}
        <Stack tokens={{ childrenGap: 15 }}>
          <Text
            variant="large"
            styles={{
              root: {
                fontWeight: 600,
                fontSize: '1.5rem',
                padding: '12px 16px',
                borderRadius: 8,
                backgroundColor: status.bg,
                color: status.color,
                textAlign: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
              }
            }}
          >
            Emissions per person: {perPerson} kg CO₂
          </Text>
          <div className={styles.chartContainer}>
            <Bar data={chartData} options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  beginAtZero: true,
                  title: { display: true, text: 'kg CO₂ / person' }
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: ctx => `${ctx.dataset.label}: ${ctx.parsed.x} kg`
                  }
                },
                legend: { position: 'bottom' }
              }
            }} />
          </div>
        </Stack>
        <Stack tokens={{ childrenGap: 20 }}>
          <Text variant="large" styles={{ root: { fontWeight: 600 } }}>
            Recommended Sustainable Limits
          </Text>

          <Stack tokens={{ childrenGap: 20 }}>
            <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
              {[
                { key: 'Electricity', label: 'Electricity (kWh)', value: electricity, limit: limits.electricity, icon: 'Lightbulb' },
                { key: 'Car Travel', label: 'Car Travel (km)', value: carKm, limit: limits.carKm, icon: 'Car' },
                { key: 'Short Flights', label: 'Short Flights / mo', value: shortFlights, limit: limits.shortFlights, icon: 'Airplane' },
                { key: 'Long Flights', label: 'Long Flights / mo', value: longFlights, limit: limits.longFlights, icon: 'AirplaneSolid' },
                { key: 'Natural Gas', label: 'Natural Gas (m³)', value: gas, limit: limits.gas, icon: 'FlameSolid' },
                { key: 'Water', label: 'Water (L / mo)', value: water, limit: limits.water, icon: 'WaterDrop' }
              ].map((item, i) => {
                let bg = '#dff6dd'; // green
                let color = '#107c10';
                if (item.value > item.limit * 1.5) {
                  bg = '#fde7e9'; // red
                  color = '#a80000';
                } else if (item.value > item.limit) {
                  bg = '#fff4ce'; // yellow
                  color = '#986f0b';
                }

                return (
                  <Stack.Item key={i} grow styles={{
                    root: {
                      background: bg,
                      borderRadius: 8,
                      padding: '1rem',
                      minWidth: 220,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }
                  }}>
                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
                      <i className={`ms-Icon ms-Icon--${item.icon}`} aria-hidden="true" style={{ fontSize: 24, color }}></i>
                      <Stack>
                        <Text styles={{ root: { fontSize: 14, color: '#605e5c' } }}>{item.label}</Text>
                        <Text styles={{ root: { fontSize: 16, fontWeight: 600, color } }}>
                          {item.value} (≤ {item.limit})
                        </Text>
                      </Stack>
                    </Stack>
                  </Stack.Item>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
