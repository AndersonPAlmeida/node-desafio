import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const { name, completed } = req.body

      database.insert('tasks', {
        id: randomUUID(),
        name,
        completed: completed ?? false
      })
      
      return res.writeHead(201).end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const { search } = req.query
      
      const users = database.select('tasks', search ? {
        name: search,
        completed: search,
      } : null)
    
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, completed } = req.body
      
      const users = database.update('tasks', id, {
        name,
        completed,
      })
    
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      
      const users = database.updateTaskCompleted('tasks', id)
    
      return res.end(JSON.stringify(users))
    }
  },
]