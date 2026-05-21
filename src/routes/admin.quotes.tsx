import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@/hooks/use-store'
import { QuoteTable } from '@/components/admin/QuoteTable'
import { QuoteDetailDialog } from '@/components/admin/QuoteDetailDialog'

export const Route = createFileRoute('/admin/quotes')({
  component: AdminQuotesPage,
})

function AdminQuotesPage() {
  const { savedQuotes, getCategoryName, deleteQuote, updateQuote } = useStore()
  const [viewing, setViewing] = useState<string | null>(null)

  const viewedQuote = viewing ? savedQuotes.find((q) => q.id === viewing) : null

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quotes</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {savedQuotes.length} saved quote
            {savedQuotes.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <QuoteTable
        savedQuotes={savedQuotes}
        onView={setViewing}
        onDelete={deleteQuote}
      />

      <QuoteDetailDialog
        key={viewing}
        open={!!viewedQuote}
        quote={viewedQuote ?? null}
        getCategoryName={getCategoryName}
        onOpenChange={() => setViewing(null)}
        onUpdateQuote={updateQuote}
      />
    </div>
  )
}
