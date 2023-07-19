import React from 'react';
import TimeAgo from 'react-timeago';
import { Typography, Card, CardContent } from '@mui/material';

export default function TimeLine({ data, title }) {
  //   console.log('from time line    data');
  //   console.log(data);

  const formateDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const time = newDate.toLocaleTimeString();
    return (
      <div>
        <TimeAgo date={date} /> {'  '}
        {day}-{month}-{year} {'  '}
        {time}
      </div>
    );
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h2" marginBottom={3}>
            {title}
          </Typography>
          <div>
            {data.map((item, index) => (
              <div key={index} className="time-line-wrap">
                <div className="title-sec">
                  <div>
                    {/* <span
                      className="badge-blue"
                      style={{
                        width: '50px',
                        marginRight: '10px',
                      }}
                    >
                      {index + 1}.
                    </span> */}
                    {index + 1}. <span className={`badge badge-${index % 5}`}>{item?.curentSts}</span>{' '}
                  </div>
                </div>
                <div>
                  {item?.userId?.firstName} {item?.userId?.lastName} Changed the Status <br />
                  <span className="title-time">{formateDate(item?.createdAt)}</span>
                </div>
                <div>Comments : {item?.comments}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
