import {createSlice} from "@reduxjs/toolkit";

 const priorityMap = {
  1: "low",
  2: "mid",
  3: "high",
};

const Taskslice=createSlice({
    name:"Task",
    initialState:{
        tasks:[],//array of tasks
    },
    reducers:{
        AddTask(state,action){
            const newData={
                id:Date.now(),
                complete:false,
                ...action.payload,

            }
            state.tasks.push(newData);
            state.tasks.sort((a,b)=>b.priority-a.priority);
        },
        Deletetask(state,action){
            state.tasks=state.tasks.filter(task=>task.id!==action.payload.id);
           
        },
        DeleteAllTask(state){
            state.tasks=[];

        },
        completedTask(state,action){
            state.tasks.map((obj)=>{ 
                if(obj.id===action.payload.id){
                    obj.complete=true;
                }
            })

            
        },
        undoTask(state,action){
            state.tasks.map((obj)=>{ 
                if(obj.id===action.payload.id){
                    obj.complete=false;
                }
            })
        },

        updateTask(state,action){
            state.tasks.map((obj)=>{
                if(obj.id===action.payload.id){
                    obj.task=action.payload.task;
                    obj.deadline=action.payload.deadline;
                    obj.priority=action.payload.priority;
                }
            })
            state.tasks.sort((a, b) => b.priority - a.priority);
        }


    }
});

export const {AddTask ,Deletetask,DeleteAllTask,completedTask,undoTask,updateTask}=Taskslice.actions;
export default Taskslice.reducer;