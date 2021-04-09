
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default observer(function ActivityForm(){
    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState(   {
        id: '',
        title: '',
        category: '',
        description: '', 
        date: '', 
        city: '', 
        venue: '',
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
        console.log(id, "use effect")
    }, [id, loadActivity])

    if (loadingInitial) <LoadingComponent content='Loading activity...'/>

    function handleSubmit(){
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            console.log(id);
            createActivity(newActivity).then(() => {
                console.log('create new activity');
                history.push(`/activities/${newActivity.id}`);
            });
        } else {
            updateActivity(activity).then(() => {
                history.push(`/activities/${activity.id}`);
            })
        } 
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        console.log('name', name, 'value', value);
        setActivity({...activity, [name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category'onChange={handleInputChange}/>
                <Form.Input type='Date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input vaplaceholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})