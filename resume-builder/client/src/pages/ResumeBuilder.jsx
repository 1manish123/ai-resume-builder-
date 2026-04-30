import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import ResumeAnalysisModal from '../components/ResumeAnalysisModal'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {

  const { resumeId } = useParams()
  const {token} = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  })

  const loadExistingResume = async () => {
   try {
    const {data} = await api.get('/api/resumes/get/' + resumeId, {headers: { Authorization: token }})
    if(data.resume){
      setResumeData(data.resume)
      document.title = data.resume.title;
    }
   } catch (error) {
    console.log(error.message)
   }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false);
  
  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAnalysisModal, setShowAnalysisModal] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(()=>{
    loadExistingResume()
  },[])

  const changeResumeVisibility = async () => {
    try {
       const formData = new FormData()
       formData.append("resumeId", resumeId)
       formData.append("resumeData", JSON.stringify({public: !resumeData.public}))

       const {data} = await api.put('/api/resumes/update', formData, {headers: { Authorization: token }})

       setResumeData({...resumeData, public: !resumeData.public})
       toast.success(data.message)
    } catch (error) {
      console.error("Error saving resume:", error)
    }
  }

  const handleShare = () =>{
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if(navigator.share){
      navigator.share({url: resumeUrl, text: "My Resume", })
    }else{
      alert('Share not supported on this browser.')
    }
  }

  const downloadResume = ()=>{
    window.print();
  }


const saveResume = async () => {
  try {
    let updatedResumeData = structuredClone(resumeData)

    // remove image from updatedResumeData
    if(typeof resumeData.personal_info.image === 'object'){
      delete updatedResumeData.personal_info.image
    }

    const formData = new FormData();
    formData.append("resumeId", resumeId)
    formData.append('resumeData', JSON.stringify(updatedResumeData))
    removeBackground && formData.append("removeBackground", "yes");
    typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image)

    const { data } = await api.put('/api/resumes/update', formData, {headers: { Authorization: token }})

    setResumeData(data.resume)
    toast.success(data.message)
  } catch (error) {
    console.error("Error saving resume:", error)
  }
}

const handleAnalyzeResume = async () => {
    setIsAnalyzing(true)
    toast.loading("Analyzing your resume...", { id: "analyze" })
    try {
        const { data } = await api.post('/api/ai/analyze-resume', { resumeData }, { headers: { Authorization: token } })
        setAnalysisData(data.analysis)
        toast.success("Analysis complete!", { id: "analyze" })
        setShowAnalysisModal(true)
    } catch (error) {
        toast.error(error.response?.data?.message || error.message, { id: "analyze" })
        console.error("Analysis error:", error)
    } finally {
        setIsAnalyzing(false)
    }
}

  return (
    <div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-all font-medium'>
          <ArrowLeftIcon className="size-4"/> Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left Panel - Form */}
          <div className='relative lg:col-span-5 rounded-2xl overflow-hidden'>
            <div className='bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 p-6 pt-1 transition-colors'>
              {/* progress bar using activeSectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-100 dark:border-slate-800"/>
              <hr className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 border-none transition-all duration-700 ease-out" style={{width: `${activeSectionIndex * 100 / (sections.length - 1)}%`}}/>

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-slate-800 py-3">

                <div className='flex items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=> setResumeData(prev => ({...prev, template}))}/>
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color)=>setResumeData(prev => ({...prev, accent_color: color}))}/>
                </div>

                <div className='flex items-center gap-2'>
                  {activeSectionIndex !== 0 && (
                    <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.max(prevIndex - 1, 0))} className='flex items-center justify-center p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all' disabled={activeSectionIndex === 0}>
                      <ChevronLeft className="size-5"/>
                    </button>
                  )}
                  <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.min(prevIndex + 1, sections.length - 1))} className={`flex items-center justify-center p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === sections.length - 1}>
                      <ChevronRight className="size-5"/>
                    </button>
                </div>
              </div>

              {/* Form Content */}
              <div className='space-y-6'>
                  {activeSection.id === 'personal' && (
                    <PersonalInfoForm data={resumeData.personal_info} onChange={(data)=>setResumeData(prev => ({...prev, personal_info: data }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                  )}
                  {activeSection.id === 'summary' && (
                    <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data)=> setResumeData(prev=> ({...prev, professional_summary: data}))} setResumeData={setResumeData}/>
                  )}
                  {activeSection.id === 'experience' && (
                    <ExperienceForm data={resumeData.experience} onChange={(data)=> setResumeData(prev=> ({...prev, experience: data}))}/>
                  )}
                  {activeSection.id === 'education' && (
                    <EducationForm data={resumeData.education} onChange={(data)=> setResumeData(prev=> ({...prev, education: data}))}/>
                  )}
                  {activeSection.id === 'projects' && (
                    <ProjectForm data={resumeData.project} onChange={(data)=> setResumeData(prev=> ({...prev, project: data}))}/>
                  )}
                  {activeSection.id === 'skills' && (
                    <SkillsForm data={resumeData.skills} onChange={(data)=> setResumeData(prev=> ({...prev, skills: data}))}/>
                  )}
                  
              </div>
              <button onClick={()=> {toast.promise(saveResume, {loading: 'Saving...'})}} className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all rounded-xl px-6 py-3 mt-8 text-sm font-medium flex justify-center items-center gap-2'>
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
              <div className='relative w-full mb-6'>
                <div className='flex flex-wrap items-center justify-end gap-3'>
                    <button onClick={handleAnalyzeResume} disabled={isAnalyzing} className='flex items-center p-2 px-4 gap-2 text-xs font-medium bg-gradient-to-r from-orange-100 to-amber-200 dark:from-orange-900/30 dark:to-amber-900/30 text-orange-700 dark:text-orange-400 rounded-lg ring-1 ring-orange-300/50 dark:ring-orange-700/50 hover:ring-orange-400 dark:hover:ring-orange-600 transition-all disabled:opacity-50'>
                        {isAnalyzing ? <Sparkles className="size-4 animate-spin"/> : <Sparkles className='size-4'/>}
                        Analyze Resume
                    </button>
                    {resumeData.public && (
                      <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs font-medium bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 rounded-lg ring-1 ring-blue-300 dark:ring-blue-700/50 hover:ring-blue-400 dark:hover:ring-blue-600 transition-all'>
                        <Share2Icon className='size-4'/> Share
                      </button>
                    )}
                    <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs font-medium bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-600 dark:text-purple-400 ring-1 ring-purple-300 dark:ring-purple-700/50 rounded-lg hover:ring-purple-400 dark:hover:ring-purple-600 transition-all'>
                      {resumeData.public ? <EyeIcon className="size-4"/> : <EyeOffIcon className="size-4"/>}
                      {resumeData.public ? 'Public' : 'Private'}
                    </button>
                    <button onClick={downloadResume} className='flex items-center gap-2 px-6 py-2 text-xs font-medium bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-900/30 dark:to-teal-800/30 text-emerald-700 dark:text-emerald-400 rounded-lg ring-1 ring-emerald-300 dark:ring-emerald-700/50 hover:ring-emerald-400 dark:hover:ring-emerald-600 transition-all'>
                      <DownloadIcon className='size-4'/> Download
                    </button>
                </div>
              </div>

              <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color}/>
          </div>
        </div>
      </div>
      
      <ResumeAnalysisModal isOpen={showAnalysisModal} onClose={() => setShowAnalysisModal(false)} analysisData={analysisData} />
    </div>
  )
}

export default ResumeBuilder
