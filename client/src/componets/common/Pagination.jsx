import React from 'react'
import { Button } from '../ui/Button'

export default function Pagination({ page, pages, onPrev, onNext }) {
    return (
        <div className="flex items-center justify-center gap-4 mt-10">
            <Button
                variant="outline"
                disabled={page === 1}
                onClick={onPrev}
            >
                ← Previous
            </Button>
            <span className="text-sm text-muted-foreground">
                Page {page} of {pages}
            </span>
            <Button
                variant="outline"
                disabled={page === pages}
                onClick={onNext}
            >
                Next →
            </Button>
        </div>
    )
}
