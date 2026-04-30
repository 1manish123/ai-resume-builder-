import { Loader2, Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const SkillsForm = ({ data, onChange }) => {
    const { token } = useSelector(state => state.auth)
    const [newSkill, setNewSkill] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

     const addSkill = () => {
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data, newSkill.trim()])
            setNewSkill("")
        }
     }

      const removeSkill = (indexToRemove)=>{
        onChange(data.filter((_, index)=> index !== indexToRemove))
      }

      const handleKeyPress = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            addSkill();
        }
      }

      const generateSkills = async () => {
        setIsGenerating(true)
        const prompt = data.length > 0 ? `I have these skills: ${data.join(', ')}. Suggest 5-7 more highly relevant professional skills that complement these. Return them as a comma-separated list.` : `Suggest 8-10 highly sought-after professional skills for a modern resume. Return them as a comma-separated list.`

        try {
            const { data: responseData } = await api.post('api/ai/enhance-text', {userContent: prompt, context: "skills list"}, { headers: { Authorization: token } })
            // Parse comma separated list and add new unique skills
            const newSkillsList = responseData.enhancedContent.split(',').map(s => s.trim()).filter(s => s && !data.includes(s));
            if(newSkillsList.length > 0){
                onChange([...data, ...newSkillsList])
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsGenerating(false)
        }
      }
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100'> Skills </h3>
            <p className='text-sm text-gray-500'> Add your technical and soft skills </p>
        </div>
        <button onClick={generateSkills} disabled={isGenerating} className='flex items-center gap-1 px-3 py-1.5 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors disabled:opacity-50'>
            {isGenerating ? <Loader2 className="size-4 animate-spin"/> : <Sparkles className="size-4"/>}
            Enhance with AI
        </button>
      </div>

      <div className="flex gap-2">
            <input type="text" placeholder="Enter a skill (e.g., JavaScript, Project Management)" className='flex-1 px-3 py-2 text-sm'
            onChange={(e)=>setNewSkill(e.target.value)}
            value={newSkill}
            onKeyDown={handleKeyPress}
            />
            <button onClick={addSkill} disabled={!newSkill.trim} className='flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                <Plus className="size-4"/> Add
            </button>
      </div>

      {data.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
            {data.map((skill, index)=>(
                <span key={index} className='flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
                    {skill}
                    <button onClick={()=> removeSkill(index)} className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                        <X className="w-3 h-3" />
                    </button>
                </span>
            ))}
        </div>
      )
    :
    (
        <div className='text-center py-6 text-gray-500'>
            <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300"/>
            <p>No skills added yet.</p>
            <p className="text-sm">Add your technical and soft skills above.</p>
        </div>
    )}

    <div className='bg-blue-50 p-3 rounded-lg'>
        <p className='text-sm text-blue-800'><strong>Tip:</strong> Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).</p>
    </div>
    </div>
  )
}

export default SkillsForm
