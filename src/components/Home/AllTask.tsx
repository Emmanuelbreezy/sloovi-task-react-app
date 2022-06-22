import React from 'react'

 const AllTask = (props:{data:any; onClick: (type: string) => void; setTaskId: ({id}:{id:string}) => void}) => {

    const recalibrate = (data:any) =>{
        const newArr = []
        for (let i = (data.length - 1); i >= 0; i--) {
            newArr.push(data[i])
        }
        return newArr
        }


  return (
    <div className="alltask-container-list">
        <ul className="alltask-list-ul">
            {props.data && recalibrate(props.data).map((item:any) => {
                return (
                   <li className="task-item">
                        <div className="task-item-left">
                            <div className="task-item-left-img">
                                <img src="" alt=''/>
                            </div>
                            <div className="task-item-left-content">
                                <h5>{item.task_msg}</h5>
                                <span>{item.task_date}</span>
                            </div>
                        </div>
                        <div className="task-item-right">
                            <button className="edit-task-item me-1" 
                                                onClick={() => {
                                                    props.onClick('edit');
                                                    props.setTaskId({id: item.id});
                                                }}>
                               <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2">
                                   <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                               </svg>
                            </button>
                            {/* <button className="check-task-item">
                            </button> */}
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default AllTask;
