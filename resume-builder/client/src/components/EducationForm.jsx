import { GraduationCap, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const EducationForm = ({ data, onChange }) => {
    const { token } = useSelector(state => state.auth)
    const [generatingIndex, setGeneratingIndex] = useState(-1)

const addEducation = () =>{
    const newEducation = {
        institution: "",
        degree: "",
        field: "",
        graduation_date: "",
        gpa: "",
        description: ""
    };
    onChange([...data, newEducation])
}

const removeEducation = (index)=>{
    const updated = data.filter((_, i)=> i !== index);
    onChange(updated)
}

const updateEducation = (index, field, value)=>{
    const updated = [...data];
    updated[index] = {...updated[index], [field]: value}
    onChange(updated)
}

const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const education = data[index]
    const prompt = `enhance this education description/activities: ${education.description}. I studied ${education.degree} in ${education.field} at ${education.institution}.`

    try {
        const { data } = await api.post('api/ai/enhance-text', {userContent: prompt, context: "education description or academic achievements"}, { headers: { Authorization: token } })
        updateEducation(index, "description", data.enhancedContent)
    } catch (error) {
        toast.error(error.message)
    } finally {
        setGeneratingIndex(-1)
    }
}

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Education </h3>
            <p className='text-sm text-gray-500'>Add your education details</p>
        </div>
        <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
            <Plus className="size-4"/>
            Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
            <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300"/>
            <p>No education added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      ): (
        <div className='space-y-4'>
            {data.map((education, index)=>(
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className='flex justify-between items-start'>
                        <h4>Education #{index + 1}</h4>
                        <button onClick={()=> removeEducation(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                            <Trash2 className="size-4"/>
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-3'>

                        <input value={education.institution || ""} onChange={(e)=>updateEducation(index, "institution", e.target.value)} type="text" placeholder="Institution Name" className="px-3 py-2 text-sm"/>

                        <input value={education.degree || ""} onChange={(e)=>updateEducation(index, "degree", e.target.value)} type="text" placeholder="Degree (e.g., Bachelor's, Master's)" className="px-3 py-2 text-sm"/>

                        <input value={education.field || ""} onChange={(e)=>updateEducation(index, "field", e.target.value)} type="text" className="px-3 py-2 text-sm" placeholder="Field of Study"/>

                        <input value={education.graduation_date || ""} onChange={(e)=>updateEducation(index, "graduation_date", e.target.value)} type="month" className="px-3 py-2 text-sm"/>
                    </div>

                    <input value={education.gpa || ""} onChange={(e)=>updateEducation(index, "gpa", e.target.value)} type="text" className="px-3 py-2 text-sm" placeholder="GPA (optional)"/>
                    
                    <div className="space-y-2">
                        <div className='flex items-center justify-between'>
                            <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Achievements / Coursework</label>
                            <button onClick={()=> generateDescription(index)} disabled={generatingIndex === index || !education.institution} className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors disabled:opacity-50'>
                                {generatingIndex === index ? (
                                    <Loader2 className="w-3 h-3 animate-spin"/>
                                ): (
                                    <Sparkles className='w-3 h-3'/>
                                )}
                                Enhance with AI
                            </button>
                        </div>
                        <textarea value={education.description || ""} onChange={(e)=> updateEducation(index, "description", e.target.value)} rows={3} className="w-full text-sm px-3 py-2 rounded-lg resize-none" placeholder="Describe relevant coursework, honors, or activities..."/>
                    </div>

                </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm
