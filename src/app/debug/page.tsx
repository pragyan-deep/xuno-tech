'use client'

import { useEffect, useState } from 'react'

interface EnvData {
  NODE_ENV: string
  NEXT_PUBLIC_SITE_URL: string
  APPS_SCRIPT_URL_EXISTS: string
  APPS_SCRIPT_URL_LENGTH: number
  APPS_SCRIPT_URL_STARTS_WITH: string
}

export default function DebugPage() {
  const [envData, setEnvData] = useState<EnvData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchEnvData = async () => {
    try {
      const response = await fetch('/api/debug-env-check')
      const data = await response.json()
      setEnvData(data)
    } catch (error) {
      console.error('Error fetching env data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEnvData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading environment data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Environment Variables Debug</h1>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Current Environment Variables:</h2>
          
          {envData ? (
            <div className="space-y-3">
              {Object.entries(envData).map(([key, value]) => (
                <div key={key} className="flex items-center gap-4">
                  <span className="font-mono text-sm bg-muted px-2 py-1 rounded min-w-[200px]">
                    {key}:
                  </span>
                  <span className={`text-sm ${
                    key === 'APPS_SCRIPT_URL_EXISTS' && value === 'NO' 
                      ? 'text-red-500 font-semibold' 
                      : 'text-muted-foreground'
                  }`}>
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-500">Failed to load environment data</p>
          )}

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Expected:</strong> APPS_SCRIPT_URL_EXISTS should be &quot;YES&quot; and length should be around 90-120 characters
            </p>
          </div>

          <div className="mt-4 space-x-4">
            <button 
              onClick={fetchEnvData}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Refresh
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 