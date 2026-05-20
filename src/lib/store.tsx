import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Category, Product } from '@/types'

interface StoreContext {
  categories: Category[]
  products: Product[]
  addCategory: (name: string, description: string) => void
  updateCategory: (id: string, name: string, description: string) => void
  deleteCategory: (id: string) => void
  addProduct: (
    name: string,
    description: string,
    price: number,
    categoryId: string,
  ) => void
  updateProduct: (
    id: string,
    name: string,
    description: string,
    price: number,
    categoryId: string,
  ) => void
  deleteProduct: (id: string) => void
  getCategoryName: (id: string) => string
  getProductsByCategory: (categoryId: string) => Product[]
}

const StoreContext = createContext<StoreContext | null>(null)

function generateId() {
  return (
    crypto.randomUUID?.() ??
    Date.now().toString(36) + Math.random().toString(36).slice(2)
  )
}

const initialCategories: Category[] = [
  {
    id: 'cat-cpu',
    name: 'Procesadores',
    description: 'CPU / Procesadores para desktop',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-ram',
    name: 'Memorias RAM',
    description: 'Módulos de memoria RAM DDR4 y DDR5',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-mobo',
    name: 'Placas Madre',
    description: 'Motherboards para Intel y AMD',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-gpu',
    name: 'Tarjetas Gráficas',
    description: 'GPU / Tarjetas de video',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-storage',
    name: 'Almacenamiento',
    description: 'SSD, HDD y unidades NVMe',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-psu',
    name: 'Fuentes de Poder',
    description: 'PSU / Fuentes de alimentación',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-case',
    name: 'Gabinetes',
    description: 'Cases / Chasis para PC',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-keyboard',
    name: 'Teclados',
    description: 'Teclados mecánicos y de membrana',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-mouse',
    name: 'Ratones',
    description: 'Ratones con y sin cable',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-monitor',
    name: 'Monitores',
    description: 'Monitores LCD, LED y gaming',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
]

const initialProducts: Product[] = [
  // Procesadores
  {
    id: 'prod-i3-14100',
    name: 'Intel Core i3-14100',
    description: '4 núcleos / 8 hilos, 3.5GHz base',
    price: 149.99,
    categoryId: 'cat-cpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-i5-14600k',
    name: 'Intel Core i5-14600K',
    description: '10 núcleos / 16 hilos, 3.5GHz base',
    price: 319.99,
    categoryId: 'cat-cpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-i7-14700k',
    name: 'Intel Core i7-14700K',
    description: '20 núcleos / 28 hilos, 3.4GHz base',
    price: 449.99,
    categoryId: 'cat-cpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-i9-14900k',
    name: 'Intel Core i9-14900K',
    description: '24 núcleos / 32 hilos, 3.2GHz base',
    price: 649.99,
    categoryId: 'cat-cpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-r5-7600',
    name: 'AMD Ryzen 5 7600',
    description: '6 núcleos / 12 hilos, 3.8GHz base',
    price: 229.99,
    categoryId: 'cat-cpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-r7-7800x3d',
    name: 'AMD Ryzen 7 7800X3D',
    description: '8 núcleos / 16 hilos, 4.2GHz base, 3D V-Cache',
    price: 449.99,
    categoryId: 'cat-cpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-r9-7950x',
    name: 'AMD Ryzen 9 7950X',
    description: '16 núcleos / 32 hilos, 4.5GHz base',
    price: 799.99,
    categoryId: 'cat-cpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },

  // Memorias RAM
  {
    id: 'prod-ram-16-d5',
    name: 'Corsair Vengeance 16GB DDR5',
    description: '2x8GB DDR5-5600MHz',
    price: 94.99,
    categoryId: 'cat-ram',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-ram-32-d5',
    name: 'Corsair Vengeance 32GB DDR5',
    description: '2x16GB DDR5-6000MHz',
    price: 164.99,
    categoryId: 'cat-ram',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-ram-64-d5',
    name: 'Corsair Dominator 64GB DDR5',
    description: '2x32GB DDR5-6400MHz',
    price: 329.99,
    categoryId: 'cat-ram',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-ram-16-d4',
    name: 'Kingston Fury 16GB DDR4',
    description: '2x8GB DDR4-3200MHz',
    price: 54.99,
    categoryId: 'cat-ram',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-ram-32-d4',
    name: 'Kingston Fury 32GB DDR4',
    description: '2x16GB DDR4-3600MHz',
    price: 94.99,
    categoryId: 'cat-ram',
    createdAt: '2025-01-01T00:00:00.000Z',
  },

  // Placas Madre
  {
    id: 'prod-mobo-z790',
    name: 'ASUS ROG Z790-E',
    description: 'Socket LGA1700, DDR5, PCIe 5.0',
    price: 429.99,
    categoryId: 'cat-mobo',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-mobo-b760',
    name: 'Gigabyte B760M DS3H',
    description: 'Socket LGA1700, DDR5, mATX',
    price: 149.99,
    categoryId: 'cat-mobo',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-mobo-x670e',
    name: 'ASUS ROG X670E-E',
    description: 'Socket AM5, DDR5, PCIe 5.0',
    price: 499.99,
    categoryId: 'cat-mobo',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-mobo-b650',
    name: 'MSI B650 GAMING PLUS',
    description: 'Socket AM5, DDR5, ATX',
    price: 179.99,
    categoryId: 'cat-mobo',
    createdAt: '2025-01-01T00:00:00.000Z',
  },

  // Tarjetas Gráficas
  {
    id: 'prod-gpu-4060',
    name: 'NVIDIA RTX 4060',
    description: '8GB GDDR6, 192-bit',
    price: 349.99,
    categoryId: 'cat-gpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-gpu-4070s',
    name: 'NVIDIA RTX 4070 Super',
    description: '12GB GDDR6X, 192-bit',
    price: 599.99,
    categoryId: 'cat-gpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-gpu-4080s',
    name: 'NVIDIA RTX 4080 Super',
    description: '16GB GDDR6X, 256-bit',
    price: 999.99,
    categoryId: 'cat-gpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-gpu-4090',
    name: 'NVIDIA RTX 4090',
    description: '24GB GDDR6X, 384-bit',
    price: 1999.99,
    categoryId: 'cat-gpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-gpu-7900xtx',
    name: 'AMD RX 7900 XTX',
    description: '24GB GDDR6, 384-bit',
    price: 849.99,
    categoryId: 'cat-gpu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },

  // Almacenamiento
  {
    id: 'prod-ssd-1tb',
    name: 'Samsung 990 Pro 1TB',
    description: 'NVMe M.2 PCIe 4.0, 7450MB/s',
    price: 119.99,
    categoryId: 'cat-storage',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-ssd-2tb',
    name: 'Samsung 990 Pro 2TB',
    description: 'NVMe M.2 PCIe 4.0, 7450MB/s',
    price: 219.99,
    categoryId: 'cat-storage',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-ssd-4tb',
    name: 'WD Black SN850X 4TB',
    description: 'NVMe M.2 PCIe 4.0, 7300MB/s',
    price: 399.99,
    categoryId: 'cat-storage',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-hdd-2tb',
    name: 'Seagate Barracuda 2TB',
    description: 'HDD 3.5", 7200RPM',
    price: 54.99,
    categoryId: 'cat-storage',
    createdAt: '2025-01-01T00:00:00.000Z',
  },

  // Fuentes de Poder
  {
    id: 'prod-psu-750',
    name: 'Corsair RM750e',
    description: '750W 80+ Gold, totalmente modular',
    price: 119.99,
    categoryId: 'cat-psu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-psu-850',
    name: 'Corsair RM850x',
    description: '850W 80+ Gold, totalmente modular',
    price: 149.99,
    categoryId: 'cat-psu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-psu-1000',
    name: 'EVGA SuperNOVA 1000 G7',
    description: '1000W 80+ Gold, totalmente modular',
    price: 199.99,
    categoryId: 'cat-psu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-psu-1200',
    name: 'Seasonic Prime TX-1200',
    description: '1200W 80+ Titanium, totalmente modular',
    price: 349.99,
    categoryId: 'cat-psu',
    createdAt: '2025-01-01T00:00:00.000Z',
  },

  // Gabinetes
  {
    id: 'prod-case-4000d',
    name: 'Corsair 4000D Airflow',
    description: 'Mid-tower ATX, panel mesh',
    price: 104.99,
    categoryId: 'cat-case',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-case-5000d',
    name: 'Corsair 5000D Airflow',
    description: 'Mid-tower ATX, panel mesh, amplio',
    price: 154.99,
    categoryId: 'cat-case',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-case-h7',
    name: 'NZXT H7 Flow',
    description: 'Mid-tower ATX, flujo de aire optimizado',
    price: 129.99,
    categoryId: 'cat-case',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-case-h9',
    name: 'NZXT H9 Elite',
    description: 'Mid-tower ATX, panel de vidrio templado',
    price: 239.99,
    categoryId: 'cat-case',
    createdAt: '2025-01-01T00:00:00.000Z',
  },

  // Teclados
  {
    id: 'prod-kb-g915',
    name: 'Logitech G915 TKL',
    description: 'Teclado mecánico inalámbrico, perfil bajo',
    price: 229.99,
    categoryId: 'cat-keyboard',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-kb-k70',
    name: 'Corsair K70 RGB Pro',
    description: 'Teclado mecánico Cherry MX, cableado',
    price: 149.99,
    categoryId: 'cat-keyboard',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-kb-womier',
    name: 'Womier SK71',
    description: 'Teclado mecánico 60% hot-swap, RGB',
    price: 79.99,
    categoryId: 'cat-keyboard',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-kb-keys',
    name: 'Keychron Q1 Pro',
    description: 'Teclado mecánico 75% inalámbrico, QMK',
    price: 199.99,
    categoryId: 'cat-keyboard',
    createdAt: '2025-01-01T00:00:00.000Z',
  },

  // Ratones
  {
    id: 'prod-mouse-gpx',
    name: 'Logitech G Pro X Superlight',
    description: 'Ratón inalámbrico, 60g, Hero 25K',
    price: 149.99,
    categoryId: 'cat-mouse',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-mouse-viper',
    name: 'Razer Viper V2 Pro',
    description: 'Ratón inalámbrico, 58g, Focus Pro 30K',
    price: 129.99,
    categoryId: 'cat-mouse',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-mouse-g502',
    name: 'Logitech G502 X Plus',
    description: 'Ratón inalámbrico, Hero 25K, RGB',
    price: 159.99,
    categoryId: 'cat-mouse',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-mouse-dav3',
    name: 'Razer DeathAdder V3 Pro',
    description: 'Ratón inalámbrico, 63g, Focus Pro 30K',
    price: 149.99,
    categoryId: 'cat-mouse',
    createdAt: '2025-01-01T00:00:00.000Z',
  },

  // Monitores
  {
    id: 'prod-mon-24',
    name: 'Dell S2422HG',
    description: '24" Full HD, 165Hz, 1ms, VA',
    price: 199.99,
    categoryId: 'cat-monitor',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-mon-27-1440',
    name: 'LG 27GP850-B',
    description: '27" QHD, 165Hz, 1ms, IPS Nano',
    price: 399.99,
    categoryId: 'cat-monitor',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-mon-27-4k',
    name: 'LG 27UP850-W',
    description: '27" 4K UHD, 60Hz, IPS, USB-C',
    price: 449.99,
    categoryId: 'cat-monitor',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-mon-32-4k',
    name: 'Samsung Odyssey Neo G7',
    description: '32" 4K UHD, 165Hz, 1ms, Mini-LED',
    price: 899.99,
    categoryId: 'cat-monitor',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'prod-mon-34-uw',
    name: 'LG 34GP950G-B',
    description: '34" Ultrawide QHD, 180Hz, 1ms, IPS',
    price: 799.99,
    categoryId: 'cat-monitor',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
]

export function StoreProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [products, setProducts] = useState<Product[]>(initialProducts)

  function addCategory(name: string, description: string) {
    const cat: Category = {
      id: generateId(),
      name,
      description,
      createdAt: new Date().toISOString(),
    }
    setCategories((prev) => [...prev, cat])
  }

  function updateCategory(id: string, name: string, description: string) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name, description } : c)),
    )
  }

  function deleteCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  function addProduct(
    name: string,
    description: string,
    price: number,
    categoryId: string,
  ) {
    const product: Product = {
      id: generateId(),
      name,
      description,
      price,
      categoryId,
      createdAt: new Date().toISOString(),
    }
    setProducts((prev) => [...prev, product])
  }

  function updateProduct(
    id: string,
    name: string,
    description: string,
    price: number,
    categoryId: string,
  ) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, name, description, price, categoryId } : p,
      ),
    )
  }

  function deleteProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  function getCategoryName(id: string): string {
    return categories.find((c) => c.id === id)?.name ?? 'Unknown'
  }

  function getProductsByCategory(categoryId: string): Product[] {
    return products.filter((p) => p.categoryId === categoryId)
  }

  return (
    <StoreContext.Provider
      value={{
        categories,
        products,
        addCategory,
        updateCategory,
        deleteCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        getCategoryName,
        getProductsByCategory,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
