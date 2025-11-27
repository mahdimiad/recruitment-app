'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperPlane,
  faChevronDown,
  faTimes,
  faInfoCircle,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { createJob } from '@/lib/mock-db'

export default function NewJobPage() {
  const router = useRouter()
  const [saveAsOpen, setSaveAsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    job_type: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'internship' | 'temporary',
    location: '',
    remote: false,
    salary_min: '',
    salary_max: '',
    salary_display: 'show' as 'show' | 'hide',
    description: '',
    required_skills: [] as string[],
    nice_to_have_skills: [] as string[],
    min_experience: '3',
    education: 'bachelor',
    preferred_industries: [] as string[],
    skills_weight: 50,
    experience_weight: 30,
    education_weight: 10,
    industry_weight: 10,
  })
  const [skillInput, setSkillInput] = useState('')
  const [niceToHaveInput, setNiceToHaveInput] = useState('')
  const [industryInput, setIndustryInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [createdJobId, setCreatedJobId] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSliderChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addSkill = (skill: string, type: 'required' | 'nice-to-have') => {
    const trimmed = skill.trim()
    if (!trimmed) return
    
    if (type === 'required') {
      if (!formData.required_skills.includes(trimmed)) {
        setFormData(prev => ({
          ...prev,
          required_skills: [...prev.required_skills, trimmed],
        }))
        setSkillInput('')
      }
    } else {
      if (!formData.nice_to_have_skills.includes(trimmed)) {
        setFormData(prev => ({
          ...prev,
          nice_to_have_skills: [...prev.nice_to_have_skills, trimmed],
        }))
        setNiceToHaveInput('')
      }
    }
  }

  const removeSkill = (skill: string, type: 'required' | 'nice-to-have') => {
    if (type === 'required') {
      setFormData(prev => ({
        ...prev,
        required_skills: prev.required_skills.filter(s => s !== skill),
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        nice_to_have_skills: prev.nice_to_have_skills.filter(s => s !== skill),
      }))
    }
  }

  const addIndustry = (industry: string) => {
    const trimmed = industry.trim()
    if (!trimmed) return
    if (!formData.preferred_industries.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        preferred_industries: [...prev.preferred_industries, trimmed],
      }))
      setIndustryInput('')
    }
  }

  const removeIndustry = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_industries: prev.preferred_industries.filter(i => i !== industry),
    }))
  }

  const totalWeight = formData.skills_weight + formData.experience_weight + formData.education_weight + formData.industry_weight

  const handleSubmit = async (status: 'draft' | 'published') => {
    setLoading(true)
    try {
      // Create the job using mock-db
      const newJob = await createJob({
        company_id: 'company-1',
        title: formData.title,
        description: formData.description,
        location: formData.location || (formData.remote ? 'Remote' : 'Not specified'),
        job_type: formData.job_type === 'internship' || formData.job_type === 'temporary' 
          ? 'contract' 
          : formData.job_type,
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : 0,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : 0,
        status: status,
        created_by: 'user-1',
      })
      
      setCreatedJobId(newJob.id)
      setLoading(false)
      
      // Redirect to jobs list after a short delay to show success
      setTimeout(() => {
        router.push('/dashboard/jobs')
      }, 1500)
    } catch (error) {
      console.error('Failed to create job:', error)
      setLoading(false)
      alert('Failed to create job. Please try again.')
    }
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Jobs', href: '/dashboard/jobs' },
          { label: 'Create New Job', href: '#' },
        ]}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Create New Job Posting</h1>
            <div className="flex items-center space-x-3">
              {createdJobId && (
                <Link
                  href={`/dashboard/jobs/${createdJobId}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
                  title="View created job"
                >
                  <FontAwesomeIcon icon={faEye} className="mr-2 h-4 w-4" />
                  View Job
                </Link>
              )}
              <Link
                href="/dashboard/jobs"
                className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </Link>
              <div className="relative">
                <button
                  onClick={() => setSaveAsOpen(!saveAsOpen)}
                  className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
                >
                  Save As
                  <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-xs" />
                </button>
                {saveAsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-700 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          handleSubmit('draft')
                          setSaveAsOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Save as Draft
                      </button>
                      <button
                        onClick={() => {
                          // TODO: Implement template save
                          setSaveAsOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Save as Template
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleSubmit('published')}
                disabled={loading || totalWeight !== 100}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                {loading ? 'Publishing...' : 'Publish Job'}
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-gray-800 rounded-lg shadow-lg">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit('published') }}>
              {/* Basic Information Section */}
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-medium text-white mb-6">Basic Information</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Job Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                      Job Title <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g. Senior Frontend Developer"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-1">
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Department</option>
                      <option value="engineering">Engineering</option>
                      <option value="design">Design</option>
                      <option value="product">Product</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="hr">HR</option>
                      <option value="finance">Finance</option>
                    </select>
                  </div>

                  {/* Job Type */}
                  <div>
                    <label htmlFor="job_type" className="block text-sm font-medium text-gray-400 mb-1">
                      Job Type <span className="text-green-500">*</span>
                    </label>
                    <select
                      id="job_type"
                      name="job_type"
                      required
                      value={formData.job_type}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="full-time">Full-Time</option>
                      <option value="part-time">Part-Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="temporary">Temporary</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g. San Francisco, CA or Remote"
                    />
                  </div>

                  {/* Remote Option */}
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        id="remote"
                        name="remote"
                        type="checkbox"
                        checked={formData.remote}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-green-500 border-gray-600 rounded bg-gray-700 focus:ring-green-500"
                      />
                      <label htmlFor="remote" className="ml-2 text-sm text-gray-300">
                        Allow remote work for this position
                      </label>
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Salary Range</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="number"
                          id="salary_min"
                          name="salary_min"
                          value={formData.salary_min}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                          placeholder="Min Salary"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          id="salary_max"
                          name="salary_max"
                          value={formData.salary_max}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                          placeholder="Max Salary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Display Salary Option */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Salary Display</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="show-salary"
                          name="salary_display"
                          type="radio"
                          value="show"
                          checked={formData.salary_display === 'show'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-500 border-gray-600 bg-gray-700 focus:ring-green-500"
                        />
                        <label htmlFor="show-salary" className="ml-2 text-sm text-gray-300">
                          Show salary range in job post
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="hide-salary"
                          name="salary_display"
                          type="radio"
                          value="hide"
                          checked={formData.salary_display === 'hide'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-500 border-gray-600 bg-gray-700 focus:ring-green-500"
                        />
                        <label htmlFor="hide-salary" className="ml-2 text-sm text-gray-300">
                          Do not display salary
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="mt-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                    Job Description <span className="text-green-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="Describe the role, responsibilities, and ideal candidate..."
                  />
                </div>
              </div>

              {/* Skills & Requirements Section */}
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-medium text-white mb-6">Skills & Requirements</h2>

                {/* Required Skills */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Required Skills <span className="text-green-500">*</span>
                  </label>
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-700 border border-gray-600 rounded-md">
                      {formData.required_skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill, 'required')}
                            className="ml-2 text-gray-300 hover:text-white"
                          >
                            <FontAwesomeIcon icon={faTimes} className="text-xs" />
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault()
                            addSkill(skillInput, 'required')
                          }
                        }}
                        onBlur={() => {
                          if (skillInput.trim()) {
                            addSkill(skillInput, 'required')
                          }
                        }}
                        className="flex-grow bg-transparent border-none outline-none focus:ring-0 text-white placeholder-gray-500 min-w-[200px]"
                        placeholder="Type and press Enter to add skills..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-400">Separate skills with Enter or comma</p>
                    <button
                      type="button"
                      className="text-xs text-green-400 hover:text-green-300"
                    >
                      Browse common skills
                    </button>
                  </div>
                </div>

                {/* Nice-to-Have Skills */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Nice-to-Have Skills</label>
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-700 border border-gray-600 rounded-md">
                      {formData.nice_to_have_skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill, 'nice-to-have')}
                            className="ml-2 text-gray-300 hover:text-white"
                          >
                            <FontAwesomeIcon icon={faTimes} className="text-xs" />
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        value={niceToHaveInput}
                        onChange={(e) => setNiceToHaveInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault()
                            addSkill(niceToHaveInput, 'nice-to-have')
                          }
                        }}
                        onBlur={() => {
                          if (niceToHaveInput.trim()) {
                            addSkill(niceToHaveInput, 'nice-to-have')
                          }
                        }}
                        className="flex-grow bg-transparent border-none outline-none focus:ring-0 text-white placeholder-gray-500 min-w-[200px]"
                        placeholder="Type and press Enter to add skills..."
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Minimum Experience */}
                  <div>
                    <label htmlFor="min_experience" className="block text-sm font-medium text-gray-400 mb-1">
                      Minimum Experience <span className="text-green-500">*</span>
                    </label>
                    <select
                      id="min_experience"
                      name="min_experience"
                      required
                      value={formData.min_experience}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="0">No experience</option>
                      <option value="1">1+ years</option>
                      <option value="2">2+ years</option>
                      <option value="3">3+ years</option>
                      <option value="5">5+ years</option>
                      <option value="7">7+ years</option>
                      <option value="10">10+ years</option>
                    </select>
                  </div>

                  {/* Education Level */}
                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-400 mb-1">
                      Minimum Education
                    </label>
                    <select
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="none">No specific requirement</option>
                      <option value="high-school">High School</option>
                      <option value="associate">Associate Degree</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD or Doctorate</option>
                    </select>
                  </div>

                  {/* Preferred Industries */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Industries</label>
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-2 p-3 bg-gray-700 border border-gray-600 rounded-md">
                        {formData.preferred_industries.map((industry) => (
                          <div
                            key={industry}
                            className="flex items-center bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
                          >
                            {industry}
                            <button
                              type="button"
                              onClick={() => removeIndustry(industry)}
                              className="ml-2 text-gray-300 hover:text-white"
                            >
                              <FontAwesomeIcon icon={faTimes} className="text-xs" />
                            </button>
                          </div>
                        ))}
                        <input
                          type="text"
                          value={industryInput}
                          onChange={(e) => setIndustryInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                              e.preventDefault()
                              addIndustry(industryInput)
                            }
                          }}
                          onBlur={() => {
                            if (industryInput.trim()) {
                              addIndustry(industryInput)
                            }
                          }}
                          className="flex-grow bg-transparent border-none outline-none focus:ring-0 text-white placeholder-gray-500 min-w-[200px]"
                          placeholder="Type and press Enter to add industries..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scoring Configuration Section */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium text-white">Candidate Scoring Weights</h2>
                  <button
                    type="button"
                    className="text-sm text-green-400 hover:text-green-300 flex items-center"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                    How scoring works
                  </button>
                </div>

                <p className="text-gray-400 mb-6">
                  Adjust the weights to prioritize different aspects when scoring candidates. Total must equal 100%.
                </p>

                {/* Weight Sliders */}
                <div className="space-y-6">
                  {/* Skills Weight */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label htmlFor="skills-weight" className="text-sm font-medium text-white">
                        Skills Match
                      </label>
                      <span className="text-sm font-medium text-white">{formData.skills_weight}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.skills_weight}
                      step="5"
                      onChange={(e) => handleSliderChange('skills_weight', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${formData.skills_weight}%, #4b5563 ${formData.skills_weight}%, #4b5563 100%)`,
                      }}
                    />
                  </div>

                  {/* Experience Weight */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label htmlFor="experience-weight" className="text-sm font-medium text-white">
                        Experience
                      </label>
                      <span className="text-sm font-medium text-white">{formData.experience_weight}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.experience_weight}
                      step="5"
                      onChange={(e) => handleSliderChange('experience_weight', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${formData.experience_weight}%, #4b5563 ${formData.experience_weight}%, #4b5563 100%)`,
                      }}
                    />
                  </div>

                  {/* Education Weight */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label htmlFor="education-weight" className="text-sm font-medium text-white">
                        Education
                      </label>
                      <span className="text-sm font-medium text-white">{formData.education_weight}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.education_weight}
                      step="5"
                      onChange={(e) => handleSliderChange('education_weight', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${formData.education_weight}%, #4b5563 ${formData.education_weight}%, #4b5563 100%)`,
                      }}
                    />
                  </div>

                  {/* Industry Weight */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label htmlFor="industry-weight" className="text-sm font-medium text-white">
                        Industry Background
                      </label>
                      <span className="text-sm font-medium text-white">{formData.industry_weight}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.industry_weight}
                      step="5"
                      onChange={(e) => handleSliderChange('industry_weight', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #eab308 0%, #eab308 ${formData.industry_weight}%, #4b5563 ${formData.industry_weight}%, #4b5563 100%)`,
                      }}
                    />
                  </div>
                </div>

                {/* Total Weight Indicator */}
                <div className="mt-8 p-4 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">
                      <span className="font-medium">Total Weight:</span>
                      <span className={`ml-2 ${totalWeight === 100 ? 'text-green-400' : 'text-red-500'}`}>
                        {totalWeight}%
                      </span>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            skills_weight: 50,
                            experience_weight: 30,
                            education_weight: 10,
                            industry_weight: 10,
                          }))
                        }}
                        className="text-sm text-green-400 hover:text-green-300"
                      >
                        Reset to Default
                      </button>
                    </div>
                  </div>
                  {/* Weight bar visualization */}
                  <div className="mt-2 flex h-3 w-full rounded-full overflow-hidden">
                    <div className="bg-green-500" style={{ width: `${formData.skills_weight}%` }}></div>
                    <div className="bg-blue-500" style={{ width: `${formData.experience_weight}%` }}></div>
                    <div className="bg-purple-500" style={{ width: `${formData.education_weight}%` }}></div>
                    <div className="bg-yellow-500" style={{ width: `${formData.industry_weight}%` }}></div>
                  </div>
                  <div className="mt-2 flex text-xs justify-between">
                    <span className="text-green-400">Skills</span>
                    <span className="text-blue-400">Experience</span>
                    <span className="text-purple-400">Education</span>
                    <span className="text-yellow-400">Industry</span>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="p-6 bg-gray-900 rounded-b-lg border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      id="save-template"
                      type="checkbox"
                      className="h-5 w-5 text-green-500 border-gray-600 rounded bg-gray-700 focus:ring-green-500"
                    />
                    <label htmlFor="save-template" className="ml-2 text-sm text-gray-300">
                      Save as a template for future use
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => handleSubmit('draft')}
                      className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
                    >
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      disabled={loading || totalWeight !== 100}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                      Publish Job
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

