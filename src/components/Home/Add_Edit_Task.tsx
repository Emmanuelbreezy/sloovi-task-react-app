import React, { useEffect, useRef, useState } from 'react'
import  {getIn, useFormik} from 'formik';
import { Button, Col, Form, Overlay, Row, Spinner } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import SelectDropdown from './components/SelectDropdown';
import { useAppSelector } from '../../redux/store/hook';
import { useAddNewTaskMutation, useDeleteSingleTaskMutation, useFetchAllTeamByCompanyIdQuery, useFetchSingleTaskQuery, useUpdateTaskMutation } from '../../redux/store/services/taskApis.services';
import AddEditFormValidation from '../../validations/schema/index.schema';
import { secondsToHms } from '../../utils';
import { AnyMap } from 'immer/dist/internal';
import CustomOverlay from '../Overlay/Overlay';


interface initialValuesPropsType  {
  assigned_user: string;
  task_date: Date;
  task_time: null | Date;
  time_zone: number;
  is_completed: number;
  task_msg: string;
}

const mapAssignUserData = (data: any) => {
  return data && data.map((item: any) => (
      {
          value: item.id,
          label: item.name
      }
  ));

}

 


 const AddOrEdit_Task = ({type,taskId, onClick
                          }:{type: string; taskId?: string | null ; onClick: (type: string) => void}) => {

   const [userOptions, setUserOptions] = useState<any>(null);
   const [initialValues, setInitialValues] = useState<initialValuesPropsType>({   
                  assigned_user: '',
                  task_date: new Date(),
                  task_time: new Date(),
                  time_zone: 18000,
                  is_completed: 0,
                  task_msg: 'follow up',
                  
                })




  const { companyId,accessToken } = useAppSelector(state => state.auth.authentication);
  const  {data,isLoading, isFetching, isError} =  useFetchAllTeamByCompanyIdQuery({companyId,accessToken}, {skip: !companyId });

   //API Mutation Adding New Task
   const [addNewTask, result] = useAddNewTaskMutation();

   //API Mutation Deleting Task
   const [deleteSingleTask, deleteResult] = useDeleteSingleTaskMutation();
   
   //API Query Single Task
   const singleTaskResult = useFetchSingleTaskQuery({taskId:taskId,companyId:companyId,accessToken:accessToken}, 
                                                     {skip: !taskId });
  
                                                     //Mutation Updating  Task
   const [updateTask , updateResult]  = useUpdateTaskMutation();


  const defaultValue = (options: any, val: string) => {
    return options ? options.find((option: any) => option.value === val) : "";
  }

  const reference =  useRef<any>(null);



  useEffect(() => {

    if (data) {
          const _data = data.results.data;
          const objs = mapAssignUserData(_data);
          setUserOptions(objs);
    }

    //Check if Editable Update the fields
    if(type === 'edit' && singleTaskResult?.isSuccess) {
        const _result = singleTaskResult.data.results

        const currentDropdown = {
          value: _result.assigned_user,
          label: _result.assigned_user_name
       }

       reference.current.setValue({...currentDropdown})

        setInitialValues({
          ...initialValues,
          assigned_user: _result.assigned_user,
          task_date: new Date(_result.task_date),
          task_time: new Date(_result.task_time * 1000),
          time_zone: 18000,
          is_completed: 0,
          task_msg: _result.task_msg, 
        })
       
    }

  },[data,type, singleTaskResult?.isSuccess]);


  const handleDelete = (accessToken:string, taskId:string | null | undefined, companyId:string) => {
    if(type === 'edit' && taskId && companyId && accessToken) {
      deleteSingleTask({
        accessToken:accessToken,
        taskId:taskId,
        companyId:companyId
      });
    }
  }

  const filterPassedTime = (time:any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };



  const formik = useFormik({
    initialValues:initialValues,
    enableReinitialize: true,
    validationSchema: AddEditFormValidation(),
      onSubmit: values => {

        if(values.task_time){
           // Convert time to seconds
          const date = new Date(values.task_time);
          const seconds = Math.floor(date.getTime() / 1000);

          // Format date to YYYY-MM-DD format
          const formatted_Date = new Date(values.task_date).toISOString().slice(0, 10);

          const data = {
            assigned_user: values.assigned_user,
            task_date: formatted_Date,
            task_time: seconds,
            time_zone: values.time_zone,
            is_completed: values.is_completed,
            task_msg: values.task_msg,
          };

           // Initialize the Add new Api function
          if(type === 'add'){
            console.log(type);
              addNewTask({data,accessToken,companyId });
          }

          // Initialize the Update api function
          if(type === 'edit' && taskId){
              updateTask({
                data:data,
                accessToken:accessToken,
                taskId:taskId,
                companyId:companyId
            });
              
          }

    }

  }
});

    //Add New Task Success Message
    if(result?.isSuccess){
      onClick('all');
    }

    //Update Task Success Message
    if(updateResult?.isSuccess){
       onClick('all');
    }

    //Delete Task Success Message
    if(deleteResult?.isSuccess){
       onClick('all');
    }

 

  return (
    <div className="add_or_edit-task-container position-relative">
         <div className="add_or_edit-task-content">
           <Form noValidate onSubmit={formik.handleSubmit} className="slv-add-task-form">
                <Form.Group className="mb-3">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control className="form-task_msg" type="text" placeholder="Follow up"
                          autoComplete='off'
                          name='task_msg'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.task_msg}
                          isInvalid={!!formik.errors.task_msg}
                          disabled={result?.isLoading || updateResult?.isLoading || singleTaskResult?.isLoading ? true : false}
                    />
                    {  getIn(formik.errors, 'task_msg') ? (
                                <Form.Control.Feedback type="invalid" className="invalid-fbk">
                                    {formik.errors.task_msg}
                                </Form.Control.Feedback>
                            ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Row>
                       <Col xs={12} lg={6}>
                         <Form.Label>Date</Form.Label>
                          <Form.Control type="date" placeholder="Date"
                                as={DatePicker}
                                autoComplete='off'
                                name='task_date'
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.task_date}
                                selected={formik.values.task_date} 
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                disabled={result?.isLoading || updateResult?.isLoading || singleTaskResult?.isLoading ? true : false}
                                onChange={(date) => {
                                  console.log(date,'date')
                                  formik.setFieldValue('task_date',  date);

                                }}
                          />

                            {  getIn(formik.errors, 'task_date') ? (
                                <div className="invalid-fbk">
                                    
                                </div>
                            ) : null}

                        </Col>

                       <Col  xs={12} lg={6}>
                          <Form.Label>Time</Form.Label>
                          <Form.Control type="time" placeholder="Time"
                                as={DatePicker}
                                autoComplete='off'
                                name='task_time'
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.task_time}
                                disabled={result?.isLoading || updateResult?.isLoading || singleTaskResult?.isLoading ? true : false}
                                showTimeSelect
                                showTimeSelectOnly
                                timeInputLabel="Time:"
                                minDate={new Date()}
                                filterTime={filterPassedTime}
                                timeIntervals={1}
                                dateFormat="h:mm aa"
                                timeCaption="Time"
                                selected={formik.values.task_time}
                                onChange={(date) => {
                                  formik.setFieldValue('task_time',  date);
                                }}
                          />
                            {  getIn(formik.errors, 'task_time') ? (
                                <div className="invalid-fbk">
                                    {formik.errors.task_time}
                                </div>
                            ) : null}
                       </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Assign User</Form.Label>
                     <SelectDropdown 
                      reference={reference}
                        className="custom-select"
                        placeholder="Select Assign User"
                        isLoading={isLoading && isFetching}
                        noOptionsMessage={() => isError ? 'Could not load, refresh' : 'No User Found'}
                        value={userOptions ? defaultValue(userOptions, formik.values.assigned_user) : ''}
                        options={userOptions ? userOptions : []}
                        onBlur={formik.handleBlur}
                        isDisabled={result?.isLoading || updateResult?.isLoading || singleTaskResult?.isLoading ? true : false}
                        onChanged={(value: any) => {
                              formik.setFieldValue('assigned_user',  value.value);
                        }}
                     />
                       {  getIn(formik.errors, 'assigned_user') ? (
                                <div className="invalid-fbk">
                                    {formik.errors.assigned_user}
                                </div>
                            ) : null}
                </Form.Group>

                <Form.Group className="mb-1 form-button-group">
                 {type === 'edit' && (<div className="delete_task_div">
                    <button type="button" className="delete_task_button" onClick={() => handleDelete(accessToken,taskId,companyId)}>
                      {deleteResult?.isLoading 
                            ? (<div className="d-flex align-items-center justify-content-center">
                                  <Spinner size="sm" animation="border" variant="secondary" /></div>) 
                            :(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
                                <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>)
                      }
                      </button>
                  </div>)
                }

                  <div className="button-group-div">
                    <Button 
                      onClick={() => {
                          onClick('all');
                        
                      }} className="form-cancel-button">Cancel</Button>

                    <Button type="submit" className="form-save-button ms-2"> 
                      {result?.isLoading  || updateResult?.isLoading
                          ? (<div className="d-flex align-items-center justify-content-center">
                                <Spinner size="sm" animation="border" variant="secondary" /></div>) 
                          :(<span>Save</span>)
                                }
                    </Button>
                  </div>
                </Form.Group>

            </Form>
                
         </div>

         
         {singleTaskResult?.isLoading && (
          <CustomOverlay>
              <Spinner  animation="border" variant="secondary" style={{width: "2rem", height: "2rem"}} />
          </CustomOverlay>
         )}
</div>
  )
}


export default AddOrEdit_Task;