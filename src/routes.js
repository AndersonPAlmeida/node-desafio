import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const { title, description, completed } = req.body
      
      database.insert('tasks', {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null,
      })
      
      return res.writeHead(201).end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const { search } = req.query
      
      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null)
    
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body
      
      const tasks = database.update('tasks', id, {
        title,
        description,
        updated_at: new Date(),
      })
  
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/task/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;
      
      const tasks = database.updateTaskCompleted('tasks', id)
    
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      
      const tasks = database.delete('tasks', id)
    
      return res.end(JSON.stringify(tasks))
    }
  },
]