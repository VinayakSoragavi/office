"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const PDFViewer = dynamic(
  () =>
    import("react-pdf").then((mod) => {
      const { pdfjs } = mod
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
      return mod.Document
    }),
  { ssr: false },
)

const PDFPage = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
})

export default function PDFViewerComponent() {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  useEffect(() => {
    // Set the PDF URL
    setPdfUrl("http://192.168.1.1:8080/generate-report")
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error loading PDF:", error)
    setError(error.message)
    setLoading(false)
  }

  if (!pdfUrl) {
    return <div className="flex items-center justify-center h-96">Loading PDF URL...</div>
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {loading && (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        {error && <div className="flex items-center justify-center h-96 text-red-500">Error loading PDF: {error}</div>}

        {!error && (
          <PDFViewer
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="mx-auto"
          >
            <PDFPage
              pageNumber={pageNumber}
              className="mx-auto"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </PDFViewer>
        )}

        {numPages > 0 && (
          <div className="flex items-center justify-center gap-4 p-4 border-t">
            <Button
              onClick={() => setPageNumber((page) => Math.max(page - 1, 1))}
              disabled={pageNumber <= 1}
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {pageNumber} of {numPages}
            </span>
            <Button
              onClick={() => setPageNumber((page) => Math.min(page + 1, numPages))}
              disabled={pageNumber >= numPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

