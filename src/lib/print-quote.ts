import type { LineItem } from '@/types'

interface PrintData {
  items: LineItem[]
  clientName: string
  clientDate: string
  subtotal: number
  discount: number
  finalTotal: number
  getCategoryName: (id: string) => string
}

export function printQuote(data: PrintData) {
  const {
    items,
    clientName,
    clientDate,
    subtotal,
    discount,
    finalTotal,
    getCategoryName,
  } = data
  const discountAmount = subtotal * (discount / 100)

  const rows = items
    .map(
      (item) => `
    <tr>
      <td style="padding:0.5rem;border-bottom:1px solid #ddd">${item.product.name}</td>
      <td style="padding:0.5rem;border-bottom:1px solid #ddd;color:#666">${getCategoryName(item.product.categoryId)}</td>
      <td style="padding:0.5rem;border-bottom:1px solid #ddd;text-align:right">${item.quantity}</td>
      <td style="padding:0.5rem;border-bottom:1px solid #ddd;text-align:right">$${item.product.price.toFixed(2)}</td>
      <td style="padding:0.5rem;border-bottom:1px solid #ddd;text-align:right">$${(item.product.price * item.quantity).toFixed(2)}</td>
    </tr>`,
    )
    .join('')

  const html = `
<!DOCTYPE html>
<html>
<head><title>PC Quote</title>
<style>
  @page { margin: 1.5cm; }
  body { font-family: system-ui, -apple-system, sans-serif; color: #000; margin: 0; padding: 0; }
  .quote { max-width: 700px; margin: 0 auto; }
  h1 { font-size: 1.25rem; font-weight: 700; text-align: center; margin: 0 0 0.25rem; }
  .meta { text-align: center; color: #666; font-size: 0.875rem; margin: 0 0 0.125rem; }
  .meta-small { text-align: center; color: #999; font-size: 0.75rem; margin: 0 0 1.5rem; }
  table { width: 100%; border-collapse: collapse; border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; }
  th { background: #f5f5f5; padding: 0.5rem; text-align: left; font-weight: 600; font-size: 0.8125rem; border-bottom: 1px solid #ddd; }
  th:last-child, td:last-child { text-align: right; }
  th:nth-child(3), td:nth-child(3) { text-align: right; }
  th:nth-child(4), td:nth-child(4) { text-align: right; }
  .totals { margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #ddd; }
  .totals div { display: flex; justify-content: space-between; font-size: 0.875rem; line-height: 1.75; }
  .totals .total { font-size: 1rem; font-weight: 700; }
  .totals .discount { color: #666; }
  .footer { text-align: center; color: #999; font-size: 0.75rem; margin-top: 1.5rem; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style></head>
<body>
  <div class="quote">
    <h1>PC Quote</h1>
    <p class="meta">Client: ${clientName}</p>
    <p class="meta-small">${clientDate}</p>

    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Category</th>
          <th style="text-align:right">Qty</th>
          <th style="text-align:right">Price</th>
          <th style="text-align:right">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>

    <div class="totals">
      <div><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      ${discount > 0 ? `<div class="discount"><span>Discount (${discount}%)</span><span>-$${discountAmount.toFixed(2)}</span></div>` : ''}
      <div class="total"><span>Total</span><span>$${finalTotal.toFixed(2)}</span></div>
    </div>

    <p class="footer">This quote is valid for 30 days.</p>
  </div>
</body>
</html>`

  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.top = '0'
  iframe.style.left = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = 'none'
  document.body.appendChild(iframe)

  iframe.contentDocument?.write(html)
  iframe.contentDocument?.close()

  requestAnimationFrame(() => {
    iframe.contentWindow?.focus()
    iframe.contentWindow?.print()
  })
}
