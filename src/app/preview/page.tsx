import PDFViewer from "./_component/pdf-viewer";


export default function Page() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Annual Report Preview</h1>
      {/* <PDFViewer /> */}
      <iframe src="http://192.168.1.1:8080/generate-report" className="h-[500px] w-full"></iframe>
    </main>
  )
}