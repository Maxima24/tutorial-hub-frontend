import {create} from 'zustand'

import { Tutorial, TutorialStore } from '@/interfaces/tutorialInterface';
import tutorials  from '@/data/tuturial-mock-data';

export const useTutorialsStore = create<TutorialStore>((set,get) => ({
      tutorials:tutorials,
      searchedTutorial:null,
    addTutorialDetails:(tutorial)=>set((state)=>({
        tutorials:[...state.tutorials,tutorial]
    })),
    editTutorialDetails:(id:string,updatedData:Tutorial)=>set((state)=>({
        tutorials:state.tutorials.map((tut)=> tut.id === id ? {...tut,updatedData}:tut)
    }))
    ,
    deleteTutorialDetails:(id:string)=>set((state)=>({
        tutorials:state.tutorials.filter((tut)=>tut.id !== id)
    })),
    getTutorialById:(id:string)=>{
        const {tutorials} = get()
        const tutorial = tutorials.find((tut)=>tut.id === id) || null
        set({searchedTutorial:tutorial})
    }
}));

export default useTutorialsStore