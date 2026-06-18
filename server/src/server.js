import dotenv from 'dotenv'
import { createApp } from './app.js'
import { connectDatabase } from './config/connectDatabase.js'
import { initializeHierarchyStore } from './services/hierarchyStore.js'

dotenv.config()

const port = Number(process.env.PORT || 5000)

async function startServer() {
  const db = await connectDatabase()
  await initializeHierarchyStore(db.mode)

  const app = createApp()

  app.listen(port, () => {
    console.log(`LPay server running on http://127.0.0.1:${port}`)
    console.log(`Store mode: ${db.mode}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server')
  console.error(error)
  process.exit(1)
})
