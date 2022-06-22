import * as Yup from 'yup';

const AddEditFormValidation = () => Yup.object({
    assigned_user: Yup.string()
                    .required('Assign a User field is required'),
    task_msg: Yup.string()
                  .required('Task description field is required'),

    task_date: Yup.date()
                  .required('Date field is required'),
    task_time: Yup.string()
                .test(
                    'not empty',
                    'Time field cant be empty',
                    function(value) {
                        return !!value;
                    }
                )
                .nullable()
                  .required('Time field is required')
});


export default AddEditFormValidation;