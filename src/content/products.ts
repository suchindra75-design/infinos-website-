export interface PlaceholderValue {
  value: string
  placeholder: boolean
}

export interface ExplodeSpec {
  dir: [number, number, number]
  distance: number
  rotate?: [number, number, number]
}

export interface ProductComponentSpec {
  id: string
  nodeName: string
  label: string
  role: string
  placeholder: boolean
  priority: number
  basePosition: [number, number, number]
  explode: ExplodeSpec
  openOffset?: ExplodeSpec
  metadata?: Record<string, string>
  labelSide: 'left' | 'right'
}

export interface ProductApplication {
  id: string
  name: string
  payload: PlaceholderValue
  thermalRequirement: PlaceholderValue
  mode: PlaceholderValue
}

export interface Product {
  slug: string
  name: string
  namePlaceholder: boolean
  tagline: string
  description: string
  status: 'conceptual-placeholder'
  model: {
    source: string | null
    format: 'GLB'
    placeholder: boolean
    note: string
    targetHeightMeters: number
    targetHeightPlaceholder: boolean
    display: {
      nodeName: string
      anchor: [number, number, number]
      placeholder: boolean
    }
  }
  specifications: Record<string, PlaceholderValue>
  thermal: {
    cooling: {
      target: PlaceholderValue
      current: PlaceholderValue
      status: PlaceholderValue
    }
    heating: {
      target: PlaceholderValue
      current: PlaceholderValue
      status: PlaceholderValue
    }
    display: {
      reading: PlaceholderValue
    }
  }
  sensors: {
    types: string[]
    placeholder: true
  }
  telemetry: {
    capabilities: string[]
    placeholder: true
  }
  applications: ProductApplication[]
  components: ProductComponentSpec[]
}

export const PLACEHOLDER: PlaceholderValue = {
  value: '[PLACEHOLDER]',
  placeholder: true,
}

export const PRODUCT: Product = {
  slug: 't1',
  name: 'INFINOS T-1',
  namePlaceholder: true,
  tagline: 'Smart thermal transport system',
  description:
    'An intelligent temperature-controlled transport system for temperature-sensitive products. Cooling and heating hold the required thermal condition while sensors and telemetry monitor the internal environment.',
  status: 'conceptual-placeholder',
  model: {
    source: null,
    format: 'GLB',
    placeholder: true,
    note: 'Placeholder geometry — real INFINOS CAD/GLTF asset to be substituted without architectural changes. Set source to "/models/<slug>.glb" once the real asset is provided.',
    targetHeightMeters: 1.8,
    targetHeightPlaceholder: true,
    display: {
      nodeName: 'INFINOS_Display',
      anchor: [0, 1.2, 0.49],
      placeholder: true,
    },
  },
  specifications: {
    THERMAL_RANGE: PLACEHOLDER,
    COOLING_CAPABILITY: PLACEHOLDER,
    HEATING_CAPABILITY: PLACEHOLDER,
    SENSOR_TYPES: PLACEHOLDER,
    DISPLAY_INFORMATION: PLACEHOLDER,
  },
  thermal: {
    cooling: {
      target: { value: '04.0°C', placeholder: true },
      current: { value: '04.2°C', placeholder: true },
      status: { value: 'STABLE', placeholder: true },
    },
    heating: {
      target: PLACEHOLDER,
      current: PLACEHOLDER,
      status: { value: 'STABLE', placeholder: true },
    },
    display: {
      reading: { value: '04.2', placeholder: true },
    },
  },
  sensors: {
    types: ['INTERNAL TEMPERATURE', 'DEVICE STATUS'],
    placeholder: true,
  },
  telemetry: {
    capabilities: [
      'TEMPERATURE',
      'DEVICE STATUS',
      'SENSOR STATE',
      'LOCATION',
      'ALERTS',
      'CONNECTIVITY',
    ],
    placeholder: true,
  },
  applications: [
    {
      id: 'blood',
      name: 'BLOOD TRANSPORT',
      payload: { value: 'Blood units', placeholder: true },
      thermalRequirement: PLACEHOLDER,
      mode: { value: 'COOLING', placeholder: true },
    },
    {
      id: 'vaccines',
      name: 'VACCINES & BIOTECH',
      payload: { value: 'Vaccines, diagnostics', placeholder: true },
      thermalRequirement: PLACEHOLDER,
      mode: { value: 'COOLING / HEATING', placeholder: true },
    },
    {
      id: 'food',
      name: 'FOOD & LOGISTICS',
      payload: { value: 'Temperature-sensitive food', placeholder: true },
      thermalRequirement: PLACEHOLDER,
      mode: { value: 'COOLING', placeholder: true },
    },
  ],
  components: [
    {
      id: 'lid',
      nodeName: 'INFINOS_Lid',
      label: 'LID / DISPLAY MODULE',
      role: 'Access, display, mounting',
      placeholder: true,
      priority: 1,
      basePosition: [0, 1.81, 0],
      explode: { dir: [0, 1, 0], distance: 0.94, rotate: [-0.1, 0, 0] },
      labelSide: 'right',
    },
    {
      id: 'outerShell',
      nodeName: 'INFINOS_OuterShell',
      label: 'OUTER SHELL',
      role: 'Structural enclosure',
      placeholder: true,
      priority: 2,
      basePosition: [0, 0.85, 0],
      explode: { dir: [0, 1, 0], distance: 0.45 },
      labelSide: 'left',
    },
    {
      id: 'insulation',
      nodeName: 'INFINOS_Insulation',
      label: 'INSULATION / THERMAL BARRIER',
      role: 'Thermal separation',
      placeholder: true,
      priority: 3,
      basePosition: [0, 1.02, 0],
      explode: { dir: [0, -1, 0], distance: 0.42 },
      labelSide: 'right',
    },
    {
      id: 'payload',
      nodeName: 'INFINOS_PayloadCompartment',
      label: 'PAYLOAD COMPARTMENT',
      role: 'Temperature-sensitive payload',
      placeholder: true,
      priority: 4,
      basePosition: [0, 0.72, 0],
      explode: { dir: [0, -1, 0], distance: 0.87 },
      labelSide: 'left',
    },
    {
      id: 'sensor',
      nodeName: 'INFINOS_SensorSystem',
      label: 'SENSOR SYSTEM',
      role: 'Internal condition monitoring',
      placeholder: true,
      priority: 5,
      basePosition: [0, 1.32, 0],
      explode: { dir: [0, -1, 0], distance: 2.17 },
      metadata: { telemetryRole: 'SOURCE' },
      labelSide: 'right',
    },
    {
      id: 'thermal',
      nodeName: 'INFINOS_ThermalSystem',
      label: 'THERMAL SYSTEM',
      role: 'Cooling and heating',
      placeholder: true,
      priority: 6,
      basePosition: [0, 0.42, 0],
      explode: { dir: [0, -1, 0], distance: 1.97 },
      metadata: { visualization: 'EMISSIVE' },
      labelSide: 'left',
    },
    {
      id: 'electronics',
      nodeName: 'INFINOS_Electronics',
      label: 'ELECTRONICS / CONTROL',
      role: 'Control system, connectivity',
      placeholder: true,
      priority: 7,
      basePosition: [0, 0.22, 0],
      explode: { dir: [0, -1, 0], distance: 2.47 },
      labelSide: 'left',
    },
  ],
}
