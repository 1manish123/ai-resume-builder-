import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

  const {user, token} = useSelector(state => state.auth)

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () =>{
    try {
      const { data } = await api.get('/api/users/resumes', {headers: { Authorization: token }})
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (event) => {
   try {
    event.preventDefault()
    const { data } = await api.post('/api/resumes/create', {title}, {headers: { Authorization: token }})
    setAllResumes([...allResumes, data.resume])
    setTitle('')
    setShowCreateResume(false)
    navigate(`/app/builder/${data.resume._id}`)
   } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
   }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', {title, resumeText}, {headers: { Authorization: token }})
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault()
      const {data} = await api.put(`/api/resumes/update`, {resumeId: editResumeId, resumeData: { title }}, {headers: { Authorization: token }})
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
     
  }

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
     if(confirm){
      const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers: { Authorization: token }})
      setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
      toast.success(data.message)
     }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
     
  }

  useEffect(()=>{
    loadAllResumes()
  },[])

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>

        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-200 dark:to-slate-300 bg-clip-text text-transparent sm:hidden'>Welcome, Joe Doe</p>

        <div className='flex gap-4 '>
            <button onClick={()=> setShowCreateResume(true)} className='w-full bg-white dark:bg-slate-900 sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-2xl gap-2 text-slate-600 dark:text-slate-300 border border-dashed border-slate-300 dark:border-slate-700 group hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-lg dark:hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer'>
              <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full group-hover:scale-110'/>
              <p className='text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 font-medium'>Create Resume</p>
            </button>
            <button onClick={()=> setShowUploadResume(true)} className='w-full bg-white dark:bg-slate-900 sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-2xl gap-2 text-slate-600 dark:text-slate-300 border border-dashed border-slate-300 dark:border-slate-700 group hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-lg dark:hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer'>
              <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full group-hover:scale-110'/>
              <p className='text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300 font-medium'>Upload Existing</p>
            </button>
        </div>

      <hr className='border-slate-200 dark:border-slate-800 my-6 sm:w-[305px]' />

      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4 ">
        {allResumes.map((resume, index)=>{
          const baseColor = colors[index % colors.length];
          return (
            <button key={index} onClick={()=> navigate(`/app/builder/${resume._id}`)} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-2xl gap-2 border group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white dark:bg-slate-900' style={{borderColor: baseColor + '40'}}>

              <div className="absolute inset-0 opacity-10 dark:opacity-5 rounded-2xl pointer-events-none" style={{background: `linear-gradient(135deg, ${baseColor}, transparent)`}}></div>

              <FilePenLineIcon className="size-7 group-hover:scale-110 transition-transform " style={{ color: baseColor }}/>
              <p className='text-sm group-hover:scale-105 transition-transform px-2 text-center font-medium' style={{ color: baseColor }}>{resume.title}</p>
              <p className='absolute bottom-2 text-[10px] text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400 transition-colors duration-300 px-2 text-center uppercase tracking-wide'>
                 {new Date(resume.updatedAt).toLocaleDateString()}
              </p>
              <div onClick={e=> e.stopPropagation()} className='absolute top-2 right-2 group-hover:flex items-center hidden gap-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm'>
                <TrashIcon onClick={()=>deleteResume(resume._id)} className="size-5 p-1 hover:text-red-500 rounded text-slate-500 dark:text-slate-400 transition-colors"/>
                <PencilIcon onClick={()=> {setEditResumeId(resume._id); setTitle(resume.title)}} className="size-5 p-1 hover:text-blue-500 rounded text-slate-500 dark:text-slate-400 transition-colors"/>
              </div>
            </button>
          )
        })}
      </div>

        {showCreateResume && (
          <form onSubmit={createResume} onClick={()=> setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
              <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required/>

              <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Create Resume</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=> {setShowCreateResume(false); setTitle('')}}/>
            </div>
          </form>
        )
        }

        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={()=> setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
              <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required/>
                <div>
                  <label htmlFor="resume-input" className="block text-sm text-slate-700">
                    Select resume file
                    <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
                      {resume ? (
                        <p className='text-green-700'>{resume.name}</p>
                      ) : (
                        <>
                          <UploadCloud className='size-14 stroke-1'/>
                          <p>Upload resume</p>
                        </>
                      )}
                    </div>
                  </label>
                  <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e)=> setResume(e.target.files[0])}/>
                </div>
              <button disabled={isLoading} className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2'>
                {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
                {isLoading ? 'Uploading...' : 'Upload Resume'}
                
                </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=> {setShowUploadResume(false); setTitle('')}}/>
            </div>
          </form>
        )
        }

        {editResumeId && (
          <form onSubmit={editTitle} onClick={()=> setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
              <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required/>

              <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Update</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=> {setEditResumeId(''); setTitle('')}}/>
            </div>
          </form>
        )
        }
      
      </div>
    </div>
  )
}

export default Dashboard
