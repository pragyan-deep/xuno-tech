export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container-max section-padding">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Xuno Tech
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Your one-page technology website is being built with Next.js 14+ and TailwindCSS.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                Project Setup Complete ✅
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 