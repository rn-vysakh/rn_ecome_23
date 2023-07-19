
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Item from '@mui/material/MenuItem';
import { Grid, Link } from '@mui/material';
import { getUserRole } from '../../data/userData';

export default function ImgMediaCard() {

  const [uRoll, setRoll] = useState("employee")

  const userRole = async () => {
    const role = await getUserRole()
    console.log(role);
    setRoll(role)
    console.log("hyu68i686========");
  }

  useEffect(() => {
    userRole();
  }, []);



  return (
    <div>
      <Grid container spacing={2} textAlign={'center'}>
        {uRoll === "admin" && (
          <Grid item xs={3}>
            <Link href="salary/reimburse" underline="none" color={'black'}>
              <Button variant="outlined" sx={{ px: 4, py: 2 }}>
                <h3>Cost Reimburse</h3>
              </Button>
            </Link>
          </Grid>
        )}

        {uRoll === "admin" && (
          <Grid item xs={3}>
            <Link href="salary/getallreimburse" underline="none" color={'black'}>
              <Button variant="outlined" sx={{ px: 4, py: 2 }}>
                <h3>All Cost Reimburse</h3>
              </Button>
            </Link>
          </Grid>
        )}
        <Grid item xs={3}>
          <Link href="salary/certificate" underline="none" color={'black'}>
            <Button variant="outlined" sx={{ px: 4, py: 2 }}>
              <h3>Salary Certificate</h3>
            </Button>
          </Link>
        </Grid>

        <Grid item xs={3}>
          <Link href="salary/payroll" underline="none" color={'black'}>
            <Button variant="outlined" sx={{ px: 4, py: 2 }}>
              <h3>Payroll</h3>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
