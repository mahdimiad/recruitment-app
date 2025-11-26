import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="bg-gray-800 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href="#about" className="text-base text-gray-400 hover:text-primary-400">
              About
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/jobs" className="text-base text-gray-400 hover:text-primary-400">
              Jobs
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#contact" className="text-base text-gray-400 hover:text-primary-400">
              Contact
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#blog" className="text-base text-gray-400 hover:text-primary-400">
              Blog
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#employers" className="text-base text-gray-400 hover:text-primary-400">
              For Employers
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#privacy" className="text-base text-gray-400 hover:text-primary-400">
              Privacy
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#terms" className="text-base text-gray-400 hover:text-primary-400">
              Terms
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <Link href="#" className="text-gray-400 hover:text-primary-400">
            <span className="sr-only">Facebook</span>
            <FontAwesomeIcon icon={faFacebook} className="text-xl" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-primary-400">
            <span className="sr-only">Instagram</span>
            <FontAwesomeIcon icon={faInstagram} className="text-xl" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-primary-400">
            <span className="sr-only">Twitter</span>
            <FontAwesomeIcon icon={faTwitter} className="text-xl" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-primary-400">
            <span className="sr-only">LinkedIn</span>
            <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
          </Link>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2025 Talentust, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

