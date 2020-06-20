import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Button, Form, Label, FormGroup, Input, Alert, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import cameraIcon from '../../assets/camera.png';
import './event.css';

// Events page will show all the events

export default function Events({ history }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [thumbnail, setThumbnail] = useState(null);
	const [activities, setActivities] = useState('Activities');
	const [date, setDate] = useState('');
	const [errorMessage, setErrorMessage] = useState(false);
	const [success, setSuccess] = useState(false);

	const [dropdownOpen, setOpen] = useState(false);
	const user = localStorage.getItem('user');

	useEffect(() => {
		if(!user){
			history.push('./login');
		}
	},[])

  const toggle = () => setOpen(!dropdownOpen);

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null;
	}, [thumbnail]);

	console.log(title, description, price, thumbnail, activities, date);

	const submitHandler = async (evt) => {
		evt.preventDefault();
		const eventData = new FormData();

		eventData.append('thumbnail', thumbnail);
		eventData.append('title', title);
		eventData.append('description', description);
		eventData.append('price', price);
		eventData.append('activities', activities);
		eventData.append('date', date);

		try {
			if (
				title !== '' &&
				description !== '' &&
				price !== '' &&
				activities !== 'activities' &&
				date !== '' &&
				thumbnail !== null
			) {
				await api.post('/event', eventData, { headers: { user } });
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
					history.push("/");
				}, 2000);
			} else {
				setErrorMessage(true);
				setTimeout(() => {
					setErrorMessage(false);
				}, 2000);
			}
		} catch (error) {
			Promise.reject(error);
			console.log(error);
		}
	};
	const activitiesEventHandler = (activities) => setActivities(activities);
  console.log(activities)
	return (
		<Container>
			<Form onSubmit={submitHandler}>
				<FormGroup>
					<Label>Upload Image: </Label>
					<Label
						id='thumbnail'
						style={{ backgroundImage: `url(${preview})` }}
						className={thumbnail ? 'has-thumbnail' : ''}
					>
						<Input type='file' onChange={(evt) => setThumbnail(evt.target.files[0])} />
						<img src={cameraIcon} alt='camera' style={{ maxWidth: '50px' }} />
					</Label>
				</FormGroup>
				<FormGroup>
					<Label>Title: </Label>
					<Input
						id='title'
						type='text'
						value={title}
						placeholder={'Event title here'}
						onChange={(evt) => setTitle(evt.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Event description: </Label>
					<Input
						id='description'
						type='textarea'
						value={description}
						placeholder={'Event description here'}
						onChange={(evt) => setDescription(evt.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Event price: </Label>
					<Input
						id='price'
						type='text'
						value={price}
						placeholder={'Event price here e.g ₦0.00'}
						onChange={(evt) => setPrice(evt.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Event Date</Label>
					<Input
						type='date'
						id='date'
						value={date}
						onChange={(evt) => setDate(evt.target.value)}
						placeholder='Event date'
					/>
				</FormGroup>
				
				<FormGroup >
					<ButtonDropdown isOpen={dropdownOpen} className="Secondary-btn"  toggle={toggle}>
						<Button   id='caret' color='primary' value={activities} disabled>
							{activities}
						</Button>
						<DropdownToggle caret color='primary' />
						<DropdownMenu>
							<DropdownItem onClick={() => activitiesEventHandler('online_training')}>Online training</DropdownItem>
							<DropdownItem onClick={() => activitiesEventHandler('programming')}>Programming</DropdownItem>
							<DropdownItem onClick={() => activitiesEventHandler('training')}>Training</DropdownItem>
							<DropdownItem onClick={() => activitiesEventHandler('others')}>Others</DropdownItem>
						</DropdownMenu>
					</ButtonDropdown>
					
				</FormGroup>
				<FormGroup>
					<Button type='submit' className='submit-btn'>
						Create Event
					</Button>
				</FormGroup>
				<FormGroup>
					<Button type='secondary-btn' className='Secondary-btn' onClick={() => history.push('/')}>
						Cancel
					</Button>
				</FormGroup>
			</Form>
			{errorMessage ? (
				<Alert className='event-validation' color='danger'>
					{' '}
					Missing required information
				</Alert>
			) : (
				''
			)}
			{success ? (
				<Alert className='event-validation' color='success'>
					{' '}
					the event was created successfully
				</Alert>
			) : (
				''
			)}
		</Container>
	);
}
