import * as React from 'react';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Card, CardContent, Link } from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { height, maxHeight } from '@mui/system';
// components

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { id } from 'date-fns/locale';
import { isDesktop, osName, mobileModel, mobileVendor, osVersion } from 'react-device-detect';

import { getUserData } from '../data/userData';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import Iconify from '../components/Iconify';
import Page from '../components/Page';
import { postReq, getReq } from '../data/ApiReq';

// ----------------------------------------------------------------------

const events = [
  { title: "today's event", date: new Date() },
  { title: 'yesterday event', date: new Date() },
  { title: "today's event", date: new Date() },
];

export default function DashboardApp() {
  const [location, setLocation] = useState(null);

  const locOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      handleLocationErr,
      locOptions
    );
  }, []);

  const handleLocationErr = (error) => {
    console.log(error);
  };

  const [statusCheckIn, setStatusCheck] = useState('checkIn');

  const getData = async () => {
    const userData = getUserData();

    const date = new Date();
    const formatedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    const res = await getReq({ url: `/attendance/${formatedDate}/${userData._id}` });
    if (!res.error) {
      setStatusCheck(res.data.type);
      console.log(res.data.type);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const initialState = {
    type: 'checkIn',
    lat: '',
    lng: '',
    accuracy: '',
    workingType: 'office',
  };

  const [state, setState] = useState(initialState);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submitCheckIn = async () => {
    const data = {
      type: statusCheckIn === 'checkIn' ? 'checkOut' : 'checkIn',
      lat: location.latitude,
      lng: location.longitude,
      accuracy: location.accuracy,
      workingType: state.workingType,
      device: isDesktop
        ? `Laptop / Desktop (${osName}-${osVersion})`
        : `${mobileVendor} ${mobileModel} / ${osName} ${osVersion}`,
    };
    console.log(data);
    const res = await postReq({ url: '/attendance', data });
    if (!res.error) {
      toast.success(res.message);
      setState(initialState);
    } else {
      toast.error(res.message);
    }
    getData();
  };

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
      </Container>
    </Page>
  );
}
