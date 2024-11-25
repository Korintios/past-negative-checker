import React from 'react'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

interface AlertProps {
  type: 'success' | 'error' | 'info';
  title: string;
  description: React.ReactNode;
}

export function Alert({ type, title, description }: AlertProps) {
  const alertStyles = {
    success: 'bg-green-50 text-green-800',
    error: 'bg-red-50 text-red-800',
    info: 'bg-gray-100 text-gray-800'
  }

  const iconStyles = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-gray-400'
  }

  return (
    <div className={`p-4 rounded-lg ${alertStyles[type]} mb-4`} role="alert">
      <div className="flex items-center">
        {type === 'success' && <CheckCircle className={`h-5 w-5 ${iconStyles[type]} mr-2`} />}
        {type === 'error' && <AlertCircle className={`h-5 w-5 ${iconStyles[type]} mr-2`} />}
        {type === 'info' && <Info className={`h-5 w-5 ${iconStyles[type]} mr-2`} />}
        <h3 className={`text-lg font-medium ${alertStyles[type]}`}>
          {title}
        </h3>
      </div>
      <div className={`mt-2 text-sm ${type === 'success' ? 'text-green-700' : type === 'error' ? 'text-red-700' : 'text-gray-700'}`}>
        {description}
      </div>
    </div>
  )
}

