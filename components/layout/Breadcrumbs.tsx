'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="py-3">
            <div className="flex items-center text-sm text-gray-400">
              {items.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && (
                    <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-xs text-gray-600" />
                  )}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-green-400">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gray-300">{item.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

