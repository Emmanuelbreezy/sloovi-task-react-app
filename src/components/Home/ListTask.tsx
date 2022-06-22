import React, { useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { useAppSelector } from '../../redux/store/hook';
import { useFetchAllTaskQuery } from '../../redux/store/services/taskApis.services';
import AlertCustom from '../Alert/Alert';
import AddOrEdit_Task from './Add_Edit_Task';
import AllTask from './AllTask';


 const ListTask = () => {

  const [switchComponent, setSwitchComponent] = useState<string>('all');
  const [taskId, setTaskId] = useState<{id:string}>({id: ''});
  
  const { companyId,accessToken } = useAppSelector(state => state.auth.authentication);
  const  {data,isLoading, isSuccess, isError} =  useFetchAllTaskQuery({companyId,accessToken}, {skip: !companyId });

  const handleAddTask = (type:string) => setSwitchComponent(type);

  return (
    <div className="list-task-container">
       {isError && <AlertCustom type="danger" message={'Error Occur, Try again'} />}
        <Card>
          <Card.Body>
             <div className="list-task-content-nav">
                <div className="list-task-leftnav">
                  <span className="list-task-title">Tasks</span>
                  <span className="list-task-nocount ms-2">
                    {isSuccess && data && data.results.length}
                    {isLoading && <Spinner size="sm" animation="border" variant="secondary" /> }
                  </span>
                </div>
                <div className="list-task-icon button-div">
                  <button disabled={switchComponent === 'add' || switchComponent === 'edit' ? true : false} onClick={() => handleAddTask('add')}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="feather feather-plus">
                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>
             </div>

             <div className="list-task-body">
               {switchComponent === "all" && <>{isLoading ? 'Loading...' : (<AllTask data={isSuccess && data ? data.results : [] } 
                                                    onClick={handleAddTask} 
                                                    setTaskId={setTaskId}
                                                />)}</>}
               {switchComponent === "add" && <AddOrEdit_Task type="add"  onClick={handleAddTask}/>}
               {switchComponent === "edit" && <AddOrEdit_Task type="edit" taskId={taskId.id}   onClick={handleAddTask}/>}
             </div>
          </Card.Body>
        </Card>
    </div>
  )
}

export default ListTask;
