import React from 'react'
import type { ContextType } from './ToDoType'

export const ToDoContext = React.createContext<ContextType | undefined>(undefined)
